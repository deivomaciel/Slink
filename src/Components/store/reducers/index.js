import { combineReducers } from "redux"
import popUp from "./popup"
import links from "./links"
import confirmDelete from "./confirmDelete"
import theme from "./theme"

export default combineReducers({
    popUp,
    links,
    confirmDelete,
    theme
})