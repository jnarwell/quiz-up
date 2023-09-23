import axios from 'axios'
import QuestionType from '../types/question'
import UserType from '../types/auth';
import LoginRespType from '../types/loginresp';
import CreateQuestionRespType from '../types/createquestionresp';

const base: string = 'https://cae-bookstore.herokuapp.com/';

const allQuestionsEndpoint: string = '/question/all';
const userEndPoint: string = '/user'
const loginEndPoint: string = '/login'
const questionEndPoint: string = '/question'


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (email:string,password:string) => axios.create({
    baseURL:base,
    headers:{
        Authorization: `Basic ` +  btoa(`${email}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = {
    error?: string,
    data?: T
}

async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(allQuestionsEndpoint)
        // You need the .questions here because its still seen as a singular here...
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong!'
        }
    }
    return {error, data}
}

async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        // Be sure to look at your data before mashing your face on everything else.
        // firstName will not go into the DB, it needs to be first_name
        // console.log(newUserData)
        const myObj = {
            first_name: newUserData.firstName,
            last_name: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password
        }
        const response = await apiClientNoAuth().post(userEndPoint,myObj)
        console.log(response)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            // console.log(err)
            error = err.response?.data.error
        } else {
            error = 'Something went wrong!'
        }
    }
    return {error,data}
}

async function editUser(token:string, editedUserData:Partial<LoginRespType>): Promise<APIResponse<void>>{
    let error;
    let data;
    const myObj = {
        first_name: editedUserData.first_name,
        last_name: editedUserData.last_name,
        email: editedUserData.email
    }
    try {
        const response = await apiClientTokenAuth(token).put(userEndPoint, myObj)
        console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function deleteUser(token:string): Promise<APIResponse<void>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(userEndPoint)
        console.log(response)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


async function login(email:string, password:string):Promise<APIResponse<LoginRespType>>{
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(email,password).get(loginEndPoint)
        console.log(response)
        data = response.data
        // console.log(data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            // console.log(err)
            error = err.response?.data.error
        } else {
            error = 'Something went wrong!'
        }
    }
    return {error,data}
}


async function createQuestion(question:string, answer:string):Promise<APIResponse<CreateQuestionRespType>>{
    let error;
    let data;
    const newQuestion = {
        question:question,
        answer:answer
    }

    try{
        const response = await apiClientTokenAuth(localStorage.getItem('token') as string).post(questionEndPoint,newQuestion)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function getMyQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(localStorage.getItem('token') as string).get(questionEndPoint)
        console.log(response)
        // You need the .questions here because its still seen as a singular here...
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong!'
        }
    }
    return {error, data}
}



async function editPostById(token:string, postId:string|number, editedPostData:Partial<QuestionType>): Promise<APIResponse<void>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(questionEndPoint + '/' + postId, editedPostData)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function deletePostById(token:string, postId:string|number):Promise<APIResponse<void>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(questionEndPoint + '/' + postId)
        data = response.data.success
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}


export{
    getAllQuestions, 
    register, 
    login,
    createQuestion,
    editPostById,
    deletePostById, 
    editUser,
    deleteUser,
    getMyQuestions
}