
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import Navigation from "./components/Navigation";
import AlertMessage from './components/AlertMessage';
import CategoryType from './types/category';
import Register from './views/Register';
import AllQuestions from './views/AllQuestions';
import Login from './views/Login';
import CreateQuestion from './views/CreateQuestion';
import EditUser from './views/EditUser'
import RandomQuiz from './views/RandomQuiz';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') || null)

  const navigate = useNavigate()
  const logUserOut = ():void => {
    setIsLoggedIn(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentAuthor');
    localStorage.removeItem('fn');
    localStorage.removeItem('ln');
    localStorage.removeItem('em');
    flashMessage('You have logged out!', 'info')
    navigate('/')
  }



  const [message,setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const flashMessage = (newMessage:string|null,newCategory:CategoryType|null):void => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  return (
    <>
      <Navigation isLoggedIn = {isLoggedIn} handleClick = {logUserOut}/>
      <Container>
        {message && <AlertMessage category={category!} message={message} flashMessage = {flashMessage}/>}
        <Routes>
          <Route path='/' element={<Home flashMessage={flashMessage}/>}/>
          <Route path='/register' element={<Register flashMessage={flashMessage} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='/allquestions' element={<AllQuestions flashMessage={flashMessage}/>}/>
          <Route path='/login' element={<Login flashMessage={flashMessage} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='/createquestion' element={<CreateQuestion flashMessage={flashMessage}/>}/>
          <Route path='/edituser' element={<EditUser flashMessage={flashMessage} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='/randomquiz' element={<RandomQuiz flashMessage={flashMessage}/>}/>
        </Routes>
      </Container>
    </>
  )
}