const initialState = {
    data:null,
    errorMessage:null,
    isLoading:false
}

const edit_menu = (state=initialState,action)=>{
    if(action.type === 'EDIT_MENU_PENDING'){
        return{
            ...state,
            errorMessage:null,
            isLoading:true
        }
    } else if(action.type === 'EDIT_MENU_SUCCESS'){
        return{
            ...state,
            data:action.payload,
            isLoading:false
        }
    } else if(action.type === 'EDIT_MENU_FAILED'){
        return{
            ...state,
            errorMessage:action.payload,
            isLoading:false
        }
    } else{
        return state
    }
}

export default edit_menu