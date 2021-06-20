import React, { Component } from 'react';
import CanvasBox from "./commons/CanvasBox";
class TestCircle extends Component {
    state = { 
        centerX: 100,
        centerY: 100,
        radius: 20,
        leftX: 20,
        rightX: 280,
        topY: 20,
        bottomY: 230
    }


    constructor(props){
        super(props);

        this.setState({
            // centerX, centerY, radius, { top,bottom,left,right too (if needed) }
        });
        
        //use handleLoad() method if needed
    }

    handleDragStart = e => {
        let circle = e.currentTarget;
        console.log("being dragged ", circle.attrs.x, " ", circle.attrs.y);
        e.target.setAttrs({
          shadowOffset: {
            x: 5,
            y: 5
          },
          scaleX: 1.1,
          scaleY: 1.1
        });
      };

    verifyCirclePosition = (circle, posX, posY) =>{

        const { leftX, rightX, topY, bottomY } = this.state;

        if(posX < leftX){
            circle.attrs.x = leftX;
        }
        else if(posX > rightX){
            circle.attrs.x = rightX;
        }
        else{}
        if(posY < topY){
            circle.attrs.y = topY;
        }
        else if(posY > bottomY){
            circle.attrs.y = bottomY;
        }
        else{}

        this.setState({
            centerX: circle.attrs.x,
            centerY: circle.attrs.y,
        });
    }
    
    handleDragEnd = e => {
        let circle = e.currentTarget;
        console.log("ending dragged ", circle.attrs.x, " ", circle.attrs.y);
        this.verifyCirclePosition(circle, circle.attrs.x, circle.attrs.y)
        e.target.to({
            duration: 0.5,
            // easing: konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5
        });
    };

    handleSave = () => {
        const { centerX, centerY } = this.state;
        console.log("save positions ", centerX, centerY);
        //save them where we need
    }

    handleLoad = () => {
        const { centerX, centerY, radius } = this.props;
        //load them from where we need
    }

    render() { 
        const { centerX, centerY, radius } = this.state;
        return ( 
            <div className="col-sm-4">
                <div className="row">
                    <CanvasBox
                        centerX = {centerX}
                        centerY = {centerY}
                        radius = {radius}
                        onDragStart = {this.handleDragStart}
                        onDragEnd = {this.handleDragEnd}
                    />
                </div>
                <div className="row">
                    <button
                        onClick={() => {this.handleSave()}}
                    >
                        Save
                    </button>

                    <button
                        onClick={() => {this.handleLoad()}}
                    >
                        Load
                    </button>
                </div>
            </div>
            
        );
    }
}
 
export default TestCircle;