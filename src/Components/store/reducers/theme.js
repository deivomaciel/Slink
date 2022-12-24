let INITIAL_STATE = 'light'

export default function theme(state = INITIAL_STATE, action) {
    if(action.type == 'CHANGE_THEME') {
        action.theme == 'dark' ? state = 'dark' : state = 'light'
    }

    return state
}