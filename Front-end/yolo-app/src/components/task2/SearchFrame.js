import React from 'react';

import ImageForm from './ImageForm';
import ResultForm from './ResultForm';

// css
import '../../style/task2/SearchFrame.css'

class SearchFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "./warning.png",
            isRes: false,
            request: new XMLHttpRequest(),
            items: []
        }

        this.state.request.onload = this.requestOnLoad.bind(this);
    }

    requestOnLoad() {
        let data=this.state.request.responseText;
        let jsonResponse = JSON.parse(data);
        
        this.setState({
            image: jsonResponse['res'],
            isRes: true,
            items: jsonResponse['items']
        })
    }

    onSubmit(e) {
        if(e.files.length > 0) {
            let reader = new FileReader();
            let file = e.files[0];
            let app = this

            reader.onloadend = () => {
                let formData = new FormData();
                formData.append("image", file);

                let request = app.state.request
                request.open('POST', 'http://localhost:5000/trained', true);
                request.send(formData);
            }

            reader.readAsDataURL(file);
            e.value = ''
        }
    }

    onView(e) {
        if(e.files.length > 0) {
            let reader = new FileReader();
            let file = e.files[0];
            let app = this
            
            reader.onloadend = () => {
                app.setState({
                    image: reader.result,
                    isRes: false
                });
            }

            reader.readAsDataURL(file);
        }
    }

    render() {
        return(
            <div className="search-frame">
                <ImageForm isRes={this.state.isRes} image={this.state.image} 
                            onSubmit={this.onSubmit.bind(this)} 
                            onView={this.onView.bind(this)}
                />
                <ResultForm items={this.state.items}/>
            </div>
        )
    }
}

export default SearchFrame;