// src/components/AttendanceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceForm = () => {
  const [sessionId, setSessionId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [onDate, setOnDate] = useState('');
  const [status, setStatus] = useState('');
  const [userImage, setUserImage] = useState(''); // State to store user image
  // Fetch user image based on student ID
  console.log("rollNo is ",rollNo)
  
  useEffect(() => {
    const fetchUserImage = async () => {
      if (rollNo) {
        try {
          const response = await axios.get(`http://localhost:4000/students/${rollNo}`); // Adjust the endpoint as needed
          setUserImage(response.data.image); // Assuming your API returns an image field
          
          console.log("userImage link is ,",response.data)
        } catch (error) {
          console.error(error);
          setUserImage(''); // Clear image if there's an error
        }
      } else {
        setUserImage(''); // Clear image if student ID is empty
      }
    };

    fetchUserImage();
  }, [rollNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you gather these values from your form inputs
    const attendanceData = {
        session_id: sessionId,
        course_id: courseId,
        faculty_id: facultyId,
        student_id: rollNo,
        on_date: onDate, // Use appropriate date format
        status:status, // Ensure this is included
    };

    try {
      const response = await axios.post('http://localhost:4000/attendance', attendanceData);
      console.log('Attendance Response:', response.data);
    } catch (error) {
        console.error(error.response.data); // Log the error for debugging
    }
};


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10 flex">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-center">Post Attendance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          />
          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          />
          <input
            type="text"
            placeholder="Faculty ID"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          />
          <input
            type="date"
            value={onDate}
            onChange={(e) => setOnDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
          >
            <option value="">Select Status</option>
            <option value="YES">Present</option>
            <option value="NO">Absent</option>
          </select>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-lightBlue-600 transition duration-200"
          >
            Submit Attendance
          </button>
        </form>
      </div>
      {/* User image section on the right */}
      <div className="flex-none w-48 ml-4 flex justify-center items-center">
        {userImage && (
          <img src={`https://res.cloudinary.com/daa3y840x/image/upload/fl_preserve_transparency/v1729150332/05b9bbb7-9f13-45e1-9fca-49b7b48fe6c8_t1n2p2.jpg?_s=public-apps`} alt="UserImage Not Found " className="w-40 h-40 rounded-full border" />
        )}
      </div>
    </div>
  );
};

export default AttendanceForm;
