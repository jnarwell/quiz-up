import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Todo = {
    id: number,
    description: string
}

type TodoFormProps = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e:React.FormEvent) => void
    newTodo: Todo
}

export default function Todoform({handleChange, handleSubmit, newTodo}: TodoFormProps) {

    const validateIsWord = (todo:string) => {
        return (todo.length > 2)
    }

    const validExsists:boolean = validateIsWord(newTodo.description);

    return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>To-Do Title:</Form.Label>
        <Form.Control name='description' onChange={handleChange} value={newTodo.description}/>
        <Button className='my-3 w-100' variant="warning" type='submit' disabled={!validExsists}>Create To-Do</Button>
    </Form>
    )
}