import Header from "../header/Header";
import Card from "../card/Card";
import AddCard from "../addCard/AddCard";
import { BiPlus } from "react-icons/bi"
import { connect } from "react-redux"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConfig";
import "./styles.css"
import { useEffect } from "react";

function App({ modules, dispatch }) {
  const uid = JSON.parse(localStorage.userInfo).uid
  let flag = false

  const showPopUp = (popUp) => {
    return {
      type: 'SET_POP_UP_ACTIVE',
      popUp
    }
  }

  const addNewCard = (newCard) => {
    return {
        type: "ADD_CARD",
        newCard
    }
  }

  const getAllCards = async () => {
    const querySnapshot = await getDocs(collection(db, `users/${uid}/cards`))
    querySnapshot.forEach((doc) => {
      dispatch(addNewCard({ 
        title: doc.data().title,
        link: doc.data().link,
        description: doc.data().desc
      }))
    })
  }

  if(modules.popUp.activePopUp) {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY = 'auto'
  }

  useEffect(() => {
    if(flag) return
    getAllCards()
    flag = true
  }, [])

  return (
    <div className="home-container">
      {modules.popUp.activePopUp && <AddCard />}
      <Header />
      
      <button className="add-btt" onClick={() => dispatch(showPopUp(true))}>
        <BiPlus size={48}/>
      </button>

      <main>
        <div className="links-container">
        {
          modules.links.length < 1 ? (
            <div className="no-links-div"> 
              <h1>Você ainda não salvou nenhum link.</h1>
            </div>
          ) : (
            modules.links.map(card => (
              <Card 
                title={card.title}
                link={card.link}
                description={card.description}
              />
            ))
          )
        }
        </div>
      </main>
    </div>
  );
}

export default connect(state => ({ modules: state }))(App);