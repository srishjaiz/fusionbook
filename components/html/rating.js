export default function f(el,svg_width,svg_height,star_stroke,star_fill,star_strokewidth,direction,N=5){
    
    //checking general cases
    svg_height=Number(svg_height);
    if(!svg_height){
        console.error("Invalid svg height, only enter a number");
        return;
    }
    else{
        console.log("height ok");
    
        svg_width=Number(svg_width);
        if(!svg_width){
            console.error("Invalid svg width, only enter a number");
            return;
        }
        else{
            console.log("width ok");
        
            star_stroke=String(star_stroke);
            if(!checkHex(star_stroke)){
                console.error("Only hex value is allowed");
                return;
            }
            else{
                console.log("stroke color ok");

                star_fill=String(star_fill);
                if(!checkHex(star_fill)){
                    console.error("Only hex value is allowed");
                    return;
                }
                else{
                    console.log("star fill ok");
                

                    star_strokewidth=Number(star_strokewidth);
                    if((typeof star_strokewidth) !== "number"){
                        console.error("Invalid stroke width, only enter a number");
                        return;
                    }
                    else{
                        if(star_strokewidth>10){
                            console.error("stroke width cannot be greater than 10");  
                            return;          
                        }
                        else{
                            console.log("stroke width ok");

                            N=Number(N);
                            if(!N){
                                console.error("Invalid no of stars given, only enter a number");
                                return;
                            }
                            else{
                                console.log("no of stars ok");
                                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                svg.setAttribute("width",svg_width);
                                svg.setAttribute("height",svg_height);
                                var box=0;
                                if(direction=="horizontal"){
                                    if(svg_height<=svg_width){
                                        if(svg_width>=svg_height*N){
                                            box=svg_height;
                                        }
                                        else{
                                            console.error("Width cannot fit all 5 stars");
                                            return;
                                        }   
                                    }
                                    else{
                                        console.error("For horizontal, height cannot be greater than width");
                                        return;
                                    }

                                    for(let i=0;i<N;i++){
                                        var start=((box +(2*i)*box + (svg_width - box*N)+ star_strokewidth) / 2) + " " + ((svg_height - box +star_strokewidth) / 2);
                                        createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start);
                                    }
                                }
                                else if(direction=="vertical"){
                                    if(svg_width<=svg_height){
                                        if(svg_height>=svg_width*N){
                                            box=svg_width;
                                        }
                                        else{
                                            console.error("Height cannot fit all 5 stars");
                                            return;
                                        }   
                                    }
                                    else{
                                        console.error("For vertical, width cannot be greater than height");
                                        return;
                                    }
                                    for(let i=0;i<N;i++){
                                        var start=((box + (svg_width - box)+ star_strokewidth) / 2) + " " + (((2*i)*box +svg_height - box*N +star_strokewidth) / 2);
                                        createStar(svg,box,star_strokewidth,star_fill,star_stroke,svg_width,svg_height,start);
                                    }
                                }
                                else{
                                    console.error("Invalid Direction, give horizontal or vertical only");
                                    return;
                                }
                                el.appendChild(svg);
                            }
                        }
                    }
                }
            }
        }
    }
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
    newElement.style.strokeLinejoin="round";
    svg.appendChild(newElement);
}

//function to check if input is hex value or not
function checkHex(value){
	return /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(value)
}