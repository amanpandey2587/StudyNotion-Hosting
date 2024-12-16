import React from 'react'
import {Link} from 'react-router-dom'

const PurpleButton = ({children,active, linkTo}) => {
  return (
    <Link to={linkTo}>
      <div className={` text-center text-[13px] px-6 py-3 rounded-md font-bold 
      ${active ? "bg-purple-200 shadow-lg shadow-purple-50/50 text-black" : "bg-richblack-800 shadow-lg shadow-[#808080]/50"} 
      hover:scale-95 transition-all duration-200 `}>
        {children}
      </div>
    </Link>
  )
}

export default PurpleButton