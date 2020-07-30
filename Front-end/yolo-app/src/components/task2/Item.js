import React from 'react';

// css
import '../../style/task2/Item.css'

class Item extends React.Component {
    render() {
        let source = "data:image/jpg;base64," + this.props.img;
        return(
            <li  className="img-item">
                <img ref="image" src={source} onClick={()=>this.props.onImageClicked(this.refs.image, this.props.info)}/>
            </li>
        )
    }
}

export default Item;