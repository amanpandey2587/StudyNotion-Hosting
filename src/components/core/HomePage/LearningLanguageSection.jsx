import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 w-fit items-center">
            <div className="text-4xl font-semibold text-center">
                Your Swiss-Knife for 
                <HighlightText text={" learning any language "} color=" #00B2A9 "/>
            </div>

            <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%] ">
                Using spin making learning multiple languages easy, with 20+ languages realistic voice-over,
                progress-tracking,custom-scheduling and more ...
            </div>

            <div className="flex flex-row items-center justify-center mt-5">
                    <img
                    src={know_your_progress}
                    alt="KnowYourProgress"
                    className="object-contain -mr-28 h-[50%] w-[350px]"
                    />

                    <img
                    src={compare_with_others}
                    alt="compareWithOthers"
                    className="object-contain h-[50%] w-[350px]"
                    />

                    <img
                    src={plan_your_lessons}
                    alt="planYourLessons"
                    className="object-contain -ml-32 h-[50%] w-[350px]"
                    />
            </div>

            <div>
                <Button active={true} linkTo={"/signup"} className="w-fit items-center">
                    <div>
                        Learn More 
                    </div>
                </Button>
            </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
