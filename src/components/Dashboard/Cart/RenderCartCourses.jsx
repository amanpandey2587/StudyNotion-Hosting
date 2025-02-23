import React from "react";
import { GiNinjaStar } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component"

const RenderCartCourses =()=>{
    const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.cart);
    console.log("Cart has courses ",cart);
    return (
        <div className="flex flex-1 flex-col">
            {
                cart.map((course,index)=>{
                    return(
                    <div key={index}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                        index!==cart.length-1 && 'border-b border-b-richblack-400 pb-6'
                    } ${index!==0 && "mt-6"} `}
                    >
                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                            <img src={course?.thumbnail}
                            alt={course?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover   "
                            />
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg font-medium text-richblack-5 " >{course?.courseName}</p>
                                <p className="text-sm text-richblack-300 " >{course?.category?.name}</p>
                                <div className="flex items-center gap-2 ">
                                    {/* Show rating api here */}
                                    <span className="text-cyan-5">Rating: 4.8</span>
                                    <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#FFD60A"
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon={<GiNinjaStar/>}
                                    />
                                    <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                            <button
                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200 "
                            onClick={()=>dispatch(removeFromCart(course._id))}
                            >
                            <MdDelete />
                            <span>Remove</span>
                            </button>
                            <p className="mb-6 text-3xl font-medium text-cyan-100">₹ {course?.price}</p>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default RenderCartCourses