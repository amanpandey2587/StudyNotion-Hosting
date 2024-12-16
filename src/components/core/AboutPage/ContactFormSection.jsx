import React from 'react'
import ContactusForm from '../../common/ContactusForm'

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-fit items-center">
        <h1 className="text-center text-4xl font-semibold ">
            Get in touch
        </h1>
        <p className="text-center text-richblack-300 mt-3  ">
            We'd love to hear from you , Please fill out this form.
        </p>
        <div className=" mt-12 mx-auto  ">
            <ContactusForm/>
        </div>
    </div>
  )
}

export default ContactFormSection