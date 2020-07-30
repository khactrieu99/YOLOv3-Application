import React from 'react';

// cs
import '../../style/task1/Message.css'

class Message extends React.Component {
    render() {
        let content;
        let message = this.props.message;
        let source;
        if (this.props.type === "text") {
            content = <div className="text"><p>{message}</p></div>;
        }
        else {
            if(this.props.id===0) {
                source = message;
            }
            else {
                source = "data:image/jpg;base64," + message;
            }
            content = <div className="image"><img ref="image" src={source} onClick={()=>this.props.onImageClicked(this.refs.image)}/></div>;
        }
        return(
            <li className={this.props.id===0?"right":"left"}>
                {content}
            </li>
        )
    }
}

export default Message;