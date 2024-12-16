import { createSlice } from "@reduxjs/toolkit";
// starting mai local storage se value lenge 
// otherwise hum khud se add kr lenge 

const initialState={
    signupData:null,
    loading:false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null ,
}

const authSlice =createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signupData=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        setToken(state,value){
            state.token = value.payload;
        }
    }
});



export const {setSignupData,setLoading,setToken}=authSlice.actions;
export default authSlice.reducer;