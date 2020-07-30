import React from 'react';
import Message from './Message'

// css
import '../../style/task1/ChatFrame.css'
import '../../style/task1/ImageViewer.css'

class ImageViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: this.props.visibility,
            viewerSource: this.props.viewerSource
        }
        this.checkEscape = this.checkEscape.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visibility!==this.state.visibility){
            this.setState({
                visibility: nextProps.visibility,
                viewerSource: nextProps.viewerSource
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.visibility!==this.state.visibility
    }

    componentDidMount() {
        document.addEventListener("keyup", this.checkEscape, false);
    }

    checkEscape(e) {
        if(e.keyCode===27) {
            console.log("zo key 27")
            this.setState({
                visibility: "hidden",
                viewerSource: "#"
            });
        }
    }

    render() {
        const style = {
            visibility: this.state.visibility
        }
        
        return (
            <div className="image-viewer d-flex justify-content-center align-items-center" style={style}>
                <div className="image-wrapper">
                    <img src={this.state.viewerSource}/>
                </div>
            </div>
        )
    }
}

class ChatFrame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: "hidden",
            viewerSource: "#"
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            visibility: "hidden",
            viewerSource: "#"
        })
    }

    onImageClicked(ref) {
        this.setState({
            visibility: "visible",
            viewerSource: ref.src
        })
    }

    render() {
        return (
            <div className='app-chatframe pr-5 pl-5 pt-3 pb-3'>
                <ImageViewer visibility={this.state.visibility} viewerSource={this.state.viewerSource}/>
                <ul>
                    {
                        this.props.messages.map(item=> 
                            <Message id={item.id} 
                                type={item.type} 
                                message={item.message}
                                onImageClicked={this.onImageClicked.bind(this)}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default ChatFrame;