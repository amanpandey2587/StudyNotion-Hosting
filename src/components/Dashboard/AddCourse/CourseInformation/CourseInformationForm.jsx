import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdNavigateNext } from 'react-icons/md';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operations/courseDetailsAPI';
import { setStep, setCourse } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import RequirementField from './RequirementField';
import { COURSE_STATUS } from '../../../../utils/constants';
import IconBtn from '../../../common/IconBtn';
import ChipInput from './ChipInput'
import Upload from '../Upload';
const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        };

        if (editCourse) {
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            setValue('courseCategory', course.category._id); // Ensure we set the ID for the selected category
            setValue('courseRequirements', course.instructions);
            setValue('courseImage', course.thumbnail);
        }
        getCategories();
    }, [editCourse, course, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id || // Compare with ID
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        );
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        
        if (editCourse) {
            if (isFormUpdated()) {
                formData.append('courseId', course._id);
                if (data.courseTitle !== course.courseName) {
                    formData.append('courseName', data.courseTitle);
                }
                if (data.courseShortDesc !== course.courseDescription) {
                    formData.append('courseDescription', data.courseShortDesc);
                }
                if (data.coursePrice !== course.price) {
                    formData.append('price', data.coursePrice);
                }
                if (data.courseTags.toString() !== course.tag.toString()) {
                    formData.append('tag', JSON.stringify(data.courseTags));
                }
                if (data.courseBenefits !== course.whatYouWillLearn) {
                    formData.append('whatYouWillLearn', data.courseBenefits);
                }
                if (data.courseCategory !== course.category._id) {
                    formData.append('category', data.courseCategory);
                }
                if(data.course)
                if (data.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append('instructions', JSON.stringify(data.courseRequirements));
                }
                if(data.courseImage!==course.thumbnail){
                    formData.append("thumbnailImage",data.courseImage)
                }
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                } else {
                    toast.error("Error updating course details.");
                }
            } else {
                toast.error("No changes made so far.");
            }
        } else {
            // Create a new course
            formData.append('courseName', data.courseTitle);
            formData.append('courseDescription', data.courseShortDesc);
            formData.append('price', data.coursePrice);
            // formData.append('tag', JSON.stringify(data.courseTags));
            formData.append('whatYouWillLearn', data.courseBenefits);
            formData.append('category', data.courseCategory);
            formData.append('status', COURSE_STATUS.DRAFT);
            formData.append('instructions', JSON.stringify(data.courseRequirements));
            formData.append("thumbnailImage", data.courseImage)

            // Log form data entries to verify
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            setLoading(true);
            const result = await addCourseDetails(formData, token);
            setLoading(false);

            if (result) {
                dispatch(setCourse(result));
                dispatch(setStep(2));
            } else {
                toast.error("Error creating course.");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border-richblack-700 bg-richblack-800 p-4 space-y-8 text-richblack-200'
        >
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='courseTitle'>
                    Course Title <sup className='text-pink-300'>*</sup>
                </label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register('courseTitle', { required: true })}
                    className='w-full form-style'
                />
                {errors.courseTitle && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Title is Required
                    </span>
                )}
            </div>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='courseShortDesc'>
                    Course Short Description<sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter course Description'
                    {...register('courseShortDesc', { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />
                {errors.courseShortDesc && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Description is mandatory
                    </span>
                )}
            </div>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='coursePrice'>
                    Course Price <sup className='text-pink-300'>*</sup>
                </label>
                <div className='relative'>
                    <input
                        id='coursePrice'
                        placeholder='Enter Course Price'
                        {...register('coursePrice', {
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                message: "Invalid price format"
                            },
                        })}
                        className='form-style w-full !pl-12'
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Price is Required
                    </span>
                )}
            </div>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='courseCategory'>
                    Course Category<sup className='text-pink-200'>*</sup>
                </label>
                <select
                    id='courseCategory'
                    defaultValue={editCourse ? course.category?._id : ""}
                    {...register('courseCategory', { required: true })}
                    className='form-style w-full'
                >
                    <option value="" disabled>Choose a Category</option>
                    {!loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))}
                </select>
                {errors.courseCategory && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Course Category is required
                    </span>
                )}
            </div>

            {/* Custom Component for handling tags input */}
            {/* <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            /> */}
            {/* <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      /> */}
            {/* Course Benefits */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='courseBenefits'>
                    Benefits of the course<sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    id='courseBenefits'
                    placeholder='Enter Benefits of the course'
                    {...register('courseBenefits', { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />
                {errors.courseBenefits && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>
                        Benefits of the course are required
                    </span>
                )}
            </div>
            {/* Add additional form fields and components as needed */}
            <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        setLoading={setLoading}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
           {/* Requirements/Instructions */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue WiThout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
        </form>
    );
};

export default CourseInformationForm;
