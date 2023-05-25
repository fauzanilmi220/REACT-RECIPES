import {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet';
import { registerUser } from '../../Storage/Action/auth'
import Loading from '../../Component/Loading'

let url = `${process.env.REACT_APP_API_URL}/auth/register`

export default function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useSelector((state)=>state.registerUser)

    const [showLoading, setShowLoading] = useState(false);
    const closeLoading = () => setShowLoading(false);
    const openLoading = () => setShowLoading(true);

    const [showError, setShowError] = useState(false);

    const [inputData,setInputData] = useState({
        name:"",email:"",password:""
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
            name: inputData.name,
            password: inputData.password
        }
        dispatch(registerUser(newData))
    }

    useEffect(()=>{
        if (user.isLoading) {
            openLoading()
        } else {
            closeLoading()
        }
      },[user.isLoading])

      useEffect(()=>{
        if (user.data) {
            handleShow()
        }
      },[user.data])
    
    return (
        <div className='container col-6 mt-5'>
            <Helmet>
                <title>Recipe Website | Register</title>
            </Helmet>
            <h5 className='text-center mb-5' style={{color: '#EFC81A'}}>Recipe..</h5>
            <h5 className='text-center' style={{color: '#EFC81A'}}>Let’s Get Started !</h5>
            <p className='text-center' style={{color: '#8692A6'}}>Create new account to access all features</p>
            <div>
                <Form onSubmit={postForm}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' required onChange={handleChange} className='w-100' type="text" placeholder="Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' required onChange={handleChange} className='w-100' type="email" placeholder="Enter email address" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' required onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" required label="I agree to terms & conditions" />
                    </Form.Group>
                    <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                        Register Account
                    </Button>
                </Form>
            </div>
            <p className='text-center mt-5'>Already have account? <Link to={'/login'} style={{textDecoration: 'none',color: "#EFC81A"}}>Log in Here</Link></p>

            <Modal show={show} onHide={()=>handleClose()}>
                <Modal.Header>
                <Modal.Title style={{color: "#EFC81A"}}>You're all set!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please check your email account for verification</p>
                </Modal.Body>
                <Modal.Footer>
                <Button className='w-25' variant="warning" style={{color: "white"}} onClick={()=>{handleClose(); navigate('/login')}}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

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