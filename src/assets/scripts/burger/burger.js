const burger = document.getElementById('burger')
const navMenu = document.getElementById('menu')
const body = document.body 

const scrollWidth = window.innerWidth - body.offsetWidth 

const bodyActive = () => {
  body.classList.toggle('body_fixed')

  if (body.classList.contains('body_fixed')) { 
    body.style.paddingRight = `calc((100% - 100vw) + ${scrollWidth}px)`
  } else {
    body.style.paddingRight = 0
  }
}

const toggleMenu = () => {
  burger.classList.toggle('burger_active')
  navMenu.classList.toggle('header__nav_active')
}

const openMenu = () => {
  toggleMenu()
  bodyActive()
}

const closeMenu = () => {
  toggleMenu()
  bodyActive()
}

menu.addEventListener('click', closeMenu)
burger.addEventListener('click', openMenu)