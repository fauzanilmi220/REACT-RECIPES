import {useState,useEffect} from 'react'
import axios from 'axios'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {addMenu} from '../../Storage/Action/menu'
import Modal from 'react-bootstrap/Modal';
import Loading from '../../Component/Loading'

export default function Add() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const add_menu = useSelector((state)=>state.addMenu)

  const [showLoading, setShowLoading] = useState(false);
  const closeLoading = () => setShowLoading(false);
  const openLoading = () => setShowLoading(true);

  const [inputData,setInputData] = useState({
    name:"",ingredient:"",category_id:1
  })
  const [photo,setPhoto] = useState()
  const [preview, setPreview] = useState(null);
  const [alert,setAlert] = useState(false)
  
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
    console.log(e.target.files[0])
    window.URL.revokeObjectURL(preview);
    setPreview(window.URL.createObjectURL(e.target.files[0]));
  }

  const postForm = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",inputData.name)
    formData.append("ingredient",inputData.ingredient)
    formData.append("category_id",inputData.category_id)
    formData.append("photo",photo)
    console.log(formData)
    dispatch(addMenu(formData,navigate))
  }

  useEffect(()=>{
    if (add_menu.isLoading) {
        openLoading()
    } else {
        closeLoading()
    }
  },[add_menu.isLoading])

  return (
    <div>
      <Helmet>
        <title>Recipe Website | Add Recipe</title>
      </Helmet>
      <div className='container'>
        <Navbar />
        <h1 className='text-center mt-5'>Add Recipe</h1>
          <form onSubmit={postForm} className="container text-center mb-5">
              <img src={preview} alt="" style={{maxHeight:300}}></img>
              <input type="file" name="photo" placeholder='photo' onChange={handlePhoto} className="form-control my-5" />
              <input type="text" value={inputData.name} name="name" placeholder='title' required onChange={handleChange} className="form-control my-5" />
              <input type="text" value={inputData.ingredient} name="ingredient" placeholder='ingredient' required onChange={handleChange} className="form-control  my-5" />
              <button type='submit' className='btn btn-warning w-100' style={{color: 'white'}}>Post</button>
          </form>

          <div className="container">
          { add_menu.errorMessage && <div className="alert alert-danger my-2" role="alert" onClick={()=>setAlert(false)}>
            {add_menu.errorMessage }
          </div>}
          </div>
      </div>
      {/* Loading */}
      {add_menu.isLoading && 
        <Modal show={showLoading} onHide={()=>closeLoading()}>
          <Modal.Body className='text-center'>
            <Loading />
          </Modal.Body>
        </Modal>
      }
      <Footer />
    </div>
  )
}