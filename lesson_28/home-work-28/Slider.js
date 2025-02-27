export class Slider {
    currentSlide = 0;
    slideCount = 0;
    isSliding = false;
    playIntervalId;
    playTime = 2;
    touchStartX;
    touchSensitivity = 50;


    constructor(images) {
        if (!images || !images.length || !Array.isArray(images)) {
            throw new Error('No images specified');
        }
        this.images = images;
        this.slideCount = images.length;

        this.slidesContainerElement = document.querySelector('#slider .slides');
        this.indicatorsContainerElement = document.querySelector('#slider .indicators');
        this.playElement = document.querySelector('#slider .play-btn');

        this.generateImg();
        this.generateIndicators();
        this.refreshIndicators();

        this.firstImageElement = document.querySelector('#slider .slides img');

        this.makeSubscriptions();
    }

    makeSubscriptions() {
        document.querySelector('#slider .controls .next').addEventListener('click', this.toNextClick.bind(this));
        // document.querySelector('#slider .controls .prev').addEventListener('click', toPrevClick);
        // this.indicatorsContainerElement.addEventListener('click', onIndicatorClick);
        // document.querySelector('#slider .play-btn').addEventListener('click', playPauseSlides);
    }

    generateImg() {
        let resultHtml = '';
        this.images.forEach(imageLink => {
            resultHtml += `<img src="images/slider/${imageLink}" alt="">`;
        })
        this.slidesContainerElement.innerHTML = resultHtml;
    }

    generateIndicators() {
        let resultHtml = '';
        this.images.forEach((imageLink, index) => {
            if (index === 0) {
                resultHtml += `<button class="indicator active" data-img-number="${index}" type="button"></button>`;
            }
            else {
                resultHtml += `<button class="indicator" data-img-number="${index}" type="button"></button>`;
            }
        })
        this.indicatorsContainerElement.innerHTML = resultHtml;
    }


    refreshIndicators() {
        const activeIndicator = document.querySelector('#slider .active');
        if (activeIndicator) {
            activeIndicator.classList.remove('active');
        }
        document.querySelector(`#slider button[data-img-number="${this.currentSlide}"]` ).classList.add('active');
    }

    toNextClick() {
        this.currentSlide++;
        if (this.currentSlide === this.slideCount) {
            this.currentSlide = 0;
        }
        console.log(this.firstImageElement);
        this.slidesContainerElement.style.transform = `translate(-${this.currentSlide * this.firstImageElement.offsetWidth}px)`;
        this.refreshIndicators();
    }
}