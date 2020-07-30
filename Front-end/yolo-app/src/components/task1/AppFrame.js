import React from 'react';
import ChatFrame from './ChatFrame'
import Input from './Input'

// css
import '../../style/task1/AppFrame.css'


class AppFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages : [
                {
                    id: 1, 
                    type: "text", 
                    message: "Hello!"
                },
                {
                    id: 1,
                    type: "text",
                    message: "I am objects detection bot!"
                },
                {
                    id: 1,
                    type: "text",
                    message: `If you want to try me, please upload 
                            your image and press "Detect" button!`
                }
            ],
            request : new XMLHttpRequest()
        }

        this.state.request.onload = this.requestOnLoad.bind(this);
    }

    requestOnLoad() {
        let ms = this.state.messages
        let data=this.state.request.responseText;
        let jsonResponse = JSON.parse(data);
        
        ms.push({
            id: 1,
            type: "image",
            message: jsonResponse['res']
        })

        this.setState({
            messages: ms
        })
    }

    onSubmit(e) {
        if(e.files.length > 0) {
            let reader = new FileReader();
            let file = e.files[0];
            let ms = this.state.messages;
            let app = this

            reader.onloadend = () => {
                ms.push({
                    id: 0,
                    type: "image",
                    message: reader.result
                },
                {
                    id: 1,
                    type: "text",
                    message: "Processing..."
                })

                this.setState({
                    messages: ms
                });

                let formData = new FormData();
                formData.append("image", file);

                let request = app.state.request
                request.open('POST', 'http://localhost:5000/pretrained', true);
                request.send(formData);
            }

            reader.readAsDataURL(file);
            e.value = ''
        }
    }

    render() {
        return (
            <div className='app-frame'>
                <ChatFrame messages={this.state.messages}/>
                <Input onSubmit={this.onSubmit.bind(this)}/>
            </div>
        )
    }
}

export default AppFrame;