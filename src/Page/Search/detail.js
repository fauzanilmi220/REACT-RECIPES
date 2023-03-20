import {useState,useEffect} from 'react'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Bookmark,HandThumbsUp } from 'react-bootstrap-icons';
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux'
import {getMenu} from '../../Storage/Action/menu'

let url = `${process.env.REACT_APP_API_URL}/recipe/detail`

export default function SearchDetail() {
    const [data,setData] = useState()
    let { id } = useParams();

    const menu = useSelector((state)=>state.menu)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMenu(url+`/${id}`))
      },[])

    return (
        <div>
            <Helmet>
                <title>Recipe Website | Recipe Detail</title>
            </Helmet>
            <div className='container mb-5'>
                <Navbar />
                {menu.data?.map((item,index) => {
                    return(
                        <div key={index+1}>
                            {/*Recipe Header*/}
                            <div className='row mt-5'>
                                <div className='col-6' style={{borderLeft: "7px solid #EFC81A"}}>
                                    <div className='row'>
                                        <div className='col-2 d-flex align-items-center'>
                                            <img src={item.creator_photo} height={65} style={{borderRadius: 65/2}} alt=''></img>
                                        </div>
                                        <div className='col-4 p-2'>
                                            <p>{item.creator}</p>
                                            <p style={{fontWeight: 500}}>10 Recipe</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 text-end'>
                                    <div className='row'>
                                        <div className='col-12 p-2'>
                                            <p style={{fontWeight: 500}}>{item.post_time}</p>
                                            <p style={{fontWeight: 500}}>20 Likes - 2 Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Recipe Data*/}
                            <div className='text-center mt-5 mb-5'>
                                <h1 style={{color: '#2E266F'}}>{item.name}</h1>
                                <img className='mt-3' src={item.photo}  alt="" height={400}></img>
                            </div>
                            <div className='mt-5 pb-5' style={{borderBottom: "7px solid #EFC81A"}}>
                                <h3 style={{color: '#2E266F'}}>Ingredients</h3>
                                <p>{item.ingredient}</p>
                                <div className='row mt-5'>
                                    <div className='col-1'>
                                        <Button className='w-100 p-4' style={{color: 'white'}} variant="warning"><Bookmark size={30} /></Button>
                                    </div>
                                    <div className='col-1'>
                                        <Button className='w-100 p-4' style={{color: 'white'}} variant="warning"><HandThumbsUp size={30} /></Button>
                                    </div>
                                </div>
                            </div>
                            {/*Recipe Comment*/}
                            <div className='mt-5 mb-5 pb-5' style={{borderBottom: "7px solid #EFC81A"}}>
                                <div className='row mt-5 align-items-center'>
                                    <div className='col-2 text-end' style={{borderRight: "7px solid #EFC81A"}}>
                                        <div className='row'>
                                            <div className='col-6 d-flex align-items-center justify-content-end'>
                                                <img src={require('../../Asset/dp.png')} alt="" height={65}></img>
                                            </div>
                                            <div className='col-6 p-2'>
                                                <p>Ayudia</p>
                                                <p style={{fontWeight: 500}}>10 Recipe</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-10'>
                                        <div className='row'>
                                            <div className='col-12 p-2'>
                                                <p>Wow, I just made this and it was delicious! Thanks for sharing!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            {/*Recipe Form*/}
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={10} placeholder="Your comment here!" />
                                </Form.Group>
                                <Button className='w-25' style={{color: 'white'}} variant="warning" type="submit">
                                    Send a comment
                                </Button>
                            </Form>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </div>
    )
}