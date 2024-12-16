import React from 'react'
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../slices/cartSlice'
import {toast} from "react-hot-toast"
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {

  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const{
    thumbnail:ThumbnailImage,
    price:CurrentPrice,
    _id:courseId,
  }=course;
  console.log("Course is ",course);
  const handleAddToCart=()=>{
    if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, you cannot buy the course ");
      return ;
    }
    if(token){
      console.log("Dispatching add to cart")
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1:"You are not logged in",
      text2:"Please login to add to cart",
      btn1Text:"login",
      btn2Text:"Cancel",
      btn1Handler:()=>navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null)
    })
  }

  const handleShare=()=>{
    copy(window.location.href)
    toast.success("Link Copied to Clipboard")
  }

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-richblack-700 p-6 text-richblack-5 shadow-md md:max-w-[600px] md:mx-auto">
  <img
    src={ThumbnailImage}
    alt="Thumbnail Image"
    className="max-h-[300px] min-h-[200px] w-full rounded-lg object-contain shadow-lg md:max-w-full"
  />

  <div className="px-4">
    {/* Course Price */}
    <div className="pb-4 text-3xl font-bold text-caribbeangreen-300">
      Rs {CurrentPrice}
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col md:flex-row md:gap-4">
      <button
        className="cursor-pointer rounded-md bg-cyan-50 px-6 py-3 text-lg font-semibold text-richblack-900 transition duration-200 hover:bg-cyan-100"
        onClick={
          user && course?.studentsEnrolled.includes(user?._id)
            ? () => navigate("/dashboard/enrolled-courses")
            : handleBuyCourse
        }
      >
        {
          user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"
        }
      </button>

      {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
        <button
          onClick={handleAddToCart}
          className="mt-3 cursor-pointer rounded-md bg-yellow-50 px-6 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-richblack-600 md:mt-0"
        >
          Add to Cart
        </button>
      )}
    </div>

    {/* Additional Information */}
    <div className="pt-6">
      <p className="pb-3 text-center text-sm text-richblack-400">
        30-Day Money-Back Guarantee
      </p>
      <p className="my-4 text-xl font-semibold">This course requires:</p>

      {/* Mapping of all the videos */}
      <div className="flex flex-col gap-y-3 text-sm text-caribbeangreen-100">
  {course?.instructions &&
    JSON.parse(course.instructions).map((item, index) => (
      <p key={index} className="flex items-center gap-2">
        <BsFillCaretRightFill className="text-caribbeangreen-300" />
        <span>{item.trim()}</span>
      </p>
    ))}
</div>

    </div>

    {/* Share Button */}
    <div className="mt-6 text-center">
      <button
        className="mx-auto flex items-center gap-2 text-lg font-medium text-cyan-50 transition duration-200 hover:text-cyan-100"
        onClick={handleShare}
      >
        <FaShareSquare /> Share
      </button>
    </div>
  </div>
</div>

  );
}

export default CourseDetailsCard
