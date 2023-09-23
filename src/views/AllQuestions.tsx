import { useState, useEffect } from 'react';
import Questioncard from "../components/Questioncard";
// import CategoryType from '../types/category';
import QuestionType from '../types/question';
import { getAllQuestions } from '../lib/apiWrapper';
import CategoryType from '../types/category';

type AllQuestionsProps = {
    flashMessage: (message:string|null, category:CategoryType|null) => void

}

export default function AllQuestions({flashMessage}: AllQuestionsProps) {
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        async function fetchData(){
            const response = await getAllQuestions();
            // console.log(response.data)
            if (response.data){
                setQuestions(response.data)
            }
        }
        fetchData();
    }, [])

    
    return (
        <>
        <h1 className='text-center my-3'>All Questions</h1>
        { questions.map( q => <Questioncard question={q} key={q.id} flashMessage={flashMessage}/> )}
        </>
    )
    }