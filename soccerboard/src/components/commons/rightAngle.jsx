import React, { Component } from 'react';

// whether liked or not
// if liked show :3

const RightAngle = (props) => {
    let classes = 'fa fa-angle-right';

    return ( 
    <i 
        className={classes} 
        aria-hidden="false"
        onClick={props.onClick}
        style={ {cursor: 'pointer' }}>
    </i> );
}
 
export default RightAngle;