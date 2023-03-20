import {useState,useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom';
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getMenu,editMenu} from '../../Storage/Action/menu'
import Modal from 'react-bootstrap/Modal';
import Loading from '../../Component/Loading'

let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Edit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const menu = useSelector((state)=>state.menu)
  const edit_menu = useSelector((state)=>state.editMenu)

  const [showLoading, setShowLoading] = useState(false);
  const closeLoading = () => setShowLoading(false);
  const openLoading = () => setShowLoading(true);

    let { id } = useParams();
    const [data,setData] = useState()
    const [editData,setEditData] = useState({
      name:'',ingredient:''
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
        dispatch(getMenu(url+`/detail/${id}`))
    },[])

    useEffect(()=>{
      if (edit_menu.isLoading) {
          openLoading()
      } else {
          closeLoading()
      }
    },[edit_menu.isLoading])

    const putForm = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",editData.name)
        formData.append("ingredient",editData.ingredient)
        //formData.append("category_id",editData.category_id)
        formData.append("photo",photo)
        console.log(formData)
        dispatch(editMenu(id,formData,navigate))
      }

    return(
      <div>
        <Helmet>
          <title>Recipe Website | Edit Recipe</title>
        </Helmet>
        <div className='container'>
            <Navbar />
            <h1 className='text-center mt-5'>Edit Recipe</h1>
            {menu.data?.map((item,index) => {
              return (
                <div key={index+1}>
                  <form onSubmit={putForm} className="container text-center mb-5">
                      <img src={preview || item.photo} alt="" height={300}></img>
                      <input type="file" name="photo" placeholder='photo' onChange={handlePhoto} className="form-control my-5" />
                      <input type="text" value={editData.name || item.name} name="name" placeholder='title' required onChange={handleChange} className="form-control my-5" />
                      <input type="text" value={editData.ingredient || item.ingredient} name="ingredient" placeholder='ingredient' required onChange={handleChange} className="form-control  my-5" />
                      <button type='submit' className='btn btn-warning w-100' style={{color: 'white'}}>Update</button>
                  </form>
                </div>
              )
            })}

            <div className="container">

            {  edit_menu.errorMessage && <div className="alert alert-danger my-2" role="alert" onClick={()=>setAlert(false)}>
                {edit_menu.errorMessage}
            </div>}

            </div>
        </div>
        {/* Loading */}
        {edit_menu.isLoading && 
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