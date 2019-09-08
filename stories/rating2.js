import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'


const ratingStory = new Story('Rating').addMetas([configs()])

var config={
    svg_width: "1000",
    svg_height: "100",
    fill_rated: "#f8f8f8",
    fill_unrated: "#ff0",    
    star_strokewidth: "5",
    orientation: "leftToRight",
    N: "7",
    rating_value: "5",
    padding: "2",
    stroke_rated: "#878787",
    stroke_unrated: "#787878",
    justify: "center"
}

//create

ratingStory.addChapter(
    'Default rating chart',
    story => {
        var a= new rating(story,config);
        a.create();
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
        config.padding="3";
        config.N="7";
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
        config.N="xy";
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
        config.N="-11";
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
        config.star_fill="#nnm";
        config.star_stroke="#zzz";
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
/*
//strokewidth fallback
ratingStory.addChapter(
    'star\'s strokewidth can only be a number between 0 to 10 for size of each star box greater than 50',
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
    'star\'s strokewidth must be 0 for size of each star box lesser than 50',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.create();    
    },
    [
      notes('This should give the stars strokewidth of 5.')
    ]
  )
//padding fallback
ratingStory.addChapter(
    'padding can must be 10% of the size of each star box greater than 50',
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
        config.N="6";
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
        config.N="6";
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
        config.N="6.6";
        var a= new rating(story,config);
        a.create();
    },
    [
      notes('This should log error as no of stars cannot be fractional value.')
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
        config.N="7";
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
        config.N="xy";
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
        config.N="-11";
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
        config.star_fill="#nnm";
        config.star_stroke="#zzz";
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
//padding fallback
ratingStory.addChapter(
    'padding can must be 10% of the size of each star box greater than 50',
    story => {
        config.svg_height="100";
        config.svg_width="100";
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should give the stars strokewidth of 5.')
    ]
  )
ratingStory.addChapter(
    'padding must be 0 for size of each star box lesser than 50',
    story => {
        config.star_strokewidth="5";
        var a= new rating(story,config);
        a.update();    
    },
    [
      notes('This should give the stars strokewidth of 5.')
    ]
  )
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
        config.N="6";
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
        config.N="6";
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
        config.N="6.6";
        var a= new rating(story,config);
        a.update();
    },
    [
      notes('This should log error as no of stars cannot be fractional value.')
    ]
  )

export default ratingStory;