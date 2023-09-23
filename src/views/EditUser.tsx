import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CategoryType from '../types/category';
// import UserType from "../types/auth";
import { deleteUser, editUser } from '../lib/apiWrapper';
import LoginRespType from '../types/loginresp';


type EditUserProps = {
    // logUserIn: (user:Partial<UserType>) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
    setIsLoggedIn: (value:string|null) => void
}

export default function EditUser({ flashMessage, setIsLoggedIn }: EditUserProps) {
    const navigate = useNavigate()

    const [userFormData, setUserFormData] = useState<Partial<LoginRespType>>({
            first_name: localStorage.getItem('fn')!, 
            last_name: localStorage.getItem('ln')!, 
            email: localStorage.getItem('em')!, 
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setUserFormData({...userFormData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        console.log(userFormData)
        let response = await editUser(localStorage.getItem('token')!,userFormData)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const newUser = response.data
            console.log(newUser)
            localStorage.setItem('fn', `${userFormData?.first_name}`)
            localStorage.setItem('ln', `${userFormData?.last_name}`)
            localStorage.setItem('em', `${userFormData?.email}`)
            navigate('/')
        }
        
    }

    const deleteUserFunc = async ():Promise<void> => {
        let response = await deleteUser(localStorage.getItem('token')!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            setIsLoggedIn(null)
            localStorage.removeItem('token');
            localStorage.removeItem('currentAuthor');
            localStorage.removeItem('fn')
            localStorage.removeItem('ln')
            localStorage.removeItem('em')
            navigate('/')
        }
    }

    // const validatePasswords = (password:string,confirmPassword:string) => {
    //     return (password.length > 7 && password == confirmPassword)
    // }

    // const validPasswords:boolean = validatePasswords(userFormData.password!,userFormData.confirmPassword!);
    

    return (
        <>
        <h1 className="text-center">Edit User</h1>
        <Card className="mt-3">
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>First Name</Form.Label> 
                    <Form.Control name='first_name' value={userFormData.first_name} onChange={handleInputChange}/>

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='last_name' value={userFormData.last_name} onChange={handleInputChange}/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={userFormData.email} onChange={handleInputChange}/>

                    {/* <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' value={userFormData.password} onChange={handleInputChange}  placeholder='Password must be at least 8 characters long'/>
                    
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name='confirmPassword' type='password' value={userFormData.confirmPassword} onChange={handleInputChange}  placeholder='Passwords must match'/> */}

                    <Button type='submit' className="w-50 mt-3" variant='primary' >Edit User</Button>
                    <Button className="w-50 mt-3" variant='danger' onClick={deleteUserFunc}>Delete User</Button>

                    {/* {!validPasswords && <Form.Text className='text-danger'>Your password must be at least 8 characters long and must match</Form.Text>} */}
                    </Form>
            </Card.Body>
        </Card>
        </>
)
}