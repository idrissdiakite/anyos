import Block from './Block'
import gsap from 'gsap'
import store from '../util/store'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class BigTitle extends Block {
  init() {
    this.setElems()
  }

  getElems() {
    this.$title = this.el.querySelector('.b-big-title__title')
    this.$suptitle = this.el.querySelector('.b-big-title__suptitle')
    this.$icon = this.el.querySelector('.b-big-title__icon svg path')
    this.$span = this.el.querySelector('.b-big-title__icon span')
  }

  setElems() {
    if (store.detect.isMobile) {
      gsap.set(this.$title, { color: 'rgba(73, 75, 75, 0.8)' })
      gsap.set([this.$suptitle, this.$icon, this.$span], { autoAlpha: 0 })
    } else {
      gsap.set([this.$title, this.$suptitle, this.$icon, this.$span], { autoAlpha: 0 })
      gsap.set(this.$title, {
        scale: 5,
        color: 'rgba(73, 75, 75, 0.8)'
      })
    }
    
    gsap.set(this.$suptitle, { yPercent: -100 })
  }

  onEnterCompleted() {
    store.observer.observe({
      el: this.el,
      cb: () => {
        this.anim()
      }
    })
  }

  anim() {
    this.scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
        autoAlpha: 1,
        ease: 'power4.easein'
      },
      scrollTrigger: {
        trigger: this.el,
        pin: this.el,
        pinType: 'fixed',
        scrub: true,
        start: 'top top',
        end: '400%',
        toggleActions: 'play none reverse none'
      }
    })

    !store.detect.isMobile && this.scrollTl.to(this.$title, { scale: 1 })
    this.scrollTl
    .to(this.$suptitle, { yPercent: 0 })
    .to([this.$icon, this.$span], {})
    .to(this.el, {
      background: '#262929',
      delay: 1
    })
    .to(this.$icon, { fill: '#fff' })
    .to(this.$span, { background: '#fff' }, '<')
    .to(this.$title, { color: '#fff' }, '<')
    .to(this.$title, { textShadow: '0px 0px 60px rgba(255, 255, 255, 0.40)' }, '<')
    .to(this.$span, { width: '83.5%' }, '<')
    .to(this.$span, { background: '#f4943c' })
  }
}
