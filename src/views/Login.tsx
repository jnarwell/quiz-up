import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryType from '../types/category';
import UserType from "../types/auth";
import { login } from '../lib/apiWrapper';


type LoginProps = {
    // logUserIn: (user:Partial<UserType>) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
    setIsLoggedIn: (value:string) => void
}

export default function Login({ flashMessage, setIsLoggedIn }: LoginProps) {
    const navigate = useNavigate()

    const [loginFormData, setUserFormData] = useState<Partial<UserType>>({
            email: '', 
            password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserFormData({...loginFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        let response = await login(loginFormData.email!, loginFormData.password!)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const loginUser = response.data
            setIsLoggedIn(loginUser?.token!)
            console.log(response)
            localStorage.setItem('token',loginUser?.token as string);
            localStorage.setItem('currentAuthor', `${loginUser?.first_name} ${loginUser?.last_name}_${String(loginUser?.user_id).padStart(4,'0')}`)
            localStorage.setItem('fn', `${loginUser?.first_name}`)
            localStorage.setItem('ln', `${loginUser?.last_name}`)
            localStorage.setItem('em', `${loginUser?.email}`)

            flashMessage(`${loginFormData.email} has logged in`, 'success')
            navigate('/')
        }
        
    }

    return (    
<>
<h1 className="text-center">Login</h1>
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Control name='email' type='email' value={loginFormData.email} onChange={handleInputChange} className="mb-4" placeholder='Email'/>
                    <Form.Control name='password' type='password' value={loginFormData.password} onChange={handleInputChange}  placeholder='Password'/>

                    <Button type='submit' className="w-100 mt-3" variant='outline-success'>Login</Button>
                    </Form>
            </Card.Body>
        </Card>
        </>
    )}