import { func } from "prop-types";

export default class Rating{
    constructor(el,args){
        this.el=el?el:(console.error("HTML element reference not provided, stopping execution"));
        this.args=args;
        this.svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //configurable attributes
        this.svg_height=500;
        this.svg_width=500;
        this.fill_rated="#333";
        this.fill_unrated="#f8f8f8";
        this.star_strokewidth=5;
        this.noOfStars=5;
        this.stroke_rated="#ccc";
        this.stroke_unrated="#333";
        this.orientation="LR";
        this.rating_value=this.noOfStars;
        this.padding=5;
        this.justify_content="center";
        this.align_items="center";
        //counter variable
        this.creation=true;
        }
    
    _create(){
        var result=this._validate();
        if(result){
            if(this.creation){
                this._setUserAttributes();
                this.svg.setAttribute("width",this.svg_width);
                this.svg.setAttribute("height",this.svg_height);
                this.creation=false;
            }
            else{
                if(this.svg_height!==this.args.svg_height){
                    this.svg.setAttribute("height",this.args.svg_height);
                }
                if(this.svg_width!==this.args.svg_width){
                    this.svg.setAttribute("width",this.args.svg_width);
                }
                this._setUserAttributes();
                while (this.svg.hasChildNodes()) {  
                    this.svg.removeChild(this.svg.firstChild);
                }
            }
            this.rating_value=String(this.rating_value);
            var res = this.rating_value.split(".");
            if(res.length>1){
                this._putLinerGradient(res,result[1]);
            }
            var box=result[0];
            if(this.orientation=="LR"){
                for(let i=0;i<this.noOfStars;i++,res[0]--){
                    var start=((box +(2*i)*box + (this.svg_width - box*this.noOfStars)+ this.star_strokewidth +this.padding) / 2) + " " + ((this.svg_height - box +this.star_strokewidth +this.padding) / 2);
                    if(res[0]>0){
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding);
                    }
                    else if(res[0]==0 && typeof res[1] !== "undefined"){
                        var rating_frac=
                        {   
                            fill:"url(#rated)",
                            stroke:"url(#rated_stroke)"
                        };
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding,rating_frac);
                    }
                    else{
                        createStar(this.svg,box,this.star_strokewidth,this.fill_unrated,this.stroke_unrated,this.svg_width,this.svg_height,start,this.padding);
                    }
                }
            }
            else if(this.orientation=="RL"){
                var unrated=this.noOfStars-res[0]-1;
                for(let i=0;i<this.noOfStars;i++,unrated--){
                    var start=((box +(2*i)*box + (this.svg_width - box*this.noOfStars)+ this.star_strokewidth +this.padding) / 2) + " " + ((this.svg_height - box +this.star_strokewidth +this.padding) / 2);
                    if(unrated>0){
                        createStar(this.svg,box,this.star_strokewidth,this.fill_unrated,this.stroke_unrated,this.svg_width,this.svg_height,start,this.padding);
                    }
                    else if(unrated==0 && typeof res[1] != "undefined"){
                        var rating_frac=
                        {   
                            fill:"url(#rated_RL)",
                            stroke:"url(#rated_stroke_RL)"
                        };
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding,rating_frac);
                    }
                    else{
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding);
                    }
                }
            }
            else if(this.orientation=="TB"){
                for(let i=0;i<this.noOfStars;i++,res[0]--){
                    var start=((box + (this.svg_width - box)+ this.star_strokewidth) / 2) + " " + (((2*i)*box +this.svg_height - box*this.noOfStars +this.star_strokewidth) / 2);
                    if(res[0]>0){
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding);
                    }
                    else if(res[0]==0 && typeof res[1] != "undefined"){
                        var rating_frac=
                        {   
                            fill:"url(#rated_TB)",
                            stroke:"url(#rated_stroke_TB)"
                        };
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding,rating_frac);
                    }
                    else{
                        createStar(this.svg,box,this.star_strokewidth,this.fill_unrated,this.stroke_unrated,this.svg_width,this.svg_height,start,this.padding);
                    }
                }
            }
            else{
                var unrated=this.noOfStars-res[0]-1;
                for(let i=0;i<this.noOfStars;i++,unrated--){
                    var start=((box + (this.svg_width - box)+ this.star_strokewidth) / 2) + " " + (((2*i)*box +this.svg_height - box*this.noOfStars +this.star_strokewidth) / 2);
                    if(unrated>0){
                        createStar(this.svg,box,this.star_strokewidth,this.fill_unrated,this.stroke_unrated,this.svg_width,this.svg_height,start,this.padding);
                    }
                    else if(unrated==0 && typeof res[1] != "undefined"){
                        var rating_frac=
                        {   
                            fill:"url(#rated_BT)",
                            stroke:"url(#rated_stroke_BT)"
                        };
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding,rating_frac);
                    }
                    else{
                        createStar(this.svg,box,this.star_strokewidth,this.fill_rated,this.stroke_rated,this.svg_width,this.svg_height,start,this.padding);
                    }
                }
            }
            this.el.appendChild(this.svg);
        }
    }


    _putLinerGradient(res,direction){
        //debugger;
        if(direction==="row"){
            var dir= [100,0];
        }
        else{
            var dir= [0,100];
        }
        if(res[1].length==1){
            res[1]=res[1]+"0";
            //console.log(res);
        }
        else if(res[1].length>2){
            res[1]="."+res[1];
            res[1]=Number(res[1]);
            res[1] = res[1].toFixed(2);
            let res2= res[1].split(".");
            res[1]=res2[1];
            //console.log(res);
        }
        var def = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        def.appendChild(setLinearGrad("rated",res[1],this.fill_rated,this.fill_unrated,dir));
        def.appendChild(setLinearGrad("rated_stroke",res[1],this.stroke_rated,this.stroke_unrated,dir));
        def.appendChild(setLinearGrad("rated_RL",res[1],this.fill_unrated,this.fill_rated,dir));
        def.appendChild(setLinearGrad("rated_stroke_RL",res[1],this.stroke_unrated,this.stroke_rated,dir));
        def.appendChild(setLinearGrad("rated_TB",res[1],this.fill_rated,this.fill_unrated,dir));
        def.appendChild(setLinearGrad("rated_stroke_TB",res[1],this.stroke_rated,this.stroke_unrated,dir));
        def.appendChild(setLinearGrad("rated_BT",res[1],this.fill_unrated,this.fill_rated,dir));
        def.appendChild(setLinearGrad("rated_stroke_BT",res[1],this.stroke_unrated,this.stroke_rated,dir));
        
        this.svg.appendChild(def);
    }
    
    _validate(){
        var setUserAttributes=true;
        var direction,box;
        // var svg_height,svg_width,star_strokewidth,stroke_rated,stroke_unrated,fill_rated,fill_unrated,noOfStars,rating_value;
        // var padding,orientation,justify_content,align_items; 
        if(typeof this.args.orientation!== "undefined"){
            if(!(this.args.orientation==="LR" || this.args.orientation==="RL" || this.args.orientation==="TB" || this.args.orientation==="BT")){
                this.args.orientation=this.orientation;
                console.warn("Invalid Orientation, setting it to prev config");
            }
        }
        else{
            this.args.orientation=this.orientation;
        }
        
        if( typeof this.args.svg_height !== "undefined"){
            this.args.svg_height=Number(this.args.svg_height);
            if(!this.args.svg_height || this.args.svg_height<10){
                this.args.svg_height=this.svg_height;
                console.warn("invalid svg height, setting it to prev config");
            }
        }
        else{
            this.args.svg_height=this.svg_height;
        }

        if(typeof this.args.svg_width !== "undefined"){
            this.args.svg_width=Number(this.args.svg_width);
            if(!this.args.svg_width || this.args.svg_width<10){
                this.args.svg_width=this.svg_width;
                console.warn("invalid svg width, setting it to prev config");
            }
        }
        else{
            this.args.svg_width=this.svg_width;
        }

        if(typeof this.args.noOfStars!== "undefined"){
            this.args.noOfStars=Number(this.args.noOfStars); 
            if(!this.args.noOfStars || isFloat(this.args.noOfStars || this.args.noOfStars<0)){
                this.args.noOfStars=this.noOfStars;
                console.warn("invalid No Of Stars, setting it to prev config");
            }
        }
        else{
            this.args.noOfStars=this.noOfStars;
        }

        if(typeof this.args.stroke_rated!== "undefined"){
            this.args.stroke_rated=String(this.args.stroke_rated);
            if(startsWithHash(this.args.stroke_rated) && !checkHex(this.args.stroke_rated)){
                this.args.stroke_rated=this.stroke_rated;
                console.warn("invalid stroke rated, setting it to prev config");
            }
        }
        else{
            this.args.stroke_rated=this.stroke_rated;
        }

        if(typeof this.args.stroke_unrated!== "undefined"){
            this.args.stroke_unrated=String(this.args.stroke_unrated);
            if(startsWithHash(this.args.stroke_unrated) && !checkHex(this.args.stroke_unrated)){
                this.args.stroke_unrated=this.stroke_unrated;
                console.warn("invalid stroke unrated, setting it to prev config");
            }
        }
        else{
            this.args.stroke_unrated=this.stroke_unrated;
        }

        if(typeof this.args.fill_rated!== "undefined"){
            this.args.fill_rated=String(this.args.fill_rated);
            if(startsWithHash(this.args.fill_rated) && !checkHex(this.args.fill_rated)){
                this.args.fill_rated=this.fill_rated;
                console.warn("invalid fill rated, setting it to prev config");
            }
        }
        else{
            this.args.fill_rated=this.fill_rated;
        }

        if(typeof this.args.fill_unrated!== "undefined"){
            this.args.fill_unrated=String(this.args.fill_unrated);
            if(startsWithHash(this.args.fill_unrated) && !checkHex(this.args.fill_unrated)){
                this.args.fill_unrated=this.fill_unrated;
                console.warn("invalid fill unrated, setting it to prev config");
            }
        }
        else{
            this.args.fill_unrated=this.fill_unrated;
        }

        if(typeof this.args.justify_content!== "undefined"){
            if(!(this.args.justify_content==="center" || this.args.justify_content==="start" || this.args.justify_content==="end" || this.args.justify_content==="space-evenly")){
                this.args.justify_content=this.justify_content;
                console.warn("Invalid justify_content, setting it to prev config");
            }
        }
        else{
            this.args.justify_content=this.justify_content;
        }

        if(typeof this.args.align_items!== "undefined"){
            if(!(this.args.align_items==="center" || this.args.align_items==="start" || this.args.align_items==="end")){
                this.args.align_items=this.align_items;
                console.warn("Invalid align_items, setting it to prev config");
            }
        }
        else{
            this.args.align_items=this.align_items;
        }
        
        if(typeof this.args.rating_value!== "undefined"){ 
            this.args.rating_value=Number(this.args.rating_value); 
            if((!this.args.rating_value && this.args.rating_value!==0) || this.args.rating_value<0){
                if(this.rating_value>this.args.noOfStars){
                    this.args.rating_value=this.args.noOfStars;
                    console.warn("invalid rating value, setting it to no of stars, prev config greater than no of stars");
                }
                else{
                    this.args.rating_value=this.rating_value;
                    console.warn("invalid rating value, setting it to prev config");
                }    
            }
            else if(this.args.rating_value>this.args.noOfStars){
                this.args.rating_value=this.args.noOfStars;
                console.warn("rating value greater than no of stars, setting it to no of stars");
            }
        }
        else{
            this.args.rating_value=this.rating_value;
        }

        if(typeof this.args.padding!== "undefined"){
            this.args.padding=Number(this.args.padding); //box checking is left
            if((!this.args.padding && this.args.padding!==0) || this.args.padding<0){ 
                this.args.padding=this.padding;
                console.warn("invalid padding, setting it to prev config");
            }
        }
        else{
            this.args.padding=this.padding;
        }

        if(typeof this.args.star_strokewidth!== "undefined"){
            this.args.star_strokewidth=Number(this.args.star_strokewidth);//box checking is left
            if((!this.args.star_strokewidth && this.args.star_strokewidth!==0) || this.args.star_strokewidth<0){
                this.args.star_strokewidth=this.star_strokewidth;
                console.warn("invalid strokewidth, setting it to prev config");
            }
        }
        else{
            this.args.star_strokewidth=this.star_strokewidth;
        }

        //calculaing box size        
        if(this.args.orientation==="LR" || this.args.orientation==="RL"){
            direction="row";
        }
        else{
            direction="col";
        }

        if(direction==="row"){
            let width=this.args.svg_width/this.args.noOfStars;
            box=Math.min(width,this.args.svg_height);
        }
        else{
            let height=this.args.svg_height/this.args.noOfStars;
            box=Math.min(height,this.args.svg_width);
        }

        if(box<10){
            setUserAttributes=false;
            box=0;
            console.error("Box size is less than 10, stopping execution");
        }
        else if(box<=80){
            this.args.padding=0;
            console.warn("padding cannot be given to box size less than 50, setting it to 0");
            this.args.star_strokewidth=0;
            console.warn("strokewidth cannot be given to box size less than 50, setting it to 0");
        }
        else{
            if(this.args.padding>(0.1*box)){
                console.warn("padding cannot be greater than 10% of box size, setting it to 10% of box size");
                this.args.padding=(0.1*box);
            }
            if(this.args.star_strokewidth>(0.1*box)){
                console.warn("strokewidth value cannot be greater than 10% of box size, setting it to 10% of box size");
                this.args.star_strokewidth=(0.1*box);
            }
        }

        if(setUserAttributes){
            return [box,direction];
        }
        else{

            return null;
        }
    }

    _setUserAttributes(){
        this.svg_height=this.args.svg_height;
        this.svg_width=this.args.svg_width;
        this.fill_rated=this.args.fill_rated;
        this.fill_unrated=this.args.fill_unrated;
        this.star_strokewidth=this.args.star_strokewidth;
        this.noOfStars=this.args.noOfStars;
        this.stroke_rated=this.args.stroke_rated;
        this.stroke_unrated=this.args.stroke_unrated;
        this.orientation=this.args.orientation;
        this.rating_value=this.args.rating_value;
        this.padding=this.args.padding;
        this.justify_content=this.args.justify_content;
        this.align_items=this.args.align_items;
    }
    
}

function setLinearGrad(id,offset,rated,unrated,direction) {
    var linearGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    var stop_rated = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    var stop_unrated = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    linearGrad.setAttribute("id",id);
    linearGrad.setAttribute("x1","0");
    linearGrad.setAttribute("y1","0");
    linearGrad.setAttribute("x2",direction[0]+"%");
    linearGrad.setAttribute("y2",direction[1]+"%");

    stop_rated.setAttribute("offset",offset+"%");
    stop_rated.setAttribute("style","stop-color:"+rated+";stop-opacity:1");
    stop_unrated.setAttribute("offset","0");
    stop_unrated.setAttribute("style","stop-color:"+unrated+";stop-opacity:1");

    linearGrad.appendChild(stop_rated);
    linearGrad.appendChild(stop_unrated);
    return linearGrad;
}

function createStar(svg,box,star_strokewidth,fill_rated,stroke_rated,svg_width,svg_height,start,padding=0,rating_frac){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    newElement.setAttribute("d",
    "m "+start
    +" l "+ (box*1/8) +" "+ (box*3/8) 
    +" h "+ ((box*3/8)-star_strokewidth -padding) 
    +" l -"+ (box/4)+" "+ ((box/4)-star_strokewidth-padding) 
    +" l "+ (box/4) +" "+ ((box*3/8)) 
    +" l -"+ ((box/2)-star_strokewidth-padding) +" -"+ (box/4) 
    +" l -"+((box/2)) +" "+((box/4))
    +" l "+((box/4)+star_strokewidth+padding)+" -"+((box*3/8))
    +" l -"+((box/4)+star_strokewidth+padding)+" -"+((box/4)-star_strokewidth-padding)
    +" h "+((box*3/8))
    +" z");

    if(rating_frac){
        newElement.setAttribute("fill",rating_frac.fill);
        newElement.setAttribute("stroke",rating_frac.stroke);
    }
    else{
        //debugger;
        newElement.style.fill=fill_rated;
        newElement.style.stroke=stroke_rated; 
    }
    newElement.style.strokeWidth = star_strokewidth;
    newElement.style.strokeLinejoin="round";
    svg.appendChild(newElement);
    }
//function to check if input is float or not
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

//function to check if input is hex value or not
function checkHex(value){
	return /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(value)
}
function startsWithHash(value){
	return /^#/.test(value)
}