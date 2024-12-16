// src/components/Homepage.js
import React from 'react';
import { useNavigate  } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const navigateToAttendance = () => {
        navigate('/attendance');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4 text-deepBlueHead">
                Welcome to the Attendance Management System
            </h1>
            <p className="mb-8 text-lg text-gray-700">
                Please click the button below to go to the attendance page.
            </p>
            <button 
                className="px-6 py-2 text-white bg-cyan-400 hover:bg-lightBlue300 rounded transition duration-300"
                onClick={navigateToAttendance}
            >
                Go to Attendance Page
            </button>
        </div>
    );
};

export default Homepage;
