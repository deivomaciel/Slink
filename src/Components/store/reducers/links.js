const INITIAL_STATE = []

const deletElementById = id => {
    for(let i = 0; i < INITIAL_STATE.length - 1; i++) {
        if(INITIAL_STATE[i].id == id) {
            INITIAL_STATE.splice(i, 1)
            break
        }
    }
}

export default function links(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADD_CARD":
            INITIAL_STATE.unshift({
                id: action.newCard.id,
                title: action.newCard.title,
                link: action.newCard.link,
                description: action.newCard.description
            })
            break

        case "DELET_CARD":
            deletElementById(action.id)
            break

        default:
            break
    }
    return state
}