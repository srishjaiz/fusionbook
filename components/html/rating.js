export default function f(el,svg_width,svg_height,star_stroke,star_fill,star_strokewidth,direction){
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width",svg_width);
    svg.setAttribute("height",svg_height);
    
    var start,start2,start3,start4,start5;

    //checking general cases
    svg_height=Number(svg_height);
    if((typeof svg_height) !== "number"){
        throw new TypeError("Invalid svg height, only enter a number");
    }
    else{
        console.log("height ok");
    }
    svg_width=Number(svg_width);
    if((typeof svg_width) !== "number"){
        throw new TypeError("Invalid svg width, only enter a number");
    }
    else{
        console.log("width ok");
    }
    star_stroke=String(star_stroke);
    if((typeof star_stroke) !== "string"){
        throw new TypeError("Invalid stroke color, only enter a string");
    }
    else{
        console.log("stroke color ok");
    }
    star_fill=String(star_fill);
    if((typeof star_fill) !== "string"){
        throw new TypeError("Invalid fill color, only enter a string");
    }
    else{
        console.log("fill color ok");
    }

    star_strokewidth=Number(star_strokewidth);
    if((typeof star_strokewidth) !== "number"){
        throw new TypeError("Invalid stroke width, only enter a number");
    }
    else{
        console.log("stroke color ok");
    }


    var box=0;
    if(direction=="horizontal"){
        if(svg_height<=svg_width){
            if(svg_width>=svg_height*5){
                box=svg_height;
            }
            else{
                throw new TypeError("Width cannot fit all 5 stars");
            }   
        }
        else{
            throw new TypeError("For horizontal, height cannot be greater than width");
        }


    start=((box + (svg_width - box*5)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
    start2=((box +2*box + (svg_width - box*5)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
    start3=((box +4*box + (svg_width - box*5)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
    start4=((box +6*box + (svg_width - box*5)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
    start5=((box +8 *box + (svg_width - box*5)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
    }
    else if(direction=="vertical"){
        if(svg_width<=svg_height){
            if(svg_height>=svg_width*5){
                box=svg_width;
            }
            else{
                throw new TypeError("Height cannot fit all 5 stars");
            }   
        }
        else{
            throw new TypeError("For vertical, width cannot be greater than height");
        }


    start=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + ((svg_height - box*5 +star_strokewidth) / 2);
    start2=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + ((2*box +svg_height - box*5 +star_strokewidth) / 2);
    start3=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + ((4*box +svg_height - box*5 +star_strokewidth) / 2);
    start4=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + ((6*box +svg_height - box*5 +star_strokewidth) / 2);
    start5=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + ((8*box +svg_height - box*5 +star_strokewidth) / 2);
    }
    else{
        throw new TypeError("Invalid Direction, give horizontal or vertical only");
    }



    createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start);
    createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start2);
    createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start3);
    createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start4);
    createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start5);
    
   // var svg_div= document.getElementById("svg-div");
    el.appendChild(svg);
}

function createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    newElement.setAttribute("d",
    "m "+start
    +" l "+ (box*1/8) +" "+ (box*3/8) 
    +" h "+ ((box*3/8)-star_strokewidth) 
    +" l -"+ (box/4)+" "+ ((box/4)-star_strokewidth) 
    +" l "+ (box/4) +" "+ ((box*3/8)) 
    +" l -"+ ((box/2)-star_strokewidth) +" -"+ (box/4) 
    +" l -"+((box/2)) +" "+((box/4))
    +" l "+((box/4)+star_strokewidth)+" -"+((box*3/8))
    +" l -"+((box/4)+star_strokewidth)+" -"+((box/4)-star_strokewidth)
    +" h "+((box*3/8))
    +" z");
    newElement.style.stroke = star_stroke; 
    newElement.style.strokeWidth = star_strokewidth;
    newElement.style.fill=star_fill;
    //newElement.style.stroke-linejoin="round";
    //newElement.style.strokeLinecap="round";
    newElement.style.strokeLinejoin="round";
    svg.appendChild(newElement);
}
