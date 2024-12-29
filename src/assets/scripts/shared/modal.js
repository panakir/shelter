import pets from '../../data/pets.js'
import { createElement } from '../utils.js'

const CssClasses = {
  MODAL: 'modal',
  WRAPPER: 'modal__wrapper',
  BUTTON: 'modal__button',
  CONTENT: 'modal__content',
  IMAGE: 'modal__image',
  TEXT_BLOCK: 'modal__text-block',
  DESCRIPTION: 'modal__description',
  TITLE: 'modal__title',
  SUBTITLE: 'modal__subtitle',
  LIST: 'modal__list',
  LIST_ITEM: 'modal__list-item',
}

const ListCharacteristics = [
  'age',
  'inoculations',
  'diseases',
  'parasites'
]

const createModalComponent = (name) => {
  const pet = pets.find(pet => pet.name === name)
  
  const modal = createElement('div', CssClasses.MODAL) 
  const wrapper = createElement('div', CssClasses.WRAPPER)

  const closeButton = createElement('button', CssClasses.BUTTON)
  closeButton.type = 'button'
  const content = createElement('div', CssClasses.CONTENT)
  const image = createElement('img', CssClasses.IMAGE)
  image.src = pet.img
  image.alt = `Picture of ${pet.name}`

  const textBlock = createElement('div', CssClasses.TEXT_BLOCK)

  const title = createElement('h3', CssClasses.TITLE)
  title.textContent = pet.name
  const subtitle = createElement('h4', CssClasses.SUBTITLE)
  subtitle.textContent = `${pet.type} - ${pet.breed}`
  const description = createElement('p', CssClasses.DESCRIPTION)
  description.textContent = pet.description
  const list = generateList(pet)

  textBlock.append(title, subtitle, description, list)
  content.append(image, textBlock, closeButton)
  wrapper.append(content)
  modal.append(wrapper)

  closeButton.addEventListener('click', closeModal)
  modal.addEventListener('click', closeModal)

  document.body.append(modal)
  document.body.classList.add('body_fixed')
}

function generateList(pet) {
  const list = createElement('ul', CssClasses.LIST)
  
  for (const characteristic of ListCharacteristics) {
    const keys = Object.keys(pet)
    if(keys.includes(characteristic)) {
      const listItem = createElement('li', CssClasses.LIST_ITEM)
      
      listItem.innerHTML = `<p><b>${characteristic}</b>: ${pet[characteristic]}</p>`
      list.append(listItem)
    }
  }

  return list
}

function closeModal () {
  event.stopPropagation()
  const { target }  = event
  if(target.classList.contains(CssClasses.BUTTON) || target.classList.contains(CssClasses.MODAL)) {
    document.body.classList.remove('body_fixed')
    document.querySelector(`.${CssClasses.MODAL}`).remove()
  }
}

export { createModalComponent } 