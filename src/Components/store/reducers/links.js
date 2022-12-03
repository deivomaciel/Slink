const INITIAL_STATE = [
    {
      title: "RocketSeat",
      description: "Plataforma de estudos online.",
      link: "https://www.rocketseat.com.br/"
    },
    {
      title: "Bennettfeely",
      description: "Site para gerar clip path.",
      link: "https://bennettfeely.com/clippy/"
    },
    {
      title: "Pixabay",
      description: "Site para baixar imagens free.",
      link: "https://pixabay.com/pt/"
    },
    {
      title: "Getwaves",
      description: "Site de ondas SVG.",
      link: "https://getwaves.io/"
    },
    {
      title: "Figma",
      description: "Ferramenta de design.",
      link: "https://www.figma.com/"
    },
    {
      title: "Adobe Color",
      description: "Site para verificar cores.",
      link: "https://color.adobe.com/pt/create/color-wheel"
    },
    {
      title: "Coolors",
      description: "Ferramenta para criar paleta de cores.",
      link: "https://coolors.co/"
    },
    {
      title: "Coolors",
      description: "Ferramenta para criar paleta de cores.",
      link: "https://coolors.co/"
    },
    {
      title: "Coolors",
      description: "Ferramenta para criar paleta de cores.",
      link: "https://coolors.co/"
    }
  ]

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