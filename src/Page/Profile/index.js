import {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import {getMenu, deleteMenu} from '../../Storage/Action/menu'
import Loading from '../../Component/Loading'

let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Profile() {
  const photoURL = localStorage.getItem("photo")
  const navigate = useNavigate();
  const name = localStorage.getItem("name")
  const date = new Date()
  const currentDateTime = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
  const [data,setData] = useState()
  const [show, setShow] = useState(false);
  const [selected,setSelected] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recipe,setRecipe] = useState({
    total: 0,
  })
  const menu = useSelector((state)=>state.menu)
  const delete_menu = useSelector((state)=>state.deleteMenu)
  const dispatch = useDispatch()

  //Pagination Variable
  const [page,setPage] = useState({
    total: 0,
    per_page: 3,
    current_page: 1,
    last_page: 0,
    from: 0,
    to: 0
  })

  useEffect(()=>{
    dispatch(getMenu(url+`/myRecipe`))
  },[])

  useEffect(()=>{
    if (menu.data) {
      setRecipe({...recipe,total:menu.data.length})
      setPage({ 
        ...page,
        total: menu.data.length,
        from: (page.current_page * page.per_page) - (page.per_page - 1),
        to: page.per_page * page.current_page,
        last_page: Math.ceil(menu.data.length/page.per_page)
      })
    }
  },[menu.data])

  useEffect(()=>{
    dispatch(getMenu(url+`/myRecipe`))
    handleClose()
  },[delete_menu.data])

  useEffect(()=>{
    if (page.total < page.from) {
      prevPage()
    }
  },[page.total])

  const confirmDelete = (id) => {
    setSelected(id)
    handleShow()
  }

  const deleteData = (id) => {
    dispatch(deleteMenu(id))
  }

  const prevPage = () => {
    const pg = page.current_page - 1
    setPage({
      ...page,
      current_page: pg,
      from: (pg * page.per_page) - (page.per_page - 1),
      to: page.per_page * pg
    })
  }

  const nextPage = () => {
    const pg = page.current_page + 1
    setPage({
      ...page,
      current_page: pg,
      from: (pg * page.per_page) - (page.per_page - 1),
      to: Math.ceil(page.per_page * pg)
    })
  }

  return (
    <div>
      <Helmet>
        <title>Recipe Website | Profile</title>
      </Helmet>
      <div className='container mb-5'>
          <Navbar />
          {/*Recipe Header*/}
          <div className='row mt-5'>
            <div className='col-6' style={{borderLeft: "7px solid #EFC81A"}}>
              <div className='row'>
                <div className='col-2 d-flex align-items-center'>
                  <img src={photoURL} height={65} style={{borderRadius: 65/2}} alt=''></img>
                </div>
                <div className='col-4 p-2'>
                  <p>{name}</p>
                  <p style={{fontWeight: 500}}>{recipe.total} Recipe</p>
                </div>
              </div>
            </div>
            <div className='col-6 text-end'>
              <div className='row'>
                <div className='col-12 p-2'>
                  <p style={{fontWeight: 500}}>{currentDateTime}</p>
                  <p style={{fontWeight: 500}}>20 Likes - 2 Comments</p>
                </div>
              </div>
            </div>
          </div>
          {/*Recipe Navbar*/}
          <div className='row mt-5'>
            <div className='col-2' style={{fontWeight: 300,borderBottom: '7px solid #EFC81A'}}>
              <h2>Recipes</h2>
            </div>
            <div className='col-2 text-center' style={{fontWeight: 300,color: 'grey',borderBottom: '7px solid #EFC81A'}}>
              <h2>Bookmarked</h2>
            </div>
            <div className='col-2 text-end' style={{fontWeight: 300,color: 'grey',borderBottom: '7px solid #EFC81A'}}>
              <h2>Liked</h2>
            </div>
          </div>
          {/*Recipe Loading*/}
          {menu.isLoading && 
            <div className='text-center mt-5'>
              <Loading />
            </div>
          }
          {/*Recipe*/}
          <main className='product-space'>
              <div className='container'>
                      {menu.data?.map((item,index) => {
                        if (index+1 >= page.from && index+1 <= page.to) {
                          return (
                            <div key={index+1} className='col-md-6' style={{marginTop: 50}}>
                              <article key={item.id} className="main-div row">
                                <div className="main-img col">
                                  <img src={item.photo} style={{maxHeight: 200}} />
                                </div>
                                <div className="content col">
                                    <div className="title">
                                      <h4>{item.name}</h4>
                                      <p>Ingredients :<br></br>{item.ingredient}</p>
                                    </div>
                                    <p className='align-text text-center btn btn-warning w-100' style={{color: "white"}}>10 Likes - 12 Comment - 3 Bookmark</p>
                                    <div className='row'>
                                      <div className='col-6'>
                                        <Button className='w-100' style={{color: 'white'}} variant="info" onClick={()=>navigate(`/profile/editRecipe/${item.id}`)}>
                                          Edit Menu
                                        </Button>
                                      </div>
                                      <div className='col-6'>
                                        <Button className='w-100' style={{color: 'white'}} variant="danger" onClick={()=>confirmDelete(item.id)}>
                                          Delete Menu
                                        </Button>
                                      </div>
                                    </div>
                                </div>
                              </article>
                            </div>
                          )
                        }
                      })}
              </div>
          </main>
          {/*Recipe Pagination*/}
          <div className='mt-5 row'>
            <div className='col-5 text-end'>
              <Button onClick={prevPage} style={{color: 'white'}} variant="warning" disabled={page.current_page === 1}>Prev</Button>
            </div>
            <div className='pt-2 col-2 text-center'>
              <h5 style={{fontWeight: 400}}>Show {page.from} - {page.total > page.to && page.to || page.total} from {page.total}</h5>
            </div>
            <div className='col-5'>
              <Button onClick={nextPage} style={{color: 'white'}} variant="warning" disabled={page.total <= page.to}>Next</Button>
            </div>
          </div>
      </div>
      <Footer />

      <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete this recipe ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>deleteData(selected)}>
            Delete data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}