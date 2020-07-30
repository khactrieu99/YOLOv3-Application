import React from 'react';
import Item from './Item';
// css
import '../../style/task2/ResultForm.css';
import '../../style/task2/DetailViewer.css'

class DetailViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: this.props.visibility,
            viewerSource: this.props.viewerSource,
            info: this.props.info
        }
        this.checkEscape = this.checkEscape.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visibility!==this.state.visibility){
            this.setState({
                visibility: nextProps.visibility,
                viewerSource: nextProps.viewerSource,
                info: nextProps.info
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
                viewerSource: "#",
                info: null
            });
        }
    }

    render() {
        const style = {
            visibility: this.state.visibility
        }
        let title = "";
        let content = "";
        if(this.props.info != undefined) {
            title = this.props.info.name
            content = this.props.info.info
        }

        return (
            <div className="detail-viewer d-flex justify-content-center align-items-center" style={style}>
                <div className="image row justify-content-between align-items-center">
                    <div className="image-wrapper">
                        <img src={this.state.viewerSource}/>
                    </div>
                    <div className="image-info m-0">
                        <div className="title row justify-content-center align-items-start">
                            <h1>{title}</h1>
                        </div>
                        <div>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ResultForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: "hidden",
            viewerSource: "#",
            viewerInfo: null
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            visibility: "hidden",
            viewerSource: "#",
            viewerInfo: null
        })
    }

    onImageClicked(ref, info) {
        this.setState({
            visibility: "visible",
            viewerSource: ref.src,
            info: info
        })
    }

    render() {
        return(
            <div className="result">
                <DetailViewer visibility={this.state.visibility} viewerSource={this.state.viewerSource} info={this.state.info}/>
                <div className="w d-flex flex-column justify-content-center wrapper">
                    <ul className="list row align-items-center">
                        {
                            this.props.items.map(item=> 
                                <Item 
                                    img={item.image}
                                    info={item.info}
                                    onImageClicked={this.onImageClicked.bind(this)}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ResultForm;