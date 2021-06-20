import React, { Component } from 'react';
import { Stage, Layer, Circle } from 'react-konva';

class CanvasBox extends Component {
    state = {  }
    render() { 
        const { centerX, centerY, radius, onDragStart, onDragEnd } = this.props;
        return ( 
            <Stage className="canvasBox" width={300} height={250}>
                <Layer >
                    <Circle
                        x={centerX}
                        y={centerY}
                        width={radius}
                        height={radius}
                        fill="red"
                        shadowBlur={5}
                        draggable
                        onDragStart={(e) => {onDragStart(e)}}
                        onDragEnd={(e) => {onDragEnd(e)}}
                        onClick={ () => {console.log(" button clicked")}}
                    />
                </Layer>
            </Stage>
        );
    }
}
 
export default CanvasBox;
