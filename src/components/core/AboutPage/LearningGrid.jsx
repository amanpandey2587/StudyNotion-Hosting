import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import Button from '../HomePage/Button';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studysync partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studysync partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studysync partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studysync partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studysync partners with more than 275+ leading universities and companies to bring",
    },
  ];


const LearningGrid = () => {
  return (
    <div className="grid mx-auto lg:grid-cols-4 grid-cols-1 mb-10 w-11/12 max-w-maxContent lg:w-fit bg-richblack-900">
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div
                    key={index}
                    className={`${index===0 && "lg:col-span-2 bg-richblack-900"}
                    ${
                        card.order%2===1 ? "bg-richblack-600":"bg-richblack-800"
                    }
                    ${
                        card.order===3 && "lg:col-start-2"
                    }
                    h-[250px]
                    `}
                    >
                        {
                            card.order<0?(
                            <div className=" lg:w-[90%] flex flex-col pb-5 gap-3 p-4 bg-richblack-900">
                                <div className="text-3xl font-semibold">
                                    {card.heading}
                                    <br></br>
                                    <HighlightText text={card.highlightText} color="#D080Ff" />
                                </div>
                                <p className="text-[1rem] text-center text-richblack-300 font-medium">
                                    {card.description}
                                </p>
                                <div className="items-center w-fit mt-2">
                                    <Button active={true} linkTo={card.BtnLink}>
                                        {card.BtnText}
                                    </Button>
                                </div>
                            </div>):(
                            <div className="flex flex-col gap-8 flex-wrap pt-6 p-4 items-center justify-between">
                                <h1 className="text-richblack-5 text-lg">
                                    {card.heading}
                                </h1>
                                <p className="text-richblack-25 font-medium">
                                    {card.description}
                                </p>
                            </div>)
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid;