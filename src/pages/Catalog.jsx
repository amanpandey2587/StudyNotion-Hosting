import React, { useEffect,useState } from 'react'
import Footer from "../components/common/footer1"
import { useParams } from 'react-router-dom'
import {apiConnector} from "../services/apiConnector"
import {categories} from "../services/apis"
import {getCatalogPageData} from "../services/operations/pageAndComponentData"
import Course_Card from '../components/core/Catalog/Course_Card'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useSelector } from 'react-redux'
import Error from "./Error"
const Catalog = () => {
  const {loading}=useSelector((state)=>state.profile)
  const [active,setActive]=useState(1)
  const {catalogName}=useParams()
  const [catalogPageData,setCatalogPageData]=useState(null)
  const [categoryId,setCategoryId]=useState("");

  // Fetch All Categories
  useEffect(()=>{
      const getCategories=async()=>{
        const res=await apiConnector("GET",categories.CATEGORIES_API);
        const category_id=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
        setCategoryId(category_id);
        console.log("Result is ,",res)
      }
      getCategories();
  },[catalogName])

  // Use effect for running the above useEffect 
  useEffect(()=>{
    const getCategoryDetails=async()=>{
      try{
        const res=await getCatalogPageData(categoryId);
        console.log("Printing Log");
        console.log("Result is ",res);
        setCatalogPageData(res);
      }catch(error){
        console.log(error);
      }
    }
    if(categoryId){
      getCategoryDetails();
    }
  },[categoryId])

  if(loading|| !catalogPageData){
    return (
      <div className='grid min-h-[calx(100vh-3.5rem)]' >
        <div className='spinner' ></div>
      </div>
    )
  }
  if(!loading && !catalogPageData.success){
    return <Error/>
  }
  return (
    <div className='box-content bg-richblack-800 px-4'>

    <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ' >
      <p className='text-sm text-richblack-300' >{`Home/Catalog/`} 
      <span className='text-cyan-25' >{catalogPageData?.data?.selectedCategory?.name}</span>
      </p>
      <p className='text-3xl text-richblack-5'  >{catalogPageData?.data?.selectedCategory?.name}</p>
      <p className='max-w-[870px] text-richblack-200 ' >{catalogPageData?.data?.selectedCategory?.description}</p> 
    </div>

    <div>
      {/* section1 */}
      <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent ' >
        <div className='text-2xl text-richblack-5'>Courses to get you started </div>
        <div className='flex gap-x-3 '>
          <p className={`px-4 py-2 ${
            active==1 ? "border-b border-b-cyan-25 text-cyan-25" : "text-richblack-50"
          } cursor-pointer  `}
          onClick={()=>setActive(1)}
          >
            Most Popular
          </p>
          <p className={`px-4 py-2 ${
            active===2 ? "border-b border-b-cyan-25 text-cyan-25" : "text-richblack-50"
          } cursor-pointer`} 
          onClick={()=>setActive(2)}
          >
            New</p>
        </div>
        <div>
        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
        </div>
      </div>

      {/* section2 */}
      <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <div className='text-2xl text-richblack-5'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
        <div className='py-8 '> 
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
        </div>
      </div>

      {/* section3 */}
      <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <div className='text-2xl text-richblack-5'>
          Frequently Bought
        </div>
        <div className='py-8' >
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'  >  
            {
              catalogPageData?.data?.mostSellingCourses?.slice(0,4)
              .map((course,index)=>(
                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default Catalog
