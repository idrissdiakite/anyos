import Block from './Block'
import gsap from 'gsap'
import store from '../util/store'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class History extends Block {
  init() {
    this.setElems()
    this.createTimelines()
  }

  getElems() {
    this.$body = document.querySelector('body')
    this.$menu = document.querySelector('.header__right')
    this.$button = this.el.querySelector('.b-history__button')
    this.$image = this.el.querySelector('.b-history__image img')
    this.$modal = this.el.querySelector('.c-modal')
    this.$cross = this.el.querySelector('.c-modal__cross')
    this.$bullets = this.el.querySelectorAll('.c-modal__bullet')
    this.$mWrapper = this.el.querySelector('.c-modal__wrapper')
    this.$mContent = this.el.querySelector('.c-modal__content')
    this.$mItems = this.el.querySelector('.c-modal__items--wrapper')
    this.$timelineFront = this.el.querySelector('.c-modal__timeline.front')
    this.$timelineBack = this.el.querySelector('.c-modal__timeline.back')
    this.$shape = this.el.querySelector('.c-modal__bottom--shape img')
  }

  setElems() {
    gsap.set(this.$modal, {
      opacity: 0,
      pointerEvents: 'none'
    })

    gsap.set(this.$mWrapper, { autoAlpha: 0 })
    gsap.set(this.$shape, { y: 10 })
  }

  createTimelines() {
    this.openTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.5,
        autoAlpha: 1,
        ease: 'power4.easein'
      },
      onComplete: () => {
        this.animTimeline()
        this.animBullets()
      }
    })

    this.openTl
      .to(this.$modal, { pointerEvents: 'all' })
      .to(this.$mWrapper, { autoAlpha: 1 }, '<')

    this.closeTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.5,
        autoAlpha: 0,
        ease: 'power4.easein'
      }
    })

    this.closeTl
      .to(this.$modal, { pointerEvents: 'none' })
      .to(this.$mWrapper, { autoAlpha: 0 }, '<')
  }

  events() {
    this.$button.addEventListener('click', this.openModal.bind(this))
    this.$cross.addEventListener('click', this.closeModal.bind(this))
  }

  onEnterCompleted() {
    store.observer.observe({
      el: this.el,
      cb: () => {
        this.rotateImage()
      }
    })
  }

  openModal() {
    this.openTl.invalidate()
    this.openTl.restart()

    this.$body.classList.add('locked')
    this.$menu.classList.add('hide')
    store.smoothScroll && store.smoothScroll.stop()
  }

  closeModal() {
    this.closeTl.invalidate()
    this.closeTl.restart()

    this.$body.classList.remove('locked')
    this.$menu.classList.remove('hide')
    store.smoothScroll && store.smoothScroll.start()
  }

  rotateImage() {
    gsap.to(this.$image, {
      scrollTrigger: {
        trigger: this.el,
        start: 'top-=80% top',
        end: 'bottom+=10%',
        scrub: 1
      },
      rotate: '50deg'
    })
  }

  animTimeline() {
    gsap.to(this.$timelineFront, {
      scrollTrigger: {
        scroller: this.$mContent,
        trigger: this.$timelineBack,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      height: '100%',
      ease: 'none'
    })
  }

  animBullets() {
    this.$bullets.forEach((bullet, i) => {
      this.bulletTl = gsap.timeline({
        defaults: {
          ease: 'none'
        },
        scrollTrigger: {
          scroller: this.$mContent,
          trigger: bullet,
          id: i + 1,
          start: 'bottom center',
          scrub: true,
          end: 'bottom+=20px center'
        }
      })

      this.bulletTl.to(bullet, {
        border: '3px solid #ffff',
        backgroundColor: '#f4943c'
      })
    })
  }
}
