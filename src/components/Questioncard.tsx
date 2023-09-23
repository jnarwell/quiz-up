import Card from 'react-bootstrap/Card';
import QuestionType from '../types/question';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editPostById, deletePostById } from '../lib/apiWrapper';
import CategoryType from '../types/category';




type questionProps = {
    question: QuestionType,
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function Questioncard({ question, flashMessage }: questionProps) {

    const [isVisible, setIsVisible] = useState<boolean>(false); 
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const invertEdit = ():void => {
        setIsEditing(!isEditing)
    }


    const navigate = useNavigate()

    const [questionFormData, setQuestionFormData] = useState<Partial<QuestionType>>({
            question: question.question, 
            answer: question.answer,
    })

    const seeAnswer = ():void => {
        setIsVisible(!isVisible)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setQuestionFormData({...questionFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        let response = await editPostById(localStorage.getItem('token')!, question.id, questionFormData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`You edited question ${question.id}!`, 'success')
        }
        navigate('/')
    }

    const deletePost = async ():Promise<void> =>{
        let response = await deletePostById(localStorage.getItem('token')!, question.id)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`You deleted question ${question.id}!`, 'success')
        }
        navigate('/')
    }

    return (
        <Card  className="mb-3 text-center">
            <Card.Body>
                <Card.Title>Question: {question.id}</Card.Title>
                <Card.Subtitle>By: {question.author}</Card.Subtitle>
                <>
                    <Card.Body>
                        <div>
                            {question.question}
                        </div>
                        { isVisible ? (
                            <>
                            <p className='mt-3'>{question.answer}</p>
                            </>
                        ) : (
                            <>
                            <Button variant='success' className="mt-3 w-100" onClick={seeAnswer} key={question.id}>See Answer</Button>
                            </>
                        )}
                        { question.author == localStorage.getItem('currentAuthor') ? (
                            <Button variant='outline-primary' className="mt-3 w-100" key={question.question} onClick={invertEdit}>Edit Question</Button>
                        ) : (
                            <>
                            </>
                        ) }
                        { isEditing ? (
                            <Form className="mt-3" onSubmit={handleFormSubmit}>
                                <Form.Control name='question' type='text' value={questionFormData.question}  onChange={handleInputChange} className="mb-4" placeholder='Question'/>
                                <Form.Control name='answer' type='text' value={questionFormData.answer} onChange={handleInputChange}  placeholder='Answer'/>
                                <div>
                                    <Button type='submit' className="w-50 mt-3" variant='primary'>Submit Edit</Button>
                                    <Button className="w-50 mt-3" variant='danger' onClick={deletePost}>Delete Question</Button>
                                </div>
                                
                            </Form>
                            ) : ( 
                                <></>
                            ) }
                        
                    </Card.Body>
                    <Card.Footer>
                        Created: {question.created_on}
                    </Card.Footer>
                </>               
            </Card.Body>
        </Card>
    )
    }