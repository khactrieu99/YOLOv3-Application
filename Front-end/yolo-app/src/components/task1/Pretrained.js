import React from 'react';

// Components
import Header from '../Header';
import AppFrame from './AppFrame';

function Pretrained() {
    const style = {
        height: '100%',
        width: '100%'
    };
    return(
        <div style={style}>
            <Header title={"Objects Detection"}/>
            <AppFrame/>
        </div>
    )
}

export default Pretrained;
