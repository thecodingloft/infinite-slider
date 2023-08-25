# Infinite Logo Slider

## Description
Ever wanted to have an infinite slider that moves smoothly to one direction?
For instance, you might want to show logos of partners or brands that are moving smoothly across the screen.

Then you've come to the right place.

This JS class lets you insert an infinite slider (I call it "infinite logo slider" because it works great with logo images) into any website.

You simply have to specify a parent container inside the config object where you would want to insert your slider. 

Then you can use the config object to change images, texts, styles, and more!

## How To Use It
1. Import the minified class into your code.
2. Create a new instance of the slider, pass in your config object.
3. Update the config object as needed.
4. If you make changes to the infiniteSlider Class, run `npm run minify`to minify the code into "infiniteSlider.min.js"

```js 
import InfiniteSlider from './infiniteSlider.min.js';

var sliderConfig = {
    sliderControls: {
        autoStart: true, // set to "true" if the slider should run automatically
        moveDirection: 'left', // left or right
        step: 0.5, // how far you want to move with each interval step
        intervalTime: 50, // the interval amount of the movement in milliseconds
        developmentMode: false, // if you want to see borders for easier debugging
    },
    outerContainer: {
        selector: '.inf-slider__outer-container', // where you want to insert the slider
        height: 300, // height of parent container
        margin: '0 auto', // margin of parent container
        padding: 20, // padding of parent container
        maxWidth: 1500, // max width of parent container
        background: '#fff', // background color of parent container
        sideGradientRGB: '255,255,255', // // gradient at the sides of parent container - format: 255/255/255
    },
    title: {
        text: 'As seen in', // title
        fontSize: 74, // font size
        fontFamily: "'Open Sans', sans-serif", // font-type - 'Open Sans' by default
        colorCode: '#333', // text color
        textAlign: 'center', // text alignment
        padding: 25, // text padding
    },
    elements: {
        width: 250, // elements width
        margin: 20, // elements margin
        padding: 0, // elements padding
        background: 'inherit', // elements background color
        color: '#333', // text color (if you display text)
        items:
        // array of items, containing the link to an image and/or text content
        [
            {src: '/images/new-york-times-logo.png', content: '1'},
            {src: '/images/businessweek-bloomberg-logo.png', content: '2'},
            {src: '/images/techcrunch-logo.png', content: '3'},
            {src: '/images/wsj-logo.png', content: '4'},
            {src: '/images/economist-logo.png', content: '5'},
            {src: '/images/ft-logo.png', content: '6'},
            {src: '/images/handelsblatt-logo.png', content: '7'}
        ]
    }
}

var logoSlider = new InfiniteSlider(sliderConfig);
```

### Notes
- play around with the elements width, margin, and padding to get the right size for your setup.
- use the step and intervalTime properties to change the speed of the slider
- if you don't use the autoStart property, make sure to call the startAnimation() function via a button click or other event
- adjust the html and css as needed to include new features for your specific use case
- for the development mode, you can add borders to the outer and inner container with the developmentMode property
