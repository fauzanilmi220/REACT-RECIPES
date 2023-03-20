import React from 'react'
import { Link } from 'react-router-dom'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow
  } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter style={{backgroundColor: "#EFC81A"}} className='text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow className='mt-5 mb-5'>
          <MDBCol lg='12' md='12' className='mb-4 mb-md-0'>
            <h1 style={{color: '#2E266F'}}>Eat, Cook, Repeat</h1>
            <p style={{color: 'grey'}}>Share your best recipe by uploading here !</p>
          </MDBCol>

        </MDBRow>
        <MDBRow className='mt-5'>
          <MDBCol lg='3' md='3' className='mb-3 mb-md-0'>
            <p style={{color: 'grey'}}>Product</p>
          </MDBCol>
          <MDBCol lg='3' md='3' className='mb-3 mb-md-0'>
            <p style={{color: 'grey'}}>Company</p>
          </MDBCol>
          <MDBCol lg='3' md='3' className='mb-3 mb-md-0'>
            <p style={{color: 'grey'}}>Learn more</p>
          </MDBCol>
          <MDBCol lg='3' md='3' className='mb-3 mb-md-0'>
            <p style={{color: 'grey'}}>Get in touch</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3'>
        &copy;
        <a className='text-dark'>
          Pijar Camp
        </a>
      </div>
    </MDBFooter>
  )
}