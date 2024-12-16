// src/components/AttendanceList.js
import React, { useState } from 'react';
import axios from 'axios';

const AttendanceList = () => {
  const [sessionId, setSessionId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:4000/attendance', {
        params: {
          session_id: sessionId,
          course_id: courseId,
          faculty_id: facultyId,
        },
      });
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Get Attendance Records</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
        />
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
        />
        <input
          type="text"
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
        />
        <button
          onClick={fetchAttendanceRecords}
          className="w-full bg-lightBlue-500 text-white p-2 rounded hover:bg-lightBlue-600 transition duration-200"
        >
          Fetch Attendance
        </button>
      </div>

      {attendanceRecords.length > 0 && (
        <ul className="mt-6">
          {attendanceRecords.map((record) => (
            <li key={record._id} className="border-b py-2">
              {`Student ID: ${record.student_id}, Status: ${record.status}, Date: ${record.on_date}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList;
