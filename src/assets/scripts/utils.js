const createElement = (tag, className) => {
  const element = document.createElement(tag)
  Array.isArray(className) ? 
  element.classList.add(...className) 
  : element.classList.add(className)
  
  return element
}

export { createElement }