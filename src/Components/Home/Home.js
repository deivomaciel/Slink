import Header from "../header/Header";
import Card from "../card/Card";
import AddCard from "../addCard/AddCard";
import { BiPlus } from "react-icons/bi"
import { connect } from "react-redux"
import "./styles.css"

function App({ modules, dispatch }) {
  const showPopUp = (popUp) => {
    return {
      type: 'SET_POP_UP_ACTIVE',
      popUp
    }
  }

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
          modules.links.map(card => (
            <Card 
              title={card.title}
              link={card.link}
              description={card.description}
            />
          ))
        }
        </div>
      </main>
    </div>
  );
}

export default connect(state => ({ modules: state }))(App);