import Block from './Block'
import gsap from 'gsap'
import store from '../util/store'

export default class Map extends Block {
  init() {
    this.setElems()
    this.currentIndex = -1
  }

  getElems() {
    this.$cities = this.el.querySelectorAll('.b-map__city')
    this.$image = this.el.querySelector('.b-map__image')

    this.cities = []

    for (let i = 0; i < this.$cities.length; i++) {
      const el = this.$cities[i]
      const name = this.$cities[i].querySelector('.b-map__city--name').innerHTML.toLowerCase()
      const content = this.$cities[i].querySelector('.b-map__city--content')
      const icon = this.$image.querySelector(`#${name}`)

      this.cities[i] = {
        el,
        name,
        content,
        icon
      }
    }
  }

  setElems() {
    for (let i = 0; i < this.cities.length; i++) {
      gsap.set(this.cities[i].el, {
        x: 200,
        autoAlpha: 0
      })

      gsap.set(this.cities[i].content, {
        autoAlpha: 0,
        maxHeight: 0
      })
    }
  }

  onEnterCompleted() {
    for (let i = 0; i < this.cities.length; i++) {
      store.observer.observe({
        el: this.cities[i].el,
        cb: () => {
          this.showCities(i)
        }
      })
    }
  }

  events() {
    for (let i = 0; i < this.cities.length; i++) {
      if (store.detect.isMobile) {
        this.cities[i].el.addEventListener('click', this.anim.bind(this, i));
      } else {
        this.cities[i].el.addEventListener('mouseenter', this.animIn.bind(this, i));
        this.cities[i].el.addEventListener('mouseleave', this.animOut.bind(this, i));
      }
    }
  }

  showCities(i) {
    const cityTl = gsap.timeline({
      defaults: {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power4.easein'
      }
    })

    cityTl.to(this.cities[i].el, {})
  }

  anim(i) {
    if (i === this.currentIndex) {
      gsap.to(this.cities[i].content, {
        autoAlpha: 0,
        maxHeight: 0
      })

      gsap.to(this.cities[i].icon, {
        scale: 1,
        rotation: 45,
        transformOrigin: 'center center',
        duration: 0.5
      })
    } else {
      this.currentIndex = i
      this.maxHeight = this.cities[i].content.scrollHeight

      gsap.to(this.cities[i].content, {
        autoAlpha: 1,
        maxHeight: this.maxHeight
      })

      gsap.to(this.cities[i].icon, {
        scale: 1.5,
        rotation: 180,
        transformOrigin: 'center center',
        duration: 0.5
      })
    }
  }

  animIn(i) {
    this.maxHeight = this.cities[i].content.scrollHeight

    gsap.to(this.cities[i].content, {
      autoAlpha: 1,
      maxHeight: this.maxHeight
    })

    gsap.to(this.cities[i].icon, {
      scale: 1.5,
      rotation: 180,
      transformOrigin: 'center center',
      duration: 0.5
    })
  }

  animOut(i) {
    gsap.to(this.cities[i].content, {
      autoAlpha: 0,
      maxHeight: 0
    })

    gsap.to(this.cities[i].icon, {
      scale: 1,
      rotation: 45,
      transformOrigin: 'center center',
      duration: 0.5
    })
  }
}
