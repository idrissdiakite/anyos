import Block from './Block'
import gsap from 'gsap'
import store from '../util/store'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class CoverHome extends Block {
  init() {
    this.resize()
    this.setElems()
    this.createTimelines()
  }

  getElems() {
    this.$titles = this.el.querySelector('.b-cover-home__content')
    this.$heroBtn = this.el.querySelector('.c-hero-btn')
    this.$heroBtnShape = this.$heroBtn.querySelector('.c-hero-btn__shape')
    this.$heroBtnPath = this.$heroBtn.querySelector('.c-hero-btn__shape path')
    this.$heroBtnImage = this.$heroBtn.querySelector('.c-hero-btn__image')
    this.$heroBtnSquare = this.$heroBtn.querySelector('.c-hero-btn__square--shape')
    this.$heroBtnIcon = this.$heroBtn.querySelector('.c-hero-btn__icon')
    this.$heroBtntext = this.$heroBtn.querySelector('.c-hero-btn__icon span')
  }

  setElems() {
    if (!store.detect.isMobile) {
      gsap.set(this.$heroBtnImage, { yPercent: 120 })
      gsap.set([this.$heroBtnShape, this.$heroBtnSquare], { yPercent: 120 })
      gsap.set(this.$heroBtnIcon, { opacity: 0 })
    }

    // Problème de glitch
    // Si iphone, on passe le bloc en position relative
    if (store.detect.isMobile) {
      (/iPhone/).test(navigator.userAgent) && this.el.classList.add('pr')
    }
  }

  onEnterCompleted() {
    this.animIntro()
    !store.detect.isMobile && this.animOnScroll()
    !store.detect.isMobile && this.updateBlockPosition()
  }

  events() {
    !store.detect.isMobile && this.$heroBtn.addEventListener('click', this.scrollDown.bind(this))

    if (store.w.w > 1024 && !store.detect.isSafari) {
      this.$heroBtn.addEventListener('mouseenter', this.animBtnIn.bind(this))
      this.$heroBtn.addEventListener('mouseleave', this.animBtnOut.bind(this))
    }
  }

  createTimelines() {
    this.btnTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.5,
        ease: 'power4.easein'
      }
    })

    this.btnTl
      .to(this.$heroBtnPath, { d: 'path("M348 20C348 8.95431 339.046 0 328 0H111C99.9543 0 91 8.9543 91 20V65C91 76.0457 82.0457 85 71 85H20C8.95431 85 0 93.9543 0 105V155C0 166.046 8.9543 175 20 175H149C160.046 175 169 166.046 169 155V105C169 93.9543 177.954 85 189 85H328C339.046 85 348 76.0457 348 65V20Z")' })
      .to(this.$heroBtnImage, { y: -13 }, '<')
      .to(this.$heroBtnSquare, { width: this.width }, '<')
      .to(this.$heroBtnIcon, { x: '10%' }, '<')
      .to(this.$heroBtntext, { opacity: 1 }, '<')
    }

  animIntro() {
    this.animTl = gsap.timeline({
      defaults: {
        duration: 0.5,
        delay: 0.25,
        ease: 'power4.easein'
      }
    })

    if (!store.detect.isMobile) {
      this.animTl
      .to(this.$heroBtnShape, { yPercent: 0 })
      .to(this.$heroBtnSquare, { yPercent: 0 }, '>')
      .to(this.$heroBtnImage, { yPercent: 0 })
      .to(this.$heroBtnIcon, { opacity: 1 }, '<')
    }
  }

  animBtnIn() {
    this.btnTl.invalidate()
    this.btnTl.restart()
  }

  animBtnOut() {
    this.initialTl = gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: 'power4.easein'
      }
    })

    this.initialTl
      .to(this.$heroBtnPath, { d: 'path("M348 20C348 8.95431 339.046 0 328 0H111C99.9543 0 91 8.9543 91 20V65C91 76.0457 82.0457 85 71 85H20C8.95431 85 0 93.9543 0 105V155C0 166.046 8.9543 175 20 175H218C229.046 175 238 166.046 238 155V105C238 93.9543 246.954 85 258 85H328C339.046 85 348 76.0457 348 65V20Z")' })
      .to(this.$heroBtnImage, { y: 0 }, '<')
      .to(this.$heroBtnSquare, { width: this.initialWidth }, '<')
      .to(this.$heroBtnIcon, { x: 0 }, '<')
      .to(this.$heroBtntext, { opacity: 0 }, '<')
  }

  scrollDown() {
    store.smoothScroll.scrollTo(window.innerHeight)
  }

  animOnScroll() {
    gsap.to(this.el, {
      scrollTrigger: {
        trigger: this.el,
        start: 'top',
        end: 'bottom',
        scrub: 1
      },
      opacity: 0.8
    })

    gsap.to([this.$titles, this.$heroBtn], {
      scrollTrigger: {
        trigger: this.el,
        start: 'top',
        end: 'bottom',
        scrub: 1
      },
      yPercent: 20
    })
  }

  updateBlockPosition() {
    gsap.to(this.el, {
      scrollTrigger: {
        trigger: this.el,
        start: 'bottom top',
        end: 'bottom bottom',
        scrub: 1
      },
      position: 'relative'
    })
  }

  resize() {
    this.initialWidth = this.$heroBtnSquare.offsetWidth

    if (store.w.w < 1440) {
      this.width = '138px'
    } else if (store.w.w < 1800) {
      this.width = '155px'
    } else this.width = '210px'

    if (store.w.w >= 1280 && store.w.h < 750) {
      this.el.classList.add('resize')
    } else this.el.classList.remove('resize')
  }
}
