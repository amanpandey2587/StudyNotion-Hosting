// styling -done 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IoMdEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle on submit dispatch action for resetting password
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;
        const token = location.pathname.split('/').at(-1);  // Get token from the URL
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className="text-white grid min-h-[calc(100vh-3.rem)] place-items-center   ">
            {loading ? (
                <div>
                    Loading ...
                </div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8 "  >
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5  ">
                        Choose new password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100  ">
                        Almost done, Enter your new password and you're all set.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="relative  " >
                            <p className="mb-1 text-[0.875rem] leading-[1.625rem] text-richblack-5 "  >
                                New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                className="w-full py-2 px-2 bg-richblack-600 text-richblack-5 !pr-10"
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                            />
                            <span onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer '>
                                {showPassword ? <IoMdEye fontSize={24} fill='#AFB2BF' /> : <IoEyeOffSharp fontSize={24} fill='#AFB2BF' />}
                            </span>
                        </label>

                        <label className="relative mt-3 block">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5  ">
                                Confirm New Password <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                className="w-full py-2 px-2 bg-richblack-600 text-richblack-5"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter your new confirmed password"
                            />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-[36px] z-[10] cursor-pointer '
                            >
                                {showConfirmPassword ? <IoMdEye fontSize={24} /> : <IoEyeOffSharp fontSize={24} />}
                            </span>
                        </label>

                        <button type="submit"
                        className=" mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 "  >
                            Reset Password
                        </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between ">
                            <Link to="/login">
                            <p className='flex items-center gap-x-2 text-richblack-5'>
                            <BiArrowBack />    Back to Login
                            </p>
                            </Link>
                        </div>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
