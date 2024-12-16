import React,{useEffect ,useState} from 'react'
import { useForm } from 'react-hook-form';
// check your apiConnector  as well as contactusEndpoint in "../../services/apis "
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"
const ContactusForm = () => {

    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}

    }=useForm();

    const submitContactForm=async(data)=>{
        console.log("Logging data ",data)
        try{
            setLoading(true);
            const response =await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            // const response={status:"ok"};
            console.log("Logging response",response);
            setLoading(false);
        }
        catch(error){
            console.log("Error",error.message);
            setLoading(false);
        }
    }

    // after submit is successful we do the following 
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);


  return (
    <form onSubmit={handleSubmit(submitContactForm)}
    className='flex flex-col gap-7 '
    >
        <div className="flex flex-col lg:flex-row gap-5">
        <div className="">
            {/* firstName */}
            <div className="flex flex-col gap-2 lg:w-[48%] ">
                <label htmlFor="firstName" className="text-richblack-5">First Name</label>
                <input
                type="text"
                name='firstName'
                id='firstName'
                placeholder='Enter first Name'
                {...register("firstName",{required:true})}
                />
                {
                    // error handling 
                    errors.firstName && (
                        <span className="-mt-1 text-[0.75rem] text-cyan-100 ">
                            Please enter your name 
                        </span>
                    )
                }
            </div>

            {/* LastName */}
            <div className="flex flex-col gap-2 lg:w-[48%] ">
                <label htmlFor="lastName" className="text-richblack-200">Last Name</label>
                <input
                type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter last Name'
                {...register("lastName",{required:false})}
                />
                {
                    // error handling 
                    errors.firstName && (
                        <span className="text-[#CD5C5C]">
                            Please enter your last name 
                        </span>
                    )
                }
            </div>
        </div>


           {/* Email */}
           <div className="text-richblack-700 flex flex-col">
                <label htmlFor="email" className="text-richblack-5">Email</label>
                <input
                type="email"
                name='email'
                id='email'
                placeholder='Enter Email address'
                {...register("email",{required:true})}
                />
                {
                    // error handling 
                    errors.email && (
                        <span  className="text-[#CD5C5C]">
                            Please enter your email
                        </span>
                    )
                }
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2 text-richblack-700">
    <label htmlFor="phonenumber" className="text-richblack-5">Phone Number </label>
    {/* Drop down */}
    <div className="flex flex-row gap-5 ">
        <div className="flex flex-row gap-5 ">
            <select name='dropdown'
                id='dropdown'
                className="lg:w-[100px]"
                {...register("countrycode", { required: true })}
            >
                <option value="">Select Code</option>
                {
                    CountryCode.map((data, index) => {
                        return (
                            <option key={index} value={data.code}>
                                {data.code} - {data.country}
                            </option>
                        );
                    })
                }
            </select>
        </div>

        {/* Phone number */}
        <div>
            <input
                type='number'
                name="phoneNo"
                id='phonenumber'
                placeholder='Enter your phone number'
                className="text-richblack-900 "
                {...register("phoneNo", {
                    required: { value: true, message: "Phone number is mandatory" },
                    maxLength: { value: 10, message: "Invalid phone number" },
                    minLength: { value: 10, message: "Invalid phone number" }
                })}
            />
            {
                errors.phoneNo && (
                    <span className="text-[#CD5C5C]">
                        {errors.phoneNo.message} {/* Display the error message */}
                    </span>
                )
            }
        </div>
    </div>
</div>


            {/* Message */}
            <div className="text-richblack-700 flex flex-col">
                <label htmlFor="message" className="text-richblack-5">Message</label>
                <textarea
                name="message"
                id="message"
                cols='30'
                rows='7'
                placeholder='Enter your message here'
                {...register("message",{required:true})}
                />
                {
                    errors.message && (
                        <span  className="text-[#CD5C5C]">
                            Enter your message here
                        </span>
                    )
                }
            </div>
        </div>
        <button  type="submit" className=" text-center w-fit rounded-md bg-cyan-200 font-bold text-black p-4 items-center">
                Send Message 
        </button>
    </form>
  )
}

export default ContactusForm