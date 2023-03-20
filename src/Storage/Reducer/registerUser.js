const initialState = {
    data:null,
    errorMessage:null,
    isLoading:false
}

const register_user = (state=initialState,action)=>{
    if(action.type === 'USER_REGISTER_PENDING'){
        return{
            ...state,
            isLoading:true,
            errorMessage:null
        }
    } else if(action.type === 'USER_REGISTER_SUCCESS'){
        return{
            ...state,
            data:action.payload,
            isLoading:false
        }
    } else if(action.type === 'USER_REGISTER_FAILED'){
        return{
            ...state,
            errorMessage:action.payload,
            isLoading:false
        }
    } else{
        return state
    }
}

export default register_user