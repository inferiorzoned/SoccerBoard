import React, { Component } from 'react';

// whether liked or not
// if liked show :3

const LeftAngle = (props) => {
    let classes = 'fa fa-angle-left';

    return ( 
    <i 
        className={classes}
        onClick={props.onClick}
        aria-hidden="false"
        style={ {cursor: 'pointer' }}>
    </i> );
}
 
export default LeftAngle;