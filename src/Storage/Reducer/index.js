import { combineReducers } from "redux";
import user from "./user";
import registerUser from "./registerUser"
import editUser from "./editUser"
import menu from "./menu"
import deleteMenu from "./deleteMenu"
import addMenu from "./addMenu"
import editMenu from "./editMenu"


const rootReducers = combineReducers({
    user, registerUser, editUser, menu, addMenu, editMenu, deleteMenu
})

export default rootReducers