import { BiSearch } from 'react-icons/bi'
import "./styles.css"

function SearchBar() {
    return (
        <div className="searc-bar-container">
            <div className="input-content">
                <BiSearch size={24} fill='#ccc'/>
                <input type="text" placeholder="Pesquisar..." />
            </div>
        </div>
    )
}

export default SearchBar