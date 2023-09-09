//SETUP.
var e = Math.E;
var pi = Math.PI;
var phi = (1 + 5**(1/2))/2;
var h = 5;
var d;
var s = 1;
var enter = document.getElementById("enter");
var formulaList = document.getElementById("functionList");
var currentCoordinates = document.getElementById("currentCoordinates");
const graph = document.getElementById("graph");
// graph.width = 2000;
// graph.height = 240*h+241+ceiling(h/2);
const draw = graph.getContext("2d");
var r = 25;
var g = 25;
var b = 25;
var colorArray=["rgb("+r+",0,0)","rgb(0,"+g+",0)","rgb(0,0,"+b+")"];
var index=-1;
draw.lineWidth = 2;
var fileInput = document.getElementById("fileInput");
var submit = document.getElementById("submit");
var reader = new FileReader();

        reader.addEventListener("load", function(e){
            image.src = this.result
        })
var image = new Image();
var imgData;
// image.src = "kb.png";

var pixelRatio = window.devicePixelRatio;
document.body.style.zoom=1/pixelRatio;

window.onresize = function(){
    pixelRatio = window.devicePixelRatio;
    document.body.style.zoom=1/pixelRatio;
}

image.onload = function() {
            graph.width = image.width*6;
            graph.height = image.height*6;
            draw.drawImage(image, 0, 0, image.width, image.height);
            imgData = draw.getImageData(0, 0, image.width, image.height).data;
            draw.clearRect(0, 0, graph.width, graph.height);
            drawImage();
}

fileInput.onchange = function(e){

    var tgt = e.target || window.event.srcElement,
        files = tgt.files;
    
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            image.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
    // console.log("fileInput change");
    // console.log(this.files[0]);
    // submit.onclick = function(){
    //     console.log("submit click");
    //     // image.src = fileInput.value;
    //     var reader = new FileReader();

    //     reader.addEventListener("load", function(e){
    //         // console.log(e.target.result);
    //         console.log(this);
    //         image.src = this.result
    //     })
    //     // image = fileInput.files[0];
    //     //     graph.width = image.width*6;
    //     //     graph.height = image.height*6;
    //     //     draw.drawImage(image, 0, 0, image.width, image.height);
    //     //     imgData = draw.getImageData(0, 0, image.width, image.height).data;
    //     //     draw.clearRect(0, 0, graph.width, graph.height);
    //     //     console.log(imgData);
    //     //     drawImage();
    // }
    
}



//DRAWING
function setColor(red,green,blue){
    //console.log(red+","+green+","+blue)

    if(red>255){red=255;}
    if(green>255){green=255;}
    if(blue>255){blue=255;}
    if(red<8){red=8;}
    if(green<8){green=8;}
    if(blue<8){blue=8;}
    r=red;
    g=green;
    b=blue;
    colorArray=["rgb("+r+",0,0)","rgb(0,"+g+",0)","rgb(0,0,"+b+")"];
}
function nextColor(){
    index++;
    if(index==3){index=0;}
    draw.strokeStyle = colorArray[index];
}

function drawImage(){
    var c=0;
    var x = 1;
    var y = 0;
    draw.fillStyle = 'black';
    draw.fillRect(0, 0, graph.width, graph.height);
    for(k=0;k<image.height;k++){
        if(d==1){
            d=s;
        } else {
            d=1;
        }
        for(i=0;i<image.width/2;i++){
            setColor(imgData[c]/d,imgData[c+1]/d,imgData[c+2]/d);
            c = c+4;
            for(l=0;l<3;l++){
                nextColor();
                draw.beginPath();
                draw.moveTo(2*x-1,ceiling(h/2)+1+(y*h+y));
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y));
                draw.stroke();
                draw.stroke();
                x++;
            }
            setColor(imgData[c]/d,imgData[c+1]/d,imgData[c+2]/d);
            c = c+4;
            for(l=0;l<3;l++){
                nextColor();
                draw.beginPath();
                draw.moveTo(2*x-1,ceiling(h/2)+1+(y*h+y));
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y)-3);
                draw.moveTo(2*x-1,ceiling(h/2)+1+h+(y*h+y)-2);
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y+1));
                draw.stroke();
                draw.stroke();
                x++;
            }
        }
        x=1;
        y++;
    }
}
function drawGrid(){
    var c=0;
    var x = 1;
    var y = 0;
    draw.fillStyle = 'black';
    draw.fillRect(0, 0, graph.width, graph.height);
    for(k=0;k<graph.height;k++){
        if(d==1){
            d=s;
        } else {
            d=1;
        }
        for(i=0;i<graph.width/2;i++){
            // setColor(25+i+k,255-i-k,95+i-k);
            // setColor((k*255/graph.height)**(1.4) - Math.sin(i/15),100-(k*255/graph.height)**(1.45) - Math.sin(i/15),255 - Math.sin(i/15));
            setColor(255*x/(image.width*3),255*y/image.height,255*((image.width*3)-x)/(image.width*3));
            c = c+4;
            for(l=0;l<3;l++){
                nextColor();
                draw.beginPath();
                draw.moveTo(2*x-1,ceiling(h/2)+1+(y*h+y));
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y));
                draw.stroke();
                draw.stroke();
                x++;
            }
            // setColor(25+i+k,255-i-k,95+i-k);
            // setColor((k*255/graph.height)**(1.4) - Math.sin(i/15),100-(k*255/graph.height)**(1.45) - Math.sin(i/15),255 - Math.sin(i/15));
            setColor(255*x/(image.width*3),255*y/image.height,255*((image.width*3)-x)/(image.width*3));
            c = c+4;
            for(l=0;l<3;l++){
                nextColor();
                draw.beginPath();
                draw.moveTo(2*x-1,ceiling(h/2)+1+(y*h+y));
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y)-3);
                draw.moveTo(2*x-1,ceiling(h/2)+1+h+(y*h+y)-2);
                draw.lineTo(2*x-1,ceiling(h/2)+1+h+(y*h+y+1));
                draw.stroke();
                draw.stroke();
                x++;
            }
        }
        x=1;
        y++;
    }
}
document.onkeypress = function(e){
    if (e.keyCode == 115){
        if(s==1.3){
            s=1
        } else {
            s=1.3
        }
        drawGrid();
    }
}
