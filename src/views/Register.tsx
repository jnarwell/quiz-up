import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryType from '../types/category';
import UserType from "../types/auth";
import { login, register } from '../lib/apiWrapper';


type RegisterProps = {
    // logUserIn: (user:Partial<UserType>) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
    setIsLoggedIn: (value:string|null) => void,
}

export default function Register({ flashMessage, setIsLoggedIn }: RegisterProps) {
    const navigate = useNavigate()

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({
            firstName: '', 
            lastName: '', 
            email: '', 
            password: '',
            confirmPassword: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserFormData({...userFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        let response = await register(userFormData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUser = response.data
            console.log(newUser)
            
            let response2 = await login(userFormData.email!,userFormData.password!)
            if (response2.error){
                flashMessage(response2.error, 'danger')
            } else {
                const loginUser = response2.data
                setIsLoggedIn(loginUser?.token!)
                console.log(response2)
                localStorage.setItem('token',loginUser?.token as string);
                localStorage.setItem('currentAuthor', `${loginUser?.first_name} ${loginUser?.last_name}_${String(loginUser?.user_id).padStart(4,'0')}`)
                localStorage.setItem('fn', `${loginUser?.first_name}`)
                localStorage.setItem('ln', `${loginUser?.last_name}`)
                localStorage.setItem('em', `${loginUser?.email}`)
                flashMessage(`${userFormData.email} has logged in`, 'success')
                navigate('/')
        }
        
    }}

    const validatePasswords = (password:string,confirmPassword:string) => {
        return (password.length > 7 && password == confirmPassword)
    }

    const validPasswords:boolean = validatePasswords(userFormData.password!,userFormData.confirmPassword!);
    

    return (
        <>
        <h1 className="text-center">Register</h1>
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>First Name</Form.Label> 
                    <Form.Control name='firstName' value={userFormData.firstName} onChange={handleInputChange}/>

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='lastName' value={userFormData.lastName} onChange={handleInputChange}/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={userFormData.email} onChange={handleInputChange}/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' value={userFormData.password} onChange={handleInputChange}  placeholder='Password must be at least 8 characters long'/>
                    
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name='confirmPassword' type='password' value={userFormData.confirmPassword} onChange={handleInputChange}  placeholder='Passwords must match'/>

                    <Button type='submit' className="w-100 mt-3" variant='outline-success' disabled={!validPasswords}>Register</Button>

                    {!validPasswords && <Form.Text className='text-danger'>Your password must be at least 8 characters long and must match</Form.Text>}
                    </Form>
            </Card.Body>
        </Card>
        </>
)
}