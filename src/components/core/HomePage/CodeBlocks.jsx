import React from 'react'
import Button from "./Button"
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient , codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/* Section 1- flex-col */}
        <div className="w-[50%] flex flex-col gap-8">
            
            <div className="font-semibold text-xl">
                {heading}
            </div>
            <div className="text-richblack-300 font-bold ">
                {subheading}
            </div>

            <div className="flex flex-row gap-7 mt-7">
                <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRightLong/>
                    </div>
                </Button>

                <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                    {ctabtn2.btnText}
                    </div>
                </Button>

            </div>
        </div>

        {/* Section 2 -flex-row (Side to Side)  */}
        <div className='h-fit flex flex-row text-[10px] w-[50%] py-4 relative 
        '
        
        >
           {/* <div className="w-72 h-40 absolute backdrop-blur-3xl rounded-full  flex justify-center items-center text-white text-2xl"
       style={{ background: "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)" }}>
  </div> */}

            <div className="flex flex-col text-center w-[10%] font-inter font-bold richblack-400">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>

            </div>

            <div className={`flex flex-col w-[90%] gap-2 font-bold font-mono ${codeColor} pr-2 lg:w-[500px]`}>
                <TypeAnimation
                sequence={[codeblock ,2000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}

                style={
                    {
                        whiteSpace: "pre-line",
                        inline:"block"
                    }
                }
                />

            </div>

        </div>


    </div>
  )
}

export default CodeBlocks
