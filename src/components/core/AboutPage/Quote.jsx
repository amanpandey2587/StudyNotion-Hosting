import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-richblack-5 font-3xl mt-4">
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology"} color={'#9000E6'} />
        <span className="bg-gradient-to-b from-[#ff512f] to-[#f09819] text-transparent bg-clip-text font-bold  ">
          {" "} expertise 
        </span>
        , and community to create an 
        <span className="bg-gradient-to-b from-[#ff512f] to-[#f09819] text-transparent bg-clip-text font-bold  ">
          {" "} 
          unparalleled educational experience.
        </span>

    </div>
  )
}

export default Quote