import {useState,useEffect} from 'react'
import Navbar from '../../Component/Navbar'
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../Component/Loading'
import {updateUser} from '../../Storage/Action/auth'

let url = `${process.env.REACT_APP_API_URL}/users/myProfile`

export default function EditProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.editUser)
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const photoURL = localStorage.getItem("photo")
  
    const [showLoading, setShowLoading] = useState(false);
    const closeLoading = () => setShowLoading(false);
    const openLoading = () => setShowLoading(true);
  
      const [editData,setEditData] = useState({
        name:'',email:''
      })
      const [photo,setPhoto] = useState()
      const [preview, setPreview] = useState(null);
      const [alert,setAlert] = useState(false)
  
      const handleChange = (e) => {
          setEditData({
            ...editData,
            [e.target.name]: e.target.value
          })
      }
      const handlePhoto = (e) => {
          setPhoto(e.target.files[0])
          console.log(e.target.files[0])
          window.URL.revokeObjectURL(preview);
          setPreview(window.URL.createObjectURL(e.target.files[0]));
      }
  
      useEffect(()=>{
        if (user.isLoading) {
            openLoading()
        } else {
            closeLoading()
        }
      },[user.isLoading])
  
      const putForm = (e) => {
          e.preventDefault()
          const formData = new FormData()
          formData.append("name",editData.name)
          formData.append("email",editData.email)
          formData.append("photo",photo)
          console.log(formData)
          localStorage.setItem("email",editData.email || email)
          localStorage.setItem("name",editData.name || name)
          dispatch(updateUser(formData,navigate))
        }
  
      return(
        <div>
          <Helmet>
            <title>Recipe Website | Edit Profile</title>
          </Helmet>
          <div className='container'>
              <Navbar />
                    <Form onSubmit={putForm} className="container col-6 text-center mt-5 mb-5">
                        <img src={preview || photoURL} alt="" height={200}></img>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <input type="file" name="photo" placeholder='photo' onChange={handlePhoto} className="form-control my-5" />
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' value={editData.name || name} required onChange={handleChange} className='w-100' type="text" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' value={editData.email || email} required onChange={handleChange} className='w-100' type="email" placeholder="Enter email address" />
                        </Form.Group>
                        <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                            Update Profile
                        </Button>
                    </Form>
              <p className='text-center mt-5'>Change Password? <Link style={{textDecoration: 'none',color: "#EFC81A"}}>Click Here</Link></p>
  
              <div className="container">
  
              {  user.errorMessage && <div className="alert alert-danger my-2" role="alert" onClick={()=>setAlert(false)}>
                  {user.errorMessage}
              </div>}
  
              </div>
          </div>
          {/* Loading */}
          {user.isLoading && 
            <Modal show={showLoading} onHide={()=>closeLoading()}>
              <Modal.Body className='text-center'>
                <Loading />
              </Modal.Body>
            </Modal>
          }
        </div>
      )
  }