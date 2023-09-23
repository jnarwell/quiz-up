import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

type NavigationProps = {
    isLoggedIn: string|null
    handleClick: ()=>void

}

export default function Navigation({ isLoggedIn, handleClick }:NavigationProps) {
    return (
        <Navbar bg='dark' data-bs-theme="dark">
            <Container>
                <Navbar.Brand> Quiz Up App </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/allquestions'>All Questions</Nav.Link>
                    { isLoggedIn ? (
                        <>
                        <Nav.Link as={Link} to='/createquestion'>Add Question</Nav.Link>
                        <Nav.Link as={Link} to='/randomquiz'>Take a Quiz</Nav.Link>
                        <Nav.Link as={Link} to='/edituser'>Edit User</Nav.Link>
                        <Nav.Link as='button' onClick={handleClick}>Log Out</Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}