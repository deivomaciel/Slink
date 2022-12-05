const INITIAL_STATE = []

export default function links(state = INITIAL_STATE, action) {
    if(action.type == "ADD_CARD") {
        INITIAL_STATE.unshift({
            title: action.newCard.title,
            link: action.newCard.link,
            description: action.newCard.description
        })
    }
    return state
}