import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {deleteSection, deleteSubSection} from "../../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import {setCourse} from "../../../../slices/courseSlice"

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  console.log("Token in nestedView is",token);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    console.log("REndering it again");
});

  const handleDeleleSection=async(sectionId)=>{
    console.log("Deleting part to be done here ")
    console.log("token in handle delete section is ",token);

    const result=await deleteSection({
      sectionId,
      courseId:course._id,
      token,
    })
    console.log("Result is ",result);
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  }

  // const handleDeleteSubSection = async (subSectionId, sectionId) => {
  //   console.log("Deleting subSection...");
  //   console.log("Token:", token);
  
  //   const result = await deleteSubSection({
  //     subSectionId,
  //     sectionId,
  //     token,
  //   });
  
  //   if (result) {
  //     const updatedCourseContent = course.courseContent.map((section) =>
  //       section._id === sectionId ? { ...section, subSections: result.subSections } : section
  //     );
  //     const updatedCourse = { ...course, courseContent: updatedCourseContent };
  //     dispatch(setCourse(updatedCourse));
  //   }
  
  //   setConfirmationModal(null); 
  // };
  
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    console.log("Deleting subSection...");
    console.log("Token:", token);
  
    // Call the API to delete the subsection
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });
  
    if (result) {
      // Update the specific section with the new `subSection` array
      const updatedCourseContent = course.courseContent.map((section) => {
        if (section._id === result._id) {
          return { ...section, subSection: result.subSection }; // Update this section
        }
        return section; // Keep other sections unchanged
      });
  
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      console.log("Updated Course Content:", updatedCourseContent);
  
      // Dispatch the updated course to the Redux store
      dispatch(setCourse(updatedCourse));
    } else {
      console.error("Failed to delete subsection. Check API response.");
    }
  
    // Close the confirmation modal
    setConfirmationModal(null);
  };
  
  

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8 mt-2 mb-4"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-cyan-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}

export default NestedView;
