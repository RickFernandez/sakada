window.addEventListener('wheel', onWheel)
window.addEventListener('scroll', onScroll)

const navigation = document.querySelector('#navigation')
const header = document.querySelector('.fixed-menu')
const btnMenu = document.querySelector('.btn-menu')
const cube = document.querySelector('.cube')
const rotation = 'rotateX(90deg)'
const zoomOut = 'scale(0.3)'
const zoomIn = 'scale(1)'
let currentFace = 'front'
let animationActive = false
let menuIsOpen = false

onWheel()
onScroll()

function onWheel() {
  onAnimation()
}

function onScroll() {
  styledHeader()
}

function onAnimation() {
  if (!animationActive && !navigation.classList.contains('opened')) {
    const backFace = document.querySelector('.back')

    if (currentFace === 'front' && event.deltaY > 0) {
      startAnimationToBack()
    } else if (
      currentFace === 'back' &&
      event.deltaY < 0 &&
      backFace.scrollTop === 0
    ) {
      startAnimationToFront()
    }
  }
}

function startAnimationToBack() {
  animationActive = true

  cube.style.transform = zoomOut + ' ' + rotation

  setTimeout(() => {
    cube.style.transform = zoomIn + ' ' + 'rotateX(180deg)'
    currentFace = 'back'
    animationActive = false
    styledHeader()
  }, 1300)
}

function startAnimationToFront() {
  animationActive = true

  cube.style.transform = zoomOut + ' ' + rotation

  setTimeout(() => {
    cube.style.transform = zoomIn + ' ' + 'rotateX(0)'
    currentFace = 'front'
    animationActive = false
    styledHeader()
  }, 1300)
}

function onMenu() {
  if (btnMenu.classList.contains('opened')) {
    navigation.classList.remove('opened')
    btnMenu.classList.remove('opened')
    header.classList.add('styled')
  } else {
    header.classList.remove('styled')
    navigation.classList.add('opened')
    btnMenu.classList.add('opened')
  }

  document.body.classList.add('menu-expanded')
}

function styledHeader() {
  console.log('chamou')
  if (scrollY > 0 || currentFace !== 'front') {
    if (navigation.classList.contains('opened')) {
      header.classList.remove('styled')
    } else {
      header.classList.add('styled')
    }
  } else {
    header.classList.remove('styled')
  }
}
