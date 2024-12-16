import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from "../../../common/IconBtn"
import { MdAddCircleOutline } from "react-icons/md";
import {BiAddToQueue} from "react-icons/bi"
import { useDispatch,useSelector } from 'react-redux';
import { MdNavigateNext } from "react-icons/md";
import {setCourse,setEditCourse,setStep} from "../../../../slices/courseSlice"
import {toast} from "react-hot-toast"
import {createSection,updateSection} from "../../../../services/operations/courseDetailsAPI"
import NestedView from "./NestedView"

const CourseBuilderForm = () => {

  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const [editSectionName,setEditSectionName]=useState(null);
  const {course}=useSelector((state)=>state.course);
  const [loading,setLoading]=useState(false);
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }

  const goBack=()=>{
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext=()=>{
    if(course.courseContent.length===0){
      console.log(course.courseContent.length)
      toast.error("Please add atleast one course");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please add atleast one Section");
      return;
    }
    // if everything is ok
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return;
    }
    // check whether dispatch is required here or not 
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }

  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result;
      if (editSectionName) {
        result = await updateSection(
          {
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
          },
          token
        );
      } else {
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        );
      }
      console.log("Result after submission:", result);

      if (result) {
        dispatch(setCourse(result));
        setEditSectionName(null)
        setValue("sectionName", "");
        toast.success(editSectionName ? "Section updated successfully!" : "Section created successfully!");
        
      } else {
        toast.error("Failed to create/update section. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message); 
    } finally {
      setLoading(false); 
    }
  };
  console.log("Course is ",course);
  console.log("Course Content is ",course.courseContent);
  console.log("Course Content length is ",course.courseContent.length);

  useEffect(() => {
    console.log("Updated course data:", course);
  }, []);

  return (
    <div className='text-white' >
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>
            Section name <sup className='text-pink-300'>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName",{required:true})} 
            className='w-full text-richblack-600'       
          />
          {
            errors.sectionName && (
              <span>Section Name is required.</span>
            )
          }
        </div>
        <div className='flex gap-4 items-end'>
          <div className="mt-2">
          <button
          type="submit"
          disabled={loading}
          className={`flex items-center 
          border text-cyan-100 border-cyan-100 bg-transparent 
          cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold
          `}
          >
            {editSectionName ?<span> Edit Section Name</span>:<span>Create Section</span>}
            <MdAddCircleOutline className='text-cyan-50' />
          </button>
          </div>

          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
            
      {
        course.courseContent.length>0 && (
          <div>
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}   />
          </div>
        )
      }

      <div className='flex justify-end gap-x-3 '>
        <button
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center gap-x-2 bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 '
        >
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext} className="mt-10">
          <MdNavigateNext />
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm