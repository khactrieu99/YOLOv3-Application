import React from 'react';

// css
import '../style/Header.css'

class Header extends React.Component {
    render() {
        return (
            <div className='app-header d-flex justify-content-center align-items-center'>
                <a className="home-btn" href="/"><i className="fa fa-mail-reply"></i></a>
                <h1>   
                    {this.props.title}
                </h1>
            </div>
        )
    }
}

export default Header;