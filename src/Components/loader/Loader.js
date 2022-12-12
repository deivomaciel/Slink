import './styles.css'

function Loader(props) {
    const loaderStyle = {
        width: `${props.width}px`,
        height: `${props.height}px`,
        borderTopColor: `${props.color}`,
        borderLeftColor: `${props.color}`,
        borderBottomColor: `${props.color}`
    }

    return(
        <div 
            className='loader'
            style={loaderStyle}
        ></div>
    ) 
}

export default Loader