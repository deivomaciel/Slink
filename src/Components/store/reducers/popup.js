const INITIAL_STATE = {
    activePopUp: false,
    deletePopUp: false
}

export default function popUp(state = INITIAL_STATE, action) {
    if(action.type == "SET_POP_UP_ACTIVE" || action.type == "HIDE_POP_UP" || action.type == "ADD_CARD") {
        return { ...state, activePopUp: action.popUp }
    }

    if(action.type == "SHOW_DELET_POP_UP") {
        return { ...state, deletePopUp: action.popUp}
    }
    return state
}