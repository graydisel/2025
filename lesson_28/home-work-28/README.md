# Slider component on JavaScript
This is a JavaScript-based image slider that allows you to display a set of images.
## Main features:
1) Navigate slides using next/previous buttons;
2) Indicators for slide selection;
3) Play/Pause button;
4) Keyboard navigation (arrow keys and spacebar for play/pause);
5) Autoplay with a customizable interval;
6) Swipe support for touch devices and touch sensitivity.
## How to use it.
1. Copy the file `Slider.js` into your website folder and add HTML and CSS code as by example, provided in folder.
2. Create main `*.js` file and import the Class **Slider** from `Slider.js` or use the example `main.js`.
3. Create new class with parameters.
### Configuration options
The `Slider` class accepts an object with the following parameters:
1) sliderId - Type: String - The ID of the slider container (required).
2) images - Type: Array - An array of image file names (required).
3) playTime - Type: Number - Time interval (in seconds) for autoplay. `3` by default
4) isIndicatorsHidden - Type: Boolean - Hides slide indicators if set to `true`. `false` by default.
### Controls
1) Next/Prev buttons: Navigate between slides.

2) Indicators: Click to jump to a specific slide.

3) Autoplay: Click the play button to start/stop the slideshow.

4) Keyboard Shortcuts:

    - ArrowRight: Next slide

    - ArrowLeft: Previous slide

    - Spacebar: Play/Pause slideshow

5) Touch Support: Swipe left/right on touch devices.

> [!TIP]
> You can remove *Next*, *Previous* or *Play / Stop* button from HTML code on your own option.

## License
This project is free to use and modify.


