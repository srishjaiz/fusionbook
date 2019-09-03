import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'


const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
    'svg height can only be a number',
    story => {
      rating(story,500,"abc","#333","#f8f8f8",5,"horizontal")
    },
    [
      notes('This should log error as Invalid svg height.')
    ]
  )

ratingStory.addChapter(
    'svg width can only be a number',
    story => {
      rating(story,"abc","100","#333","#f8f8f8",5,"horizontal")
    },
    [
      notes('This should log error as Invalid svg width.')
    ]
)
ratingStory.addChapter(
    'svg element creation with provided valid width and height',
    story => {
      rating(story,500,100,"#333","#f8f8f8",8,"horizontal",5)
    },
    [
      notes('This should successfully create the svg element in dom having the stars.')
    ]
  )
ratingStory.addChapter(
    'star\'s stroke and star\'s fill can only be a hex value',
    story => {
      rating(story,500,"100","abc","xyz",5,"horizontal")
    },
    [
      notes('This should log 2 errors as only hex value allowed.')
    ]
  )

ratingStory.addChapter(
    'star\'s strokewidth can only be a number and less than 10',
    story => {
      rating(story,500,"100","#333","#f8f8f8",15,"horizontal")
    },
    [
      notes('This should log error as invalid stroke-width, cannot be greater than 10.')
    ]
  )

ratingStory.addChapter(
    'no of stars can only be a number',
    story => {
      rating(story,500,"100","#333","#f8f8f8",8,"horizontal","abc")
    },
    [
      notes('This should log error as invalid no of stars.')
    ]
  )
ratingStory.addChapter(
    'for horizontal, svg width cannot be lesser than height',
    story => {
      rating(story,100,500,"#333","#f8f8f8",8,"horizontal")
    },
    [
      notes('This should log error as for horizontal, height cannot be greater than width.')
    ]
  )
ratingStory.addChapter(
    'for horizontal, svg width cannot be lesser than no of stars times height',
    story => {
      rating(story,400,100,"#333","#f8f8f8",8,"horizontal",5)
    },
    [
      notes('This should log error as width cannot fit all n stars.')
    ]
  )
ratingStory.addChapter(
    'for vertical, svg height cannot be lesser than width',
    story => {
      rating(story,500,100,"#333","#f8f8f8",8,"vertical")
    },
    [
      notes('This should log error as for vertical, width cannot be greater than height.')
    ]
  )
ratingStory.addChapter(
    'for vertical, svg height cannot be lesser than no of stars times width',
    story => {
      rating(story,100,400,"#333","#f8f8f8",8,"vertical",5)
    },
    [
      notes('This should log error as height cannot fit all n stars.')
    ]
  )

ratingStory.addChapter(
    'direction of stars can only be either \'horizontal\' or \'vertical\'',
    story => {
      rating(story,500,"100","#333","#f8f8f8",8,"orizontal")
    },
    [
      notes('This should log error as invalid direction.')
    ]
  )
ratingStory.addChapter(
  'stars with horizontal direction',
  story => {
    rating(story,1000,100,"#333","#f8f8f8",5,"horizontal",7)
  },
  [
    notes('This is the rating as it appears by giving horizontal direction.')
  ]
)
ratingStory.addChapter(
    'stars with vertical direction',
    story => {
      rating(story,100,1000,"#333","#f8f8f8",5,"vertical",8)
    },
    [
      notes('This is the rating as it appears by giving vertical direction.')
    ]
  )
ratingStory.addChapter(
  'stars with fractional values',
  story => {
    rating(story,800.50,100.22,"#333","#f8f8f8",5.8,"horizontal",7)
  },
  [
    notes('This is the rating as it appears by giving horizontal direction.')
  ]
)
ratingStory.addChapter(
    'stars with diffrent fill color showing the rating value',
    story => {
      rating(story,800.50,100.22,"#333","#f8f8f8",5.8,"horizontal",7,5)
    },
    [
      notes('This is the rating as it appears by giving the rating value 5.')
    ]
  )
ratingStory.addChapter(
    'stars with no rating value',
    story => {
      rating(story,800.50,100.22,"#333","#f8f8f8",5.8,"horizontal",7)
    },
    [
      notes('This is the rating as it appears by giving the default rating value 5.')
    ]
  )
ratingStory.addChapter(
    'stars with rating value greater than no of stars',
    story => {
      rating(story,800.50,100.22,"#333","#f8f8f8",5.8,"horizontal",7,10)
    },
    [
      notes('This should throw error as rating value cannot be greater than no of stars.')
    ]
  )
export default ratingStory;