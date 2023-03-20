import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../Component/Navbar'
import Footer from '../../Component/Footer'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet';

export default function Home() {
  const navigate = useNavigate();
  const [keyword,setKeyword] = useState({
    search:""
  })

  const handleChange = (e) => {
    setKeyword({
      ...keyword,
      [e.target.name]: e.target.value
    })
  }


  const searchForm = (e) => {
    navigate(`/search?search=${keyword.search}`)
  }

  return (
    <div>
      <Helmet>
        <title>Recipe Website | Home</title>
      </Helmet>
      <div className='container'>
        <Navbar />
        {/*Banner Search*/}
        <div className='row mt-5'>
          <div className='col-6'>
            <h1 className='mt-5' style={{color: '#2E266F'}}>Discover Recipe<br></br>& Delicious Food</h1>
            <Form onSubmit={searchForm}>
              <Form.Group className='mb-2' controlId="formBasicName">
                <Form.Control name='search' onChange={handleChange} className='w-50' type="text" placeholder="Search Restaurant or Food" />
              </Form.Group>
              <Button className='w-50' style={{color: 'white'}} variant="warning" type="submit">
                Search
              </Button>
            </Form>
          </div>
          <div className='col-6 text-center'>
            <img src={require('../../Asset/egg_salad.png')} alt="" width={400}/>
          </div>
        </div>
        {/*Recommended*/}
        <div className='mt-5' style={{borderLeft: "7px solid #EFC81A"}}>
          <h3 className='p-2'>Popular For You !</h3>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            <img src={require('../../Asset/banana_toast.png')} alt="" width={400}/>
          </div>
          <div className='col-6'>
            <h1 className='mt-5'>Healthy Bone Broth<br></br>Ramen (Quick &<br></br>Easy)</h1>
            <h4 className='mt-3' style={{fontWeight: 400}}>Quick + Easy Chicken Bone Broth Ramen-<br></br>Healthy chicken ramen in a hurry? That’s<br></br>right!</h4>
            <Button className='w-25 p-3 mt-3' style={{color: 'white'}} variant="warning">
              Learn More
            </Button>
          </div>
        </div>
        {/*New recipe*/}
        <div className='mt-5' style={{borderLeft: "7px solid #EFC81A"}}>
          <h3 className='p-2'>New Recipe</h3>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            <img src={require('../../Asset/burger.png')} alt="" width={400}/>
          </div>
          <div className='col-6'>
            <h1 className='mt-5'>Healthy Bone Broth<br></br>Ramen (Quick &<br></br>Easy)</h1>
            <h4 className='mt-3' style={{fontWeight: 400}}>Quick + Easy Chicken Bone Broth Ramen-<br></br>Healthy chicken ramen in a hurry? That’s<br></br>right!</h4>
            <Button className='w-25 p-3 mt-3' style={{color: 'white'}} variant="warning">
              Learn More
            </Button>
          </div>
        </div>
        {/*Popular Recipe*/}
        <div className='mt-5' style={{borderLeft: "7px solid #EFC81A"}}>
          <h3 className='p-2'>Popular Recipe</h3>
        </div>
        <div className='row mt-5 text-center'>
          <div className='col-4'>
            <img src={require('../../Asset/soup.png')} alt="" width={350}/>
          </div>
          <div className='col-4'>
            <img src={require('../../Asset/gyoza.png')} alt="" width={350}/>
          </div>
          <div className='col-4'>
            <img src={require('../../Asset/banana_soup.png')} alt="" width={350}/>
          </div>
        </div>
        <div className='row mt-5 mb-5 text-center'>
          <div className='col-4'>
            <img src={require('../../Asset/cake.png')} alt="" width={350}/>
          </div>
          <div className='col-4'>
            <img src={require('../../Asset/salmon.png')} alt="" width={350}/>
          </div>
          <div className='col-4'>
            <img src={require('../../Asset/tomato.png')} alt="" width={350}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}