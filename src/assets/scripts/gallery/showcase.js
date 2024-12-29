import pets from '../../data/pets.js' 
import { createElement } from '../utils.js'
import { renderSlide } from '../shared/slide.js' 

const CssClasses = {
  SHOWCASE: 'showcase',
  PAGINATION: 'pagination',
  PAGINATION_BUTTON: 'pagination__button',
  PAGINATION_BUTTON_ACTIVE:['pagination__button', 'pagination__button_active'],
}

const gallery = document.querySelector('.gallery')

const TEXT_LAST_PAGE_BUTTON = '>>'
const TEXT_PREV_PAGE_BUTTON = '<'
const TEXT_NEXT_PAGE_BUTTON = '>'
const TEXT_FIRST_PAGE_BUTTON = '<<'
const COUNT_COPY = 6
const initialPetsArray = getInitialPetsArray()

let firstPageBtn = null
let prevPageBtn = null
let lastPageBtn = null
let nextPageBtn = null
let currentPageButton = null
let currentPage = 1
let petsPerPage = 8

function getInitialPetsArray() {
  const initialPetsArray = []
  for (let i = 0; i < COUNT_COPY; i++) {
    const pagePets = pets.sort(() => Math.random() - 0.5)
    initialPetsArray.push(...pagePets)
  }
  return initialPetsArray
}

const createShowcase = () => {
  const showcase = createElement('div', CssClasses.SHOWCASE)

  const petsForCurrentPage = initialPetsArray.slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage)

  petsForCurrentPage.forEach((pet) => {
    const slide = renderSlide(pet)
    showcase.append(slide)
  })

  return showcase
}

const createPagination = () => {
  const pagination = createElement('div', 'pagination')
  firstPageBtn = createElement('button', CssClasses.PAGINATION_BUTTON)
  firstPageBtn.textContent = TEXT_FIRST_PAGE_BUTTON
  firstPageBtn.disabled = true

  prevPageBtn = createElement('button', CssClasses.PAGINATION_BUTTON)
  prevPageBtn.textContent = TEXT_PREV_PAGE_BUTTON
  prevPageBtn.disabled = true

  lastPageBtn = createElement('button', CssClasses.PAGINATION_BUTTON) 
  lastPageBtn.textContent = TEXT_LAST_PAGE_BUTTON

  nextPageBtn = createElement('button', CssClasses.PAGINATION_BUTTON)
  nextPageBtn.textContent = TEXT_NEXT_PAGE_BUTTON

  currentPageButton = createElement('button', CssClasses.PAGINATION_BUTTON_ACTIVE)
  currentPageButton.textContent = currentPage

  firstPageBtn.addEventListener('click', firstPageButtonClickHandler)
  prevPageBtn.addEventListener('click', prevPageButtonClickHandler)
  lastPageBtn.addEventListener('click', lastPageButtonClickHandler)
  nextPageBtn.addEventListener('click', nextPageButtonClickHandler)

  pagination.append(firstPageBtn, prevPageBtn, currentPageButton, nextPageBtn, lastPageBtn)
  
 return pagination
}

function firstPageButtonClickHandler() {
  currentPage = 1
  currentPageButton.textContent = currentPage
  disabledButtons()
  changeShowcasePage()
}

function lastPageButtonClickHandler() {
  currentPage = COUNT_COPY
  currentPageButton.textContent = currentPage
  disabledButtons()
  changeShowcasePage()
}

function prevPageButtonClickHandler() {
  currentPage -= 1
  currentPageButton.textContent = currentPage  
  disabledButtons()
  changeShowcasePage()
}

function nextPageButtonClickHandler() {
  currentPage += 1
  currentPageButton.textContent = currentPage
  disabledButtons()
  changeShowcasePage()
}

function disabledButtons() {
  const buttons = [firstPageBtn, prevPageBtn, nextPageBtn, lastPageBtn]
  buttons.forEach(btn => btn.disabled = true)
}

function enabledButtons() {
  const buttons = [firstPageBtn, prevPageBtn, nextPageBtn, lastPageBtn]
  buttons.forEach(btn => btn.disabled = false)

  if(currentPage === 1) {
    firstPageBtn.disabled = true
    prevPageBtn.disabled = true
  }
  if(currentPage === COUNT_COPY) {
    lastPageBtn.disabled = true
    nextPageBtn.disabled = true
  }
}

function changeShowcasePage() {
  const showcase = document.querySelector('.showcase')
  showcase.classList.add('fade')

  setTimeout(()=>{

    while(showcase.firstChild) {
      showcase.firstElementChild.remove()
    }
    
    const petsForCurrentPage = initialPetsArray.slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage)
    
    petsForCurrentPage.forEach((pet) => {
      const slide = renderSlide(pet)
      showcase.append(slide)
    })
    
    setTimeout(()=>{
      showcase.classList.remove('fade')
      enabledButtons()
    }, 150 )
  },300)
}

function init() {
  const showcase = createShowcase()
  const pagination = createPagination()

  gallery.append(showcase, pagination)
}

init()