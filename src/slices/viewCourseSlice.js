import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [], // Will store completed video IDs
  totalNoOfLectures: 0,
  loading: false, // To manage API loading state
  error: null, // To handle API errors
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      // Populate completedLectures with user progress data (array of video IDs)
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      const subSectionId = action.payload;

      // Ensure completedLectures is always an array
      if (!Array.isArray(state.completedLectures)) {
        console.error(
          "completedLectures is not an array. Initializing it as an empty array."
        );
        state.completedLectures = [];
      }

      // Add subSectionId if not already present
      if (!state.completedLectures.includes(subSectionId)) {
        state.completedLectures = [...state.completedLectures, subSectionId];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
  setLoading,
  setError,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;

// Async thunk to fetch completed videos

