class FUllPage {
  constructor(container, wrapper) {
    //
    this.container = container;
    this.wrapper = wrapper;

    this.current = 0;
    this.canShift = true;
    this.slides = document.querySelectorAll(".page");
    this.slideNum = this.slides.length;
    this.indicators = [];
    this.duration = 100;
    this.timeout = null;

    this.addIndicators();
    this.indicators[0].classList.add("active");
    this.addListener();
  }

  addListener() {
    this.container.addEventListener("wheel", (e) => {
      let that = this;
      //       resetting timeout
      clearTimeout(that.timeout);
      that.timeout = setTimeout(() => (that.canShift = true), that.duration);

      if (that.canShift) {
        that.canShift = false;

        let dir = e.deltaY > 0 ? 1 : -1;
        let nextSlide = that.current + dir;
        // limit
        if (nextSlide >= 0 && nextSlide < that.slideNum) {
          that.current = nextSlide;
          that.slide(dir);
        }
        return;
      }
    });
  }

  slide() {
    this.hideAllIndicators();
    let tl = anime.timeline();

    tl.add({
      targets: this.wrapper,
      translateY: -this.current * window.innerHeight,
      easing: "spring(.9, 92, 12, 0.01)",
      duration: 1000,
    });

    this.indicators[this.current].classList.add("active");
  }

  hideAllIndicators() {
    this.indicators.forEach((el) => {
      el.classList.remove("active");
    });
  }

  addIndicators() {
    let that = this;
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");
    for (let i = 0; i < this.slideNum; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.setAttribute("href", "#section-" + (i + 1));
      a.onclick = (e) => {
        e.preventDefault();
        let dir = i - this.current > 0 ? 1 : -1;
        this.current = i;
        this.slide(dir);
      };
      a.onclick.bind(that);
      this.indicators.push(a);
      li.appendChild(a);
      ul.appendChild(li);
    }
    nav.appendChild(ul);
    this.container.appendChild(nav);
  }

  init() {
    this.slides = document.querySelectorAll(".page");
    this.slideNum = slides.length;

    this.addIndicators();
    this.indicators[0].classList.add("active");
  }
}

//instantiate
const cont = document.querySelector(".container");
const wrp = document.querySelector(".wrapper");

new FUllPage(cont, wrp);
