import { Story, notes, configs } from '../src/lib/story'
import rating from '../components/html/rating'


const ratingStory = new Story('Rating').addMetas([configs()])

ratingStory.addChapter(
  'horizontal',
  story => {
    rating(story,500,100,"green","red",5,"horizontal")
  },
  [
    notes('This is the rating as it appears by giving horizontal direction.')
  ]
)

ratingStory.addChapter(
    'vertical',
    story => {
      rating(story,100,500,"green","red",5,"vertical")
    },
    [
      notes('This is the rating as it appears by giving vertical direction.')
    ]
  )

export default ratingStory
