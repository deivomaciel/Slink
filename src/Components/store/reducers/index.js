import { combineReducers } from "redux";
import popUp from "./popup"
import links from "./links"
import confirmDelete from "./confirmDelete"

export default combineReducers({
    popUp,
    links,
    confirmDelete
})