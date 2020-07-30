import React from 'react';

// css
import '../../style/task2/ImageForm.css';

class ImageForm extends React.Component {
    render() {
        let source = this.props.image;
        if(this.props.isRes) {
            source = "data:image/jpg;base64," + this.props.image;
        }

        return(
            <div className="image-form row">
                <div className="image-wrapper row justify-content-center align-items-center">
                    <img src={source}/>
                </div>
                <div className='input-btns d-flex flex-column justify-content-center align-items-center'>
                    <div className="upload-btn-wrapper">
                        <input ref="upref" type="file" name="myfile"/>
                        <button className="btn">Choose Image</button>
                    </div>
                    <button className="view-btn" onClick={()=>this.props.onView(this.refs.upref)}>View Image</button>
                    <button className="submit-btn" onClick={()=>this.props.onSubmit(this.refs.upref)}>Search</button>
                </div>
            </div>
        )
    }
}

export default ImageForm;