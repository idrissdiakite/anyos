import Block from './Block'
import gsap from 'gsap'
import store from '../util/store'
import Splitting from 'splitting'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class FeaturedText extends Block {
  init() {
    this.createWrapChars()
    this.setElems()
  }

  getElems() {
    this.$titles = this.el.querySelector('.b-featured-text__content')
    this.$titlesP = this.el.querySelectorAll('.b-featured-text__content p') ? this.el.querySelectorAll('.b-featured-text__content p') : this.el.querySelector('.b-featured-text__content p')

    this.isBr = this.el.classList.contains('br') ? true : null
  }

  setElems() {
    this.isBr && gsap.set(this.el, {
      yPercent: 100,
      autoAlpha: 0
    })
    gsap.set(this.chars[0].chars, { opacity: 0 })
  }

  createWrapChars() {
    this.chars = new Splitting({
      target: this.$titles,
      by: 'chars'
    })
  }

  onEnterCompleted() {
    this.isBr && this.showEl()

    store.observer.observe({
      el: this.el,
      cb: () => {
        this.animIntro()
        this.animOnScroll()
      }
    })
  }

  showEl() {
    gsap.to(this.el, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 1,
      delay: 0.20,
      ease: 'power4.easeout'
    })
  }

  animIntro() {
    this.introTl = gsap.timeline({
      defaults: {
        opacity: 1,
        duration: 0.25,
        ease: 'power4.easeout'
      }
    })
    this.introTl.to(this.chars[0].chars, { stagger: 0.01 })
  }

  animOnScroll() {
    this.chars = this.chars[0].chars

    if (store.detect.isMobile) {
      this.scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.el,
          start: this.isBr ? 'top 45%' : 'top 55%',
          end: this.isBr ? '+=40%' : '+=80%',
          scrub: 0.75
        }
      })
    } else {
      this.scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.el,
          start: this.isBr ? 'top 80%' : 'top 70%',
          end: this.isBr ? '+=40%' : '+=80%',
          scrub: 0.75
        }
      })
    }
    this.scrollTl
    .set(this.chars, {
        color: '#494b4b',
        stagger: 0.1
      }, 0.1);
  }
}
