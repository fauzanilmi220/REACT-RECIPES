import axios from "axios";

export const addMenu = (data,navigate) => async (dispatch)=> {
    try{
        const token = localStorage.getItem("token")
        let headers = {
            headers:{
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
          }}
        dispatch({type:'ADD_MENU_PENDING'})
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/recipe`,data,headers)
        const payload = result.data
        dispatch({type:'ADD_MENU_SUCCESS',payload})
        navigate('/profile')
    } catch(err){
        dispatch({type:'ADD_MENU_FAILED',payload:err.response.data.message})
        console.log("addMenu error")
        console.log(err)
    }
}

export const getMenu = (url) => async (dispatch)=> {
    try{
        dispatch({type:'GET_MENU_PENDING'})
        const token = localStorage.getItem("token")
        let headers = {
            headers:{
              "Authorization": `Bearer ${token}`
          }}
        const result = await axios.get(`${url}`,headers)
        const menu = result.data.data
        dispatch({type:'GET_MENU_SUCCESS',payload:menu})
    } catch(err){
        dispatch({type:'GET_MENU_FAILED',payload:err.response.data.message})
        console.log("getMenu error")
        console.log(err)
    }
}

export const editMenu = (id,data,navigate) => async (dispatch)=> {
    try{
        const token = localStorage.getItem("token")
        let headers = {
            headers:{
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
          }}
        dispatch({type:'EDIT_MENU_PENDING'})
        const result = await axios.put(`${process.env.REACT_APP_API_URL}/recipe/update/${id}`,data,headers)
        const payload = result.data
        dispatch({type:'EDIT_MENU_SUCCESS',payload})
        navigate('/profile')
    } catch(err){
        dispatch({type:'ADD_MENU_FAILED',payload:err.response.data.message})
        console.log("addMenu error")
        console.log(err)
    }
}

export const deleteMenu = (id) => async (dispatch)=> {
    try{
        dispatch({type:'DELETE_MENU_PENDING'})
        const token = localStorage.getItem("token")
        let headers = {
            headers:{
              "Authorization": `Bearer ${token}`
          }}
        const result = await axios.delete(`${process.env.REACT_APP_API_URL}/recipe/delete/${id}`,headers)
        const delete_menu = result.data
        dispatch({type:'DELETE_MENU_SUCCESS',payload:delete_menu})
    } catch(err){
        dispatch({type:'DELETE_MENU_FAILED',payload:err.response.data.message})
        console.log("deleteMenu error")
        console.log(err)
    }
}