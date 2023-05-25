import {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Storage/Action/auth'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../Component/Loading'

let url = `${process.env.REACT_APP_API_URL}/auth/login`

export default function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showLoading, setShowLoading] = useState(false);
    const closeLoading = () => setShowLoading(false);
    const openLoading = () => setShowLoading(true);

    const [showError, setShowError] = useState(false);

    const user = useSelector((state)=>state.user)
    const [inputData,setInputData] = useState({
        email:"",password:""
    })

    const handleChange = (e) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value
        })
    }

    const postForm = (e) => {
        e.preventDefault()
        const newData = {
            email: inputData.email,
            password: inputData.password
        }
        dispatch(loginUser(newData,navigate))
    }
    
    useEffect(()=>{
        if (user.isLoading) {
            openLoading()
        } else {
            closeLoading()
        }
      },[user.isLoading])

    return (
        <div className='container col-6 mt-5'>
            <Helmet>
                <title>Recipe Website | Login</title>
            </Helmet>
            <h5 className='text-center mb-5' style={{color: '#EFC81A'}}>Recipe..</h5>
            <h5 className='text-center' style={{color: '#EFC81A'}}>Welcome</h5>
            <p className='text-center' style={{color: '#8692A6'}}>Log in into your exiting account</p>
            <div>
                <Form onSubmit={postForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' required onChange={handleChange} className='w-100' type="email" placeholder="Enter email address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' required onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I agree to terms & conditions" />
                    </Form.Group>
                    <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
            <p className='text-center mt-5'>Don’t have an account? <Link to={'/register'} style={{textDecoration: 'none',color: "#EFC81A"}}>Sign up</Link></p>
            {/*Login Loading */}
            {user.isLoading && 
                <Modal show={showLoading} onHide={()=>closeLoading()}>
                    <Modal.Body className='text-center'>
                        <Loading />
                    </Modal.Body>
                </Modal>
            }
            {/*Login Error*/}
            <div className="container">

            {user.errorMessage && 
                <div className="alert alert-danger my-2" role="alert" onClick={()=>setShowError(false)}>
                    {user.errorMessage}
                </div>
            }
            </div>
        </div>
    )
}