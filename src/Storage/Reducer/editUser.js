const initialState = {
    data:null,
    errorMessage:null,
    isLoading:false
}

const edit_user = (state=initialState,action)=>{
    if(action.type === 'USER_EDIT_PENDING'){
        return{
            ...state,
            isLoading:true,
            errorMessage:null
        }
    } else if(action.type === 'USER_EDIT_SUCCESS'){
        return{
            ...state,
            data:action.payload,
            isLoading:false
        }
    } else if(action.type === 'USER_EDIT_FAILED'){
        return{
            ...state,
            errorMessage:action.payload,
            isLoading:false
        }
    } else{
        return state
    }
}

export default edit_user