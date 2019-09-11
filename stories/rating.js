import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'


const ratingStory = new Story('Rating').addMetas([configs()])

var config={};

//create
//stress testing copy
ratingStory.addChapter(
  'stress testing',
  story => {
      config.rating_value= 4.5;
      config.noOfStars= 5;
      config.svg_width= 400;
      let a = new rating(story, config),
        T = 1, startTime = ((new Date()).getTime() * 1), time = 0;
        while(time < 5){
          config.rating_value+=T;
          config.noOfStars+=T;
          config.svg_width+=T*100;
          a.update();
          time =  ((new Date()).getTime() * 1) - startTime;
          T++;
        }
    console.log(T + ' tests in ' + time + 'ms');

  },
  [
    notes('This should log error as no of stars cannot be fractional value.')
  ]
)
ratingStory.addChapter(
    'Default rating chart',
    story => {
        // var a= new rating(story,config);
        // a.create();

        var a= new rating(story,config);
        config.rating_value=3.5;
        // var bound= a.update.bind(a);
        // setTimeout(bound,3000);
    },
    [
      notes('This is the default representation of stars with default configuration.')
    ]
  )
ratingStory.addChapter(
    'All combined rating chart',
    story => {
        // var a= new rating(story,config);
        // a.create();
        config.noOfStars=5;
        var a= new rating(story,config);
        config.rating_value=3.5;
        a._create();
        //config.rating_value=3.5;
        config.orientation="RL";
        var bound= a._create.bind(a);
        setTimeout(bound,1000);
        
        setTimeout(()=>{
            config.svg_width=200;
            config.svg_height=500;
            config.orientation="TB";        
            bound();
        },2000);
        setTimeout(()=>{
            //debugger;
            config.orientation="BT";        
            bound();
        },3000);
    },
    [
      notes('This is the default representation of stars with default configuration.')
    ]
  )
ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value can only be a positive number',
    story => {
        config.svg_height="500";
        config.svg_width="700";
        config.star_strokewidth="2";
        config.padding="5";
        config.noOfStars="7";
        config.rating_value="4";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should create the star chart with given inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value cannot be anything other than number',
    story => {
        config.svg_height="acc";
        config.svg_width="jkl";
        config.star_strokewidth=null;
        config.padding="";
        config.noOfStars="xy";
        config.rating_value="yy";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as Invalid inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value cannot be a negative number',
    story => {
        config.svg_height="-9";
        config.svg_width="-6";
        config.star_strokewidth="-1";
        config.padding="-3";
        config.noOfStars="-11";
        config.rating_value="-2";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as negative inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width cannot be a positive number lesser than 10',
    story => {
        config.svg_height="1";
        config.svg_width="4";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as invalid svg dimensions.')
    ]
  )

ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated can be anything but invalid hex value',
    story => {
        config.fill_rated="red";
        config.fill_unrated="abc";
        config.stroke_rated="green";
        config.stroke_unrated="#ccc";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should create star with given inputs.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated cannot be an invalid hex values',
    story => {
        config.stroke_rated="#nnm";
        config.fill_rated="#zzz";

        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as invalid hex values.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated should be a valid hex values',
    story => {
        config.fill_rated="#f8f8f8";
        config.fill_unrated="#abc";
        config.stroke_rated="#ddd";
        config.stroke_unrated="#fff";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should create star with given inputs.')
    ]
  )
ratingStory.addChapter(
    'star\'s fill_rated and fill_unrated must not be same',
    story => {
        config.fill_rated="#abc";
        config.fill_unrated="#abc";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as fill_rated and fill_unrated cannot be same color.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated and stroke_unrated must not be same',
    story => {
        config.stroke_rated="#ddd";
        config.stroke_unrated="#ddd";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as stroke_rated and stroke_unrated cannot be same color.')
    ]
  )

//strokewidth fallback
ratingStory.addChapter(
    'max strokewidth can be 10% of the size of each star box',
    story => {
        config.svg_height="100";
        config.svg_width="100";
        config.star_strokewidth="100";
        config.noOfStars="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
    notes('This should represent the star chart with 10% of the star box strokewidth and as no of star increases the box size decreases hence strokewidth also decreases.')
    ]
  )

//padding fallback
ratingStory.addChapter(
    'max padding can be 10% of the size of each star box',
    story => {
        config.svg_height="100";
        config.svg_width="200";
        config.padding="500";
        config.noOfStars="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
    notes('This should represent the star chart with 10% of the star box padding and as no of star increases the box size decreases hence padding also decreases.')
    ]
  )
ratingStory.addChapter(
    'padding must be 0 for size of each star box lesser than 50',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
      notes('This should give the stars strokewidth of 5.')
    ]
  )
  /*
//side of star box fallback
ratingStory.addChapter(
    'side of star box must be greater than 10',
    story => {
        config.svg_height="100";
        config.svg_width="100";
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
      notes('This should give the stars strokewidth of 5.')
    ]
  )
ratingStory.addChapter(
    'side of star box should not be lesser than 10',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
      notes('This should log error as size of star box cannot be less than 10.')
    ]
  )  
  */

ratingStory.addChapter(
    'rating value must not be greater than no of stars, fallback to default',
    story => {
        config.noOfStars="6";
        config.rating_value="10"
        var a= new rating(story,config);
        a.create(); 
    },
    [
      notes('This should force the rating value to fallback to default, i.e., no of stars(=6).')
    ]
  )
ratingStory.addChapter(
    'rating value must be lesser than no of stars',
    story => {
        config.noOfStars="6";
        config.rating_value="3"
        var a= new rating(story,config);
        a.create(); 
    },
    [
      notes('This is the rating chart as it appears by giving the rating value 3 for 6 no of stars.')
    ]
  )
ratingStory.addChapter(
    'justify can only be one of the 4 possible values, i.e., center, stretch, start, end',
    story => {
        config.justify="start";
        var a= new rating(story,config);
        a.create();     
    },
    [
      notes('This should justify stars to the start of the svg.')
    ]
  )
ratingStory.addChapter(
    'justify cannot be anything other than 4 possible values, fallback to default',
    story => {
        config.justify="abcd";
        var a= new rating(story,config);
        a.create();     
    },
    [
      notes('This should log error as invalid justify input.')
    ]
  )
ratingStory.addChapter(
    'orientation can only be one of the 4 possible values, i.e., LR,RL,TB,BT',
    story => {
        config.orientation="RL";
        var a= new rating(story,config);
        a.create();     
    },
    [
      notes('This should rate the stars from right to left.')
    ]
  )
ratingStory.addChapter(
    'orientation cannot be anything other than 4 possible values, fallback to default',
    story => {
        config.orientation="abcd";
        var a= new rating(story,config);
        a.create();     
    },
    [
      notes('This should log error as invalid orientation input.')
    ]
  )
ratingStory.addChapter(
    'star with fractional values',
    story => {
        config.svg_height="500.67";
        config.svg_width="700.23";
        config.star_strokewidth="2.6";
        config.padding="2.5";
        config.rating_value="4.7";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should create stars with given inputs.')
    ]
  )
ratingStory.addChapter(
    'no of stars cannot be fractional value',
    story => {
        config.noOfStars="6.6";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as no of stars cannot be fractional value.')
    ]
  )
ratingStory.addChapter(
    'no of stars cannot be 0',
    story => {
        config.noOfStars="0";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as no of stars cannot be 0.')
    ]
  )



//update


ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value can only be a positive number',
    story => {
        config.svg_height="500";
        config.svg_width="700";
        config.star_strokewidth="2";
        config.padding="3";
        config.noOfStars="7";
        config.rating_value="4";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should update the star chart with given inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value cannot be anything other than number',
    story => {
        config.svg_height="acc";
        config.svg_width="jkl";
        config.star_strokewidth=null;
        config.padding="";
        config.noOfStars="xy";
        config.rating_value="yy";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as Invalid inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width, strokewidth, padding, no of stars, rating value cannot be a negative number',
    story => {
        config.svg_height="-9";
        config.svg_width="-6";
        config.star_strokewidth="-1";
        config.padding="-3";
        config.noOfStars="-11";
        config.rating_value="-2";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as negative inputs.')
    ]
  )
ratingStory.addChapter(
    'svg height and width cannot be a positive number lesser than 10',
    story => {
        config.svg_height="1";
        config.svg_width="4";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as invalid svg dimensions.')
    ]
  )

ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated can be anything but invalid hex value',
    story => {
        config.fill_rated="red";
        config.fill_unrated="abc";
        config.stroke_rated="green";
        config.stroke_unrated="#ccc";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should update star with given inputs.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated cannot be an invalid hex values',
    story => {
        config.fill_rated="#nnm";
        config.stroke_rated="#zzz";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as invalid hex values.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated, stroke_unrated and star\'s fill_rated, fill_unrated should be a valid hex values',
    story => {
        config.fill_rated="#f8f8f8";
        config.fill_unrated="#abc";
        config.stroke_rated="#ddd";
        config.stroke_unrated="#fff";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should update star with given inputs.')
    ]
  )
ratingStory.addChapter(
    'star\'s fill_rated and fill_unrated must not be same',
    story => {
        config.fill_rated="#abc";
        config.fill_unrated="#abc";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as fill_rated and fill_unrated cannot be same color.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke_rated and stroke_unrated must not be same',
    story => {
        config.stroke_rated="#ddd";
        config.stroke_unrated="#ddd";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as stroke_rated and stroke_unrated cannot be same color.')
    ]
  )
/*
//strokewidth fallback
ratingStory.addChapter(
    'star\'s strokewidth can only be a number between 0 to 10 for size of each star box greater than 50',
    story => {
        config.svg_height="100";
        config.svg_width="100";
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should update the stars strokewidth to 5.')
    ]
  )
ratingStory.addChapter(
    'star\'s strokewidth must be 0 for size of each star box lesser than 50',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should force update the stars strokewidth to 0.')
    ]
  )
  */
//padding fallback
ratingStory.addChapter(
    'max padding can be 10% of the size of each star box',
    story => {
        config.svg_height="100";
        config.svg_width="200";
        config.padding="500";
        config.noOfStars="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should represent the star chart with 10% of the star box padding and as no of star increases the box size decreases hence padding also decreases.')
    ]
  )

  /*
//side of star box fallback
ratingStory.addChapter(
    'side of star box must be greater than 10',
    story => {
        config.svg_height="100";
        config.svg_width="100";
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should update the stars strokewidth to 5.')
    ]
  )
ratingStory.addChapter(
    'side of star box should not be lesser than 10',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should log error as size of star box cannot be less than 10.')
    ]
  )  
  */

ratingStory.addChapter(
    'rating value must not be greater than no of stars, fallback to default',
    story => {
        config.noOfStars="6";
        config.rating_value="10"
        var a= new rating(story,config);
        a.update(); 
    },
    [
      notes('This should force update the rating value to fallback to default, i.e., no of stars(=6).')
    ]
  )
ratingStory.addChapter(
    'rating value must be lesser than no of stars',
    story => {
        config.noOfStars="6";
        config.rating_value="3"
        var a= new rating(story,config);
        a.update(); 
    },
    [
      notes('This should update the rating chart as it appears by giving the rating value 3 for 6 no of stars.')
    ]
  )
ratingStory.addChapter(
    'justify can only be one of the 4 possible values, i.e., center, stretch, start, end',
    story => {
        config.justify="start";
        var a= new rating(story,config);
        a.update();     
    },
    [
      notes('This should update the justification of the stars to the start of the svg.')
    ]
  )
ratingStory.addChapter(
    'justify cannot be anything other than 4 possible values, fallback to default',
    story => {
        config.justify="abcd";
        var a= new rating(story,config);
        a.update();     
    },
    [
      notes('This should log error as invalid justify input.')
    ]
  )
ratingStory.addChapter(
    'orientation can only be one of the 4 possible values, i.e., LR,RL,TB,BT',
    story => {
        config.orientation="RL";
        var a= new rating(story,config);
        a.update();     
    },
    [
      notes('This should update the orientation of the stars from right to left.')
    ]
  )
ratingStory.addChapter(
    'orientation cannot be anything other than 4 possible values, fallback to default',
    story => {
        config.orientation="abcd";
        var a= new rating(story,config);
        a.update();     
    },
    [
      notes('This should log error as invalid orientation input.')
    ]
  )
ratingStory.addChapter(
    'star with fractional values',
    story => {
        config.svg_height="500.67";
        config.svg_width="700.23";
        config.star_strokewidth="2.6";
        config.padding="2.5";
        config.rating_value="4.7";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should update stars with given inputs.')
    ]
  )
ratingStory.addChapter(
    'no of stars cannot be fractional value',
    story => {
        config.noOfStars="6.6";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as no of stars cannot be fractional value.')
    ]
  )
//stress testing
  ratingStory.addChapter(
    'stress testing',
    story => {
        config.rating_value= 4.5;
        config.noOfStars= 5;
        config.svg_width= 400;
        let a = new rating(story, config),
          T = 1, startTime = ((new Date()).getTime() * 1), time = 0;
          while(time < 100){
            a.update();
            config.rating_value+=T;
            config.noOfStars+=T;
            config.svg_width+=T*100;
            time =  ((new Date()).getTime() * 1) - startTime;
            T++;
          }
      console.log(T + ' tests in ' + time + 'ms');

    },
    [
      notes('This should log error as no of stars cannot be fractional value.')
    ]
  )
export default ratingStory;