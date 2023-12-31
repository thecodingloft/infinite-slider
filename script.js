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
