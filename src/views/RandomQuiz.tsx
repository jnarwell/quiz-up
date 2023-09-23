import { useState, useEffect } from 'react';
import { getAllQuestions } from '../lib/apiWrapper';
import QuestionType from '../types/question';
import Questioncard from '../components/Questioncard';
import CategoryType from '../types/category';



type RandomQuizProps = {
    flashMessage: (message:string|null, category:CategoryType|null) => void
}

export default function RandomQuiz({flashMessage}:RandomQuizProps) {
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

    const randIndex = Array.from({length: 5}, () => Math.floor(Math.random() * questions.length));
    console.log(randIndex)


    const myRandomQuestion = questions.filter((q, i) => {if (randIndex.includes(i)) return q })
    console.log(myRandomQuestion)

    return (
    <>
        <div className='text-center'>
            <h1>Are you ready to be wrong nerd?</h1>
        </div>



        { myRandomQuestion.map(q => <Questioncard question={q} key={q.id} flashMessage={flashMessage}/> ) }
    </>
    )
}