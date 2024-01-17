class Carousel {
  constructor(carouselId) {
    this.carouselId = carouselId;

    this.currentIndex = 0;
    this.carousel = document.getElementById(`carousel-${this.carouselId}`);
    this.slides = document.querySelectorAll(
      `#carousel-${this.carouselId} .carousel-item`
    ).length;

    this.renderThumbs(carouselId);
    this.updateCarousel();
    this.assignEventListeners(carouselId);
  }

  updateCarousel() {
    const itemWidth = document.querySelectorAll(
      `#carousel-${this.carouselId} .carousel-item`
    )[0].offsetWidth;
    const newPosition = -this.currentIndex * (itemWidth + 20); // 20 is the right margin

    document.getElementById("slides-count").innerText =
      this.currentIndex + 1 + " of " + this.slides;
    this.carousel.style.transform = `translateX(${newPosition}px)`;

    this.updateThumbs();
  }

  nextSlide() {
    this.currentIndex =
      (this.currentIndex + 1) %
      document.querySelectorAll(`#carousel-${this.carouselId} .carousel-item`)
        .length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex -
        1 +
        document.querySelectorAll(`#carousel-${this.carouselId} .carousel-item`)
          .length) %
      document.querySelectorAll(`#carousel-${this.carouselId} .carousel-item`)
        .length;

    this.updateCarousel();
  }

  updateThumbs() {
    const thumbs = document.querySelectorAll(".carousel-thumb-item");
    const prevActiveThumbs = document.querySelectorAll(
      ".carousel-thumb-item--active"
    );

    if (prevActiveThumbs.length >= 1) {
      prevActiveThumbs[0].classList.remove("carousel-thumb-item--active");
    }
    thumbs[this.currentIndex].classList.add("carousel-thumb-item--active");
  }

  renderThumbs(carouselId) {
    console.log(document.getElementById(`carousel-${carouselId}-thumbs`));
    const container = document.getElementById(`carousel-${carouselId}-thumbs`);
    let thumb = " <ul>";

    for (let idx = 0; idx < this.slides; idx++) {
      thumb += `<li class="carousel-thumb-item"></li>`;
    }

    thumb += "</ul>";
    console.log(thumb);
    container.innerHTML = thumb;
  }

  assignEventListeners(carouselId) {
    window.addEventListener("resize", this.updateCarousel.bind(this));

    const nextButton = document.querySelector(
      `#content-carousel-${carouselId} #next-slide-control`
    );
    nextButton.addEventListener("click", this.nextSlide.bind(this));
    const prevButton = document.querySelector(
      `#content-carousel-${carouselId} #prev-slide-control`
    );
    prevButton.addEventListener("click", this.prevSlide.bind(this));

    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0].screenX;
      this.checkDirection();
    });

    const thumbs = document.querySelectorAll(
      `#content-carousel-${carouselId} .carousel-thumb-item`
    );

    if (thumbs.length) {
      thumbs.forEach((thumb, idx) => {
        thumb.addEventListener("click", function () {
          this.currentIndex = idx;
          this.updateCarousel();
        });
      });
    }
  }

  checkDirection() {
    if (touchendX < touchstartX) {
      nextSlide();
    }
    if (touchendX > touchstartX) {
      prevSlide();
    }
  }
}

const carousel1 = new Carousel(1);
// const carousel2 = new Carousel(2);
// const carousel2 = carouselInstanse(2);
