import React from 'react'
import {FooterLink2} from "../../data/footer-links";
import {Link} from "react-router-dom"
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import {FaFacebook,FaGoogle,FaYoutube} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";

const BottomFooter=["Privacy Policy", "Cookie Policy","Terms"];
const Resources =[
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code Challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans=["Paid Memberships", "For Students","Business Solutions"];
const Community=["Forums", "Chapters","Events"];
const footer = () => {
  return (
    <div className="bg-richblack-800">
        {/* upper part */}
      <div className="flex lg:flex-row flex-col gap-8 items-center justify-between w-11/12
      max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
            
            {/* Section 1 */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
                <div className="w-[30%] flex flex-col gap-3 mb-7">
                    <img src={Logo} alt="StudySyncLogo" className="object-contain"/>
                    <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
                    <div className="flex flex-col gap-2 mt-2">
                        {
                            ["About", "Careers", "Affiliates"].map((element,index)=>{
                                return (
                                    <div key={index}
                                     className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                        <Link to={element.split(" ").join("-").toLowerCase()} >{element}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex gap-3 text-lg">
                        <FaFacebook/>
                        <FaGoogle/>
                        <FaXTwitter/>
                        <FaYoutube/>
                    </div>
                </div>

                <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                    <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
                    <div className="flex flex-col gap-2 mt-2">
                        {
                            Resources.map((element,index)=>{
                                return (
                                    <div key={index}
                                     className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                        <Link to={element.split(" ").join("-").toLowerCase()} >{element}</Link>
                                    </div>
                                )
                            })
                        }
                    </div>
               
                    <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                        Support</h1>
                    <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2 ">
                        <Link to="{/help-center}" >Help Center</Link>
                    </div>
                </div>

                <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                    <h1 className="text-richblack-50 font-semibold">
                        Plans
                        </h1>
                    <div className="flex flex-col gap-2 mt-2">
                        {Plans.map((element,index)=>{
                            return (
                                <div key={index}>
                                    <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                </div>
                            )
                        })}
                    </div>

                    
                <div className="w-[48%] lg:w-[30%] mb-7 mt-7 lg:pl-0">
                    <h1 className="text-richblack-50 font-semibold">
                        Community
                        </h1>
                    <div className="flex flex-col gap-2 mt-2">
                        {Community.map((element,index)=>{
                            return (
                                <div key={index}>
                                    <Link to={element.split(" ").join("-").toLowerCase()}>{element}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                </div>
            </div>

            {/* Section 2 */}
                <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                    {
                        FooterLink2.map((element,index)=>{
                            return (
                                <div key={index} 
                                className="w-[46%] lg:w-[30%] mb-7 lg:pl-0  pl-3">
                                    <h1 className="text-richblack-50 font-semibold text-[16px]">
                                        {element.title}
                                    </h1>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {element.links.map((link,index)=>{
                                            return (
                                                <div
                                                key={index}
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                                    <Link to={link.link}>{link.title}</Link>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


        </div>
      </div>

        {/* Lower part  */}
        <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm ">
            <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                <div className="flex flex-row">
                    {
                        BottomFooter.map((element,index)=>{
                            return (
                                <div
                                key={index}
                                className={` px-3
                                ${BottomFooter.length-1===index?"":
                                "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"}`}
                                >
                                <Link to={element.split(" ").join("-").toLowerCase()}>
                                    {element}
                                </Link>
                                </div>
                            )

                        })
                    }

                </div>

                <div className="text-center">Made by Aman Pandey</div>
            </div>
        </div>
    </div>
  )
}

export default footer
