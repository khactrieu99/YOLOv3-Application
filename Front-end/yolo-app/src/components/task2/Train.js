import React from 'react';

// components
import Header from '../Header';
import SearchFrame from './SearchFrame';

function Train() {
    const style = {
        height: '100%',
        width: '100%'
    };
    return(
        <div style={style}>
            <Header title={"Flower Wikipedia"}/>
            <SearchFrame/>
        </div>
    )
}

export default Train;
