import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryType from '../types/category';
// import UserType from "../types/auth";
import { createQuestion } from '../lib/apiWrapper';
import QuestionType from '../types/question';


type CreateQuesionProps = {
    // logUserIn: (user:Partial<UserType>) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function CreateQuestion({ flashMessage }: CreateQuesionProps) {
    const navigate = useNavigate()

    const [questionFormData, setQuestionFormData] = useState<Partial<QuestionType>>({
            question: '', 
            answer: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setQuestionFormData({...questionFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        let response = await createQuestion(questionFormData.question!, questionFormData.answer!)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage('You made a question!', 'success')
            navigate('/')
        }
        
    }

    return (    
<>
<h1 className="text-center">Create Question</h1>
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Control name='question' type='text' value={questionFormData.question} onChange={handleInputChange} className="mb-4" placeholder='Question'/>
                    <Form.Control name='answer' type='text' value={questionFormData.answer} onChange={handleInputChange}  placeholder='Answer'/>

                    <Button type='submit' className="w-100 mt-3" variant='outline-primary'>Create Question</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )}