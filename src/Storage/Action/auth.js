import axios from "axios";

export const loginUser = (data,navigate) => async (dispatch)=> {
    try{
        dispatch({type:'USER_LOGIN_PENDING'})
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`,data)
        const user = result.data.data
        localStorage.setItem("token",user.token)
        localStorage.setItem("email",user.email)
        localStorage.setItem("name",user.name)
        localStorage.setItem("photo",user.photo)
        dispatch({type:'USER_LOGIN_SUCCESS',payload:user})
        navigate('/home')
    } catch(err){
        dispatch({type:'USER_LOGIN_FAILED',payload:err.response.data.message})
        console.log("loginUser error")
        console.log(err)
    }
}

export const registerUser = (data) => async (dispatch)=> {
    try{
        dispatch({type:'USER_REGISTER_PENDING'})
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,data)
        const user = result.data
        dispatch({type:'USER_REGISTER_SUCCESS',payload:user})
    } catch(err){
        dispatch({type:'USER_REGISTER_FAILED',payload:err.response.data.message})
        console.log("registerUser error")
        console.log(err)
    }
}

export const updateUser = (data,navigate) => async (dispatch)=> {
    try{
        const token = localStorage.getItem("token")
        let headers = {
            headers:{
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
        }}
        dispatch({type:'USER_EDIT_PENDING'})
        const result = await axios.put(`${process.env.REACT_APP_API_URL}/users/updateProfile`,data,headers)
        const user = result.data
        const photo = await axios.get(`${process.env.REACT_APP_API_URL}/users/myProfile`,headers)
        console.log(photo)
        localStorage.setItem("photo",photo.data.data[0].photo)
        dispatch({type:'USER_EDIT_SUCCESS',payload:user})
        navigate('/profile')
    } catch(err){
        dispatch({type:'USER_EDIT_FAILED',payload:err.response.data.message})
        console.log("editUser error")
        console.log(err)
    }
}