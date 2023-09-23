import Alert from "react-bootstrap/Alert"
import CategoryType from "../types/category"

type AlertMessageProps = {
    category: CategoryType,
    message: string|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void
}

export default function AlertMessage({category,message, flashMessage}: AlertMessageProps) {
    
    return (
        <Alert variant={category} dismissible onClose={() => flashMessage(null,null)}>{message}</Alert>
    )
}