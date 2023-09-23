
import { useState, useEffect } from 'react';
import { getAllQuestions, getMyQuestions } from '../lib/apiWrapper';
import QuestionType from '../types/question';
import Questioncard from '../components/Questioncard';
import CategoryType from '../types/category';



type homeProps = {
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function Home({flashMessage}:homeProps) {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    
    useEffect(() => {
        async function fetchData(){
            const response = await getMyQuestions();
            // console.log(response.data)
            if (response.data){
                setQuestions(response.data)
            }
        }
        fetchData();
    }, [])

    // const myQuestion = questions.filter((q) => {if (q.author == localStorage.getItem('currentAuthor')) return q })


    return (
    <>
        <div className='text-center'>
            <h1>Welcome to the Quiz Up App!</h1>
            <h2>Below you can see your contributions!</h2>
        </div>



        { questions.map(q => <Questioncard question={q} key={q.id} flashMessage={flashMessage}/> ) }
    </>
    )
}