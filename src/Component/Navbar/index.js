import React, {useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Navbar,Container,Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function NavbarMenu() {
  const name = localStorage.getItem("name")
  const navigate = useNavigate()
  const photoURL = localStorage.getItem("photo")

  const logout = () => {
    localStorage.clear()
    window.location.reload(false)
    navigate('/home')
  }

  if (!name) {
    return (
      <Navbar className='mt-3'>
            <Nav>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/' style={{color: '#2E266F'}} >Home</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/register'  style={{color: '#2E266F'}}>Register</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/login'  style={{ color: '#2E266F'}}>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/search'  style={{ color: '#2E266F'}}>Search Menu</Nav.Link>
              </Nav.Item>
            </Nav>
      </Navbar>
    )
  } else {
    return (
      <Navbar className='mt-1'>
            <Nav>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/' style={{color: '#2E266F'}} >Home</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/add' style={{color: '#2E266F'}}>Add Recipe</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/search'  style={{ color: '#2E266F'}}>Search Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item className='pe-5'>
                <Nav.Link href='/profile'  style={{ color: '#2E266F'}}>Profile</Nav.Link>
              </Nav.Item>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Link style={{textDecoration: 'none'}} to={'/profile/editProfile'}>
                <div className='row' style={{borderLeft: "7px solid #EFC81A"}}>
                  <div className='col-6 d-flex align-items-center justify-content-end'>
                    <img src={photoURL} alt='' height={60} style={{borderRadius: 60/2}}></img>
                  </div>
                  <div className='col-6 ps-2'>
                    <p style={{color: 'black'}}>{name}</p>
                    <Link onClick={logout} style={{textDecoration: 'none', color: 'black'}}><p style={{fontWeight: 500}}>Logout</p></Link>
                  </div>
                </div>
              </Link>
            </Navbar.Collapse>
      </Navbar>
    )
  }
}