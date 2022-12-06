let cardToDelete = {
    id: null,
    title: null,
    link: null
}

export default function links(state = cardToDelete, action) {
    if(action.type == "ADD_CARD_TO_DELETE") {
        cardToDelete.id = action.cardInfo.id
        cardToDelete.title = action.cardInfo.title
        cardToDelete.link = action.cardInfo.link
    }
    return state
}