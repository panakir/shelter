import { createElement } from '../utils.js'
import { renderSlide } from './slide.js'
import pets from '../../data/pets.js'

const slider = document.getElementById('slider')


const CssClasses = {
  BUTTON: [ 'slider__button'],
  WRAPPER: 'slider__wrapper',
  CONTAINER: 'slider__container',
  BLOCK: 'slider__block',
  ANIMATE_TO_RIGHT: 'slider__container_animate-to-right',
  ANIMATE_TO_LEFT: 'slider__container_animate-to-left',
  NO_TRANSITION: 'slider__container_no-transition',
}

const COUNT_BLOCKS = 3
const ORDER_VISIBLE_SLIDES = 2
const slides = []

let visibleSlides = []
let leftGroupSlides = []
let rightGroupSlides = []
let deltaOrder = 0

let slidesContainer = null
let prevBtn = null
let nextBtn = null
let width = window.innerWidth

const COUNT_SLIDES = width > 1040 ? 3 : width >= 768 ? 2 : 1

const generateSlider = () => {
  prevBtn = createElement('button', CssClasses.BUTTON)
  prevBtn.type = 'button'
  nextBtn = createElement('button', CssClasses.BUTTON)
  nextBtn.type = 'button'
  nextBtn.classList.add('slider__button_next')
  const wrapper = createElement('div', CssClasses.WRAPPER)

  slidesContainer = createElement('ul', CssClasses.CONTAINER)

  pets.sort(() => Math.random() - 0.5).forEach((pet) => {
    const slide = renderSlide(pet)
    slides.push(slide)
  })

  for (let i = 0; i < COUNT_BLOCKS; i++) {
    const blockOfSlides = createElement('li', CssClasses.BLOCK)
    blockOfSlides.style.order = i + 1 
    slidesContainer.append(blockOfSlides)
  }

  for (let i = 0; i < COUNT_SLIDES; i++) {
    const slide = slides[i]
    slidesContainer.children[1].append(slide)
    visibleSlides.push(slide)
  }

  prevBtn.addEventListener('click', prevButtonClickHandler)
  nextBtn.addEventListener('click', nextButtonClickHandler)
  slidesContainer.addEventListener('transitionend', transitionEndHandler)

  wrapper.append(slidesContainer)
  slider.append(prevBtn, wrapper, nextBtn)
}

function disabledButtons() {
  prevBtn.disabled = true
  nextBtn.disabled = true
}

function enabledButtons() {
  prevBtn.disabled = false
  nextBtn.disabled = false
}

function prevButtonClickHandler() {
  let rightGroupSlides = null

  for(const block of slidesContainer.children) {
    if(+block.style.order === ORDER_VISIBLE_SLIDES - 1) {
      rightGroupSlides = block 
      break
    }
  }

  while(rightGroupSlides.firstChild) {
    rightGroupSlides.firstElementChild.remove()
  }
  
  const slidesToShow = getRightBlockSlides()
  visibleSlides = [...slidesToShow]
  slidesToShow.forEach((slide) => {
    rightGroupSlides.append(slide)
  })

  slidesContainer.classList.add(CssClasses.ANIMATE_TO_RIGHT)
  
  deltaOrder = 1
  disabledButtons()
}

function nextButtonClickHandler() {
  let leftGroupSlides = null

  for(const block of slidesContainer.children) {
    if(+block.style.order === ORDER_VISIBLE_SLIDES + 1) {
      leftGroupSlides = block 
      break
    }
  }

  while(leftGroupSlides.firstChild) {
    leftGroupSlides.firstElementChild.remove()
  }
  
  const slidesToShow = getLeftBlockSlides()
  visibleSlides = [...slidesToShow]
  slidesToShow.forEach((slide) => {
    leftGroupSlides.append(slide)
  }) 

  slidesContainer.classList.add(CssClasses.ANIMATE_TO_LEFT)  

  deltaOrder = -1

  disabledButtons()
}

function transitionEndHandler(event) {
  if (event.propertyName !== 'transform') return
  slidesContainer.classList.add(CssClasses.NO_TRANSITION) 
  
  for(const block of slidesContainer.children) {
    let order = +block.style.order 
    order += deltaOrder
    if(order <= 0) {
      order = COUNT_BLOCKS
    } else if(order > COUNT_BLOCKS) {
      order = 1
    }

   block.style.order = order
  }

  slidesContainer.classList.remove(CssClasses.ANIMATE_TO_LEFT, CssClasses.ANIMATE_TO_RIGHT)

  setTimeout(() => {
    slidesContainer.classList.remove(CssClasses.NO_TRANSITION)
    enabledButtons()
  }, 1);
}

function getRightBlockSlides() {
  let slidesToShow = null 
    if(rightGroupSlides.length) {
      slidesToShow = rightGroupSlides
      rightGroupSlides = []
    } else {
      slidesToShow = getRandomSlides()
    }
    leftGroupSlides = [...visibleSlides]
    visibleSlides = [...slidesToShow]

    return  slidesToShow
}

function getLeftBlockSlides() {
  let slidesToShow = null
  
  if(leftGroupSlides.length) {
    slidesToShow = leftGroupSlides
    leftGroupSlides = []
  } else {
    slidesToShow = getRandomSlides()
  }

  rightGroupSlides = [...visibleSlides]
  visibleSlides = [...slidesToShow]

 return slidesToShow 
}

function getRandomSlides() {
  const slidesToShow = []
  while(slidesToShow.length < COUNT_SLIDES) {
    const randomIndex = Math.floor(Math.random() * slides.length)
    const slide = slides[randomIndex]
    if (!slidesToShow.includes(slide) && !visibleSlides.includes(slide)) {
      slidesToShow.push(slide)
    }
}
  return slidesToShow
}

generateSlider()