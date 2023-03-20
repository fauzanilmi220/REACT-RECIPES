import {useState,useEffect} from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import {getMenu} from '../../Storage/Action/menu'
import Loading from '../../Component/Loading'

let url = `${process.env.REACT_APP_API_URL}/recipe`

export default function Search() {
  //Pagination Variable
  const [page,setPage] = useState({
    total: 0,
    per_page: 4,
    current_page: 1,
    last_page: 0,
    from: 0,
    to: 0
  })

  const [data,setData] = useState()
  const menu = useSelector((state)=>state.menu)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keysearch = searchParams.get("search");
  const [keyword,setKeyword] = useState({
    search:keysearch || ""
  })

  const handleChange = (e) => {
    setKeyword({
      ...keyword,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    dispatch(getMenu(url+`?search=${keyword.search}`))
  },[])

  useEffect(()=>{
    if (menu.data) {
      setPage({ 
        ...page,
        total: menu.data.length,
        from: (page.current_page * page.per_page) - (page.per_page - 1),
        to: page.per_page * page.current_page,
        last_page: Math.ceil(menu.data.length/page.per_page)
      })
    }
  },[menu.data])

  const getSortData = () => {
    dispatch(getMenu(url+`?search=${keyword.search}&sortBy=created_at&sort=DESC`))
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
        <title>Recipe Website | Search</title>
      </Helmet>
      <div className='container mb-5'>
          <Navbar />
          {/*Recipe Search Bar*/}
          <h1 className='mt-5' style={{color: '#2E266F'}}>Discover Recipe<br></br>& Delicious Food</h1>
          <Form className='row'>
            <Form.Group className="col-4" controlId="formBasicName">
              <Form.Control name='search' onChange={handleChange} className='w-100' type="text" placeholder="Search Restaurant or Food" />
            </Form.Group>
            <Button className='w-25' style={{color: 'white'}} variant="warning" type="submit">
              Search
            </Button>
          </Form>
          <div className='row'>
            <div className='col-2 mt-3 text-center'>
              <Button onClick={getSortData} className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                New
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="warning" type="submit">
                Popular
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="success" type="submit">
                Vegetarian
              </Button>
            </div>
            <div className='col-2 mt-3 text-center'>
              <Button className='w-100' style={{color: 'white'}} variant="success" type="submit">
                Breakfast
              </Button>
            </div>
          </div>
          {/*Recipe Loading*/}
          {menu.isLoading && 
            <div className='text-center mt-5'>
              <Loading />
            </div>
          }
          {/*Recipe Data*/}
          <main className='product-space'> 
              <div className='container'>
                      {menu.data?.map((item,index) => {
                        if (index+1 >= page.from && index+1 <= page.to) {
                          return (
                            <div key={index+1} className='col-md-6' style={{marginTop: 50}}>
                              <Link to={`/search/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                <article key={item.id} className="main-div row">
                                  <div className="main-img col-6">
                                    <img src={item.photo} alt="" style={{maxHeight: 200}} />
                                  </div>
                                  <div className="content col">
                                      <div className="title">
                                        <h4>{item.name}</h4>
                                        <p>Ingredients :<br></br>{item.ingredient}</p>
                                      </div>
                                      <p className='align-text text-center btn btn-warning w-100' style={{color: "white"}}>10 Likes - 12 Comment - 3 Bookmark</p>
                                      <div className='row'>
                                        <div className='col-3'>
                                          <img src={item.creator_photo} height={60} style={{borderRadius: 60/2}} alt=""></img>
                                        </div>
                                        <div className='col d-flex align-items-center'>
                                          <p>{item.creator}</p>
                                        </div>
                                      </div>
                                  </div>
                                </article>
                              </Link>
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
    </div>
  )
}