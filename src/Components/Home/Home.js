import Header from "../header/Header";
import Card from "../card/Card";
import AddCard from "../addCard/AddCard";
import PopupDelete from "../popupDelete/PopupDelete"
import { BiPlus } from "react-icons/bi"
import { IoIosArrowUp } from "react-icons/io"
import { connect } from "react-redux"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConfig";
import "./styles.css"
import { useEffect, useRef, useState } from "react";
import Skeleton from "../skeleton/Skeleton";

function App({ modules, dispatch }) {
  const goUp = useRef(null)
  let [loadFlag, setLoadFlag] = useState(false) 
  const uid = JSON.parse(localStorage.userInfo).uid
  let flag = false
  const allLinks = modules.links

  const showPopUp = popUp => {
    return {
      type: 'SET_POP_UP_ACTIVE',
      popUp
    }
  }

  const addNewCard = newCard => {
    return {
        type: "ADD_CARD",
        newCard
    }
  }

  const goToTop = () => window.scrollTo(0, 0)

  window.addEventListener('scroll', () => {
    window.scrollY > 300 ? goUp.current.classList.add('animated') : goUp.current.classList.remove('animated')
  })

  const getAllCards = async () => {
    setLoadFlag(true)
    const querySnapshot = await getDocs(collection(db, `users/${uid}/cards`))
    setLoadFlag(false)
    
    querySnapshot.forEach(doc => {
      dispatch(addNewCard({ 
        id: doc.data().id,
        timestamp: doc['_document'].version.timestamp.seconds,
        title: doc.data().title,
        link: doc.data().link,
        description: doc.data().discription
      }))
    })

    allLinks.sort((a, b) => b.timestamp - a.timestamp)
  }

  if(modules.popUp.activePopUp || modules.popUp.deletePopUp) {
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
      {modules.popUp.deletePopUp && <PopupDelete />}
      <Header />
      
      <div className="btt-container">
        <button className="add-btt" onClick={() => dispatch(showPopUp(true))}>
          <BiPlus size={48}/>
        </button>

        <button ref={goUp} className="add-btt" onClick={goToTop}>
          <IoIosArrowUp size={40}/>
        </button>
      </div>

      <main>
        {
          loadFlag ? <Skeleton />
          : 
          modules.links.length < 1 ? (
            <div className="no-links-div"> 
              <h1>Você ainda não salvou um link.</h1>
            </div>
          ) : (
                <div className="links-container">
                  {
                    modules.links.map(card => (
                      <Card
                        confrimDelete={modules.confrimDelete}
                        dispatch={dispatch}
                        id={card.id}
                        title={card.title}
                        link={card.link}
                        description={card.description}
                      />
                    ))
                  }
                </div>
              )
        }
        
      </main>
    </div>
  );
}

export default connect(state => ({ modules: state }))(App);