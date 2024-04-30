import React from 'react' 
import { ContactUsForm } from '../components/contact/ContactUsForm'
import Footer from '../components/common/Footer'

function Contact()   {
  return (
    <>
    <div className='flex mx-auto h-auto mt-16 w-10/12 items-center justify-center'> 
        <div className='flex flex-col md:items-center md:justify-center xs:w-full '>
        <h2 id="#contact" className='text-4xl font-bold flex mx-auto mb-1 tracking-wide title-color'>Contact Us</h2>
        <p className='font-normal items-center text-color justify-center flex mx-auto'>Send us a message!</p>
        <ContactUsForm />
        </div>
    </div>
    <Footer/>
    </>
  )
}
export default Contact