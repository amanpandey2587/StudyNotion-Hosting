import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText'
import Button from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Footer from '../components/common/footer1';
import ExploreMore from "../components/core/HomePage/ExploreMore"
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from "../components/common/ReviewSlider"
const Home = () => {
  return (
    <div className="w-full h-full">
      {/* Navbar */}
      {/* <Navbar/> */}
      
      {/* section 1 */}
        <div className="relative mx-auto flex flex-col w-11/12 items-center
        text-white justify-between">
            <Link to={"/signup"}>
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit ">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRightLong />
                    </div>
                </div>

            </Link>

            <div className="mt-7 text-4xl text-center font-semibold ">
              Empower Your Future with 
              <HighlightText text={" Coding Skills"} color="#00FFFF"/>
            </div>

            <div className="text-center text-richblack-300 mt-4 w-[90%] text-lg font-bold ">
              With our online coding courses, you can learn at your own pace ,from anywhere in the world and get access to a wealth of resources ,
              including hands-on project ,quizzes ,and personalized feedback from instructors.
            </div>

            <div className="flex flex-row gap-7 mt-8">
              <Button active={true} linkTo={"/signup"}>
                Learn More
              </Button>

              <Button active={false} linkTo={"/login"}>
                Book a demo
              </Button>
            </div>

            <div className="shadow-blue-200 w-[90%] max-h-[60%] mx-3 my-12">
  <video className="w-full h-full " muted loop autoPlay>
    <source src={Banner} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
            </div>

            {/* Code Section 1  */}

            

            <ExploreMore/>

        </div>

      {/* section 2 */}
      <div className={`bg-pure-greys-5 text-richblack-700`}>
        <div className='homepage_bg h-[310px]'>
            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto ">
                    
                    <div className='h-[150px]'></div>
                    <div className="flex flex-row gap-7 text-white">
                      <Button active={true} 
                      linkTo={"/signup"}>
                        <div className="flex items-center gap-3 ">
                          Explore Full Catelog
                          <FaArrowRightLong />
                        </div>
                      </Button>

                      <Button active={false}
                      linkTo={"/signup"}>
                        <div>
                          Learn More
                        </div>
                      </Button>
                    </div>
        </div>
            

        </div>
                    

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row  gap-5 mt-20'>
                      <div className="text-2xl font-semibold w-[45%]">
                        Get the Skills you need for a 
                        <HighlightText text={" Job that is in demand "} color={"#0F7A9D"}/>
                      </div>

                      <div className="flex flex-col gap-10 w-[40%] items-start">
                        <div className='text-[1rem]'>
                          The modern Studysync dictates its own terms. Today,to be a competitive 
                          specialist requires more than Professional skills.
                        </div>

                        <Button active={true} linkTo={"/signup"}>
                          <div>
                            Learn More 
                          </div>


                        </Button>
                      </div>
                      </div>


                    <TimelineSection/>

                    <LearningLanguageSection/>

                    </div>
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection/>

        <h2 className="text-center text-2xl font-semibold mt-10">Review from other Learners </h2>
        {/* Review slider here */}
        <ReviewSlider/>
      </div>

      {/* footer */}
      <Footer/>

    </div>
  )
}
export default Home
