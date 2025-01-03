import { createElement } from '../utils.js'
import * as Modal from './modal.js'

const CssClasses = {
  SLIDE: 'slide',
  CONTENT: 'slide__content',
  IMAGE: 'slide__image',
  TITLE: 'slide__title',
  BUTTON: ['button','slide__button'],
}

const TEXT_BUTTON = 'Learn more'

const renderSlide = (pet) => {
  const slide = createElement('div', CssClasses.SLIDE)
  const content = createElement('div', CssClasses.CONTENT)
  const image = createElement('img', CssClasses.IMAGE)
  image.src = pet.img
  image.alt = `Picture of ${pet.name}`

  const title = createElement('div', 'slide__title')
  title.textContent = pet.name

  const button = createElement('button', CssClasses.BUTTON)
  button.type = 'button'
  button.textContent = TEXT_BUTTON
  slide.addEventListener('click', slideClickHandler)

  content.append(title, button)
  slide.append(image, content)

  return slide 
}

function slideClickHandler () {
  const slide = this
  const slideContent = slide.lastElementChild
  const petName = slideContent.firstElementChild.textContent
  Modal.createModalComponent(petName)
}

export { renderSlide }