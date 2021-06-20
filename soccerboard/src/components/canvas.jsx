import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props){
        super(props);

        // this.socket.on("canvas-data", (data) => {
        //     var image = new Image();
        //     console.log('image', image);
        //     var canvas = document.querySelector('#board');
        //     var ctx = canvas.getContext('2d');
        //     image.onload = () => {
        //         ctx.drawImage(image, 0, 0);
        //     }
        //     image.src = data;
        // })
    }

    state = {  }

    componentDidMount(){
        this.drawOnCanvas();
    }

    drawOnCanvas(){
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        console.log(sketch_style)
        canvas.width = parseInt(sketch_style.getPropertyValue('width'))*0.5;
        canvas.height = parseInt(sketch_style.getPropertyValue('height'))*0.5;

        //printing width and height
        console.log(canvas.width, ' ', canvas.height)
        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            console.log(mouse);
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;

        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            // if(root.timeout != undefined){
            //     clearTimeout(root.timeout);
            // }

            // root.timeout = setTimeout(() => {
            //     var base64ImageData = canvas.toDataURL("image/png");
            //     root.socket.emit("canvas-data", base64ImageData);
            // }, 1000);
        };
    }

    

    render() { 
        return ( 
            <div className="sketch" id="sketch">    
                <canvas className="board" id="board">

                </canvas>       
            </div>
        );
    }
}
 
export default Canvas
;