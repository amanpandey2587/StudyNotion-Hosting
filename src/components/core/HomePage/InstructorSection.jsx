import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'

const InstructorSection = () => {
  return (
    <div className="mt-16 ">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%]">
            <img src={Instructor}
            alt="Instructor"
            className="shadow-white"
            />
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
            <div className="text-4xl font-semibold">
                Become an 
                <HighlightText text={" Instructor "} color={"#0F7A9D"}/>
            </div>

            <p className='font-medium text-[1rem] w-[90%] text-richblack-300'>
                Instructors from around the world teach millions of students on StudySync. We provide the 
                tools and skills to teach you what you love.

            </p>

        </div>

      </div>
    </div>
  )
}

export default InstructorSection
