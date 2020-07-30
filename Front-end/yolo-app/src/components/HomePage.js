import React from 'react';

// css
import '../style/HomePage.css'

class HomePage extends React.Component {
    render() {
        return(
            <div className="app-homepage container d-flex flex-column align-items-center">
                <div className="header">
                    <h1>You Only Look Once</h1>
                </div>

                <div className="menu d-flex flex-column justify-content-center align-items-center">
                    <a href="/pretrained">
                        Objects detection
                    </a >
                    <a href="/trained">
                        Flower wiki
                    </a>
                </div>

                <div className="footer">
                    <p>Made by Khac-Trieu Truong CNTN2017</p>
                </div>
            </div>
        )
    }
}

export default HomePage;