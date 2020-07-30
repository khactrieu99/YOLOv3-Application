import React from 'react';

// css
import '../../style/task1/Input.css'

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='app-input d-flex justify-content-around align-items-center'>
                <div className="upload-btn-wrapper">
                    <input ref="inputRef" type="file" name="myfile" />
                    <button className="btn">Upload Image</button>
                </div>
                <button className="submit-btn" onClick={()=>this.props.onSubmit(this.refs.inputRef)}>Detect</button>
            </div>
        )
    }
}

export default Input;