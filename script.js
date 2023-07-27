var innerContainer = document.querySelector('.slider__inner-container ');

class InfiniteSlider {
    constructor(config) { 
        // outer container
        this.outerContainer = config.outerContainer || {};
        // add defaults later
        this.outerContainer.selector = config.outerContainer.selector || '.inf-slider__outer-container';
        this.outerContainer.height = config.outerContainer.height || 200;
        this.outerContainer.margin = config.outerContainer.margin || '0 auto';
        this.outerContainer.padding = config.outerContainer.padding || 0;
        this.outerContainer.maxWidth = config.outerContainer.maxWidth || 1200
        this.outerContainer.element = null // gets updated later
        // inner container
        this.innerContainer = {};
        this.innerContainer.selector = '.inf-slider__inner-container';
        this.innerContainer.array = [] // gets added later
        this.innerContainer.width = null; // gets calculated later
        this.outerContainer.element = null;
        // title
        this.title = config.title || {};
        this.title.text = config.title.text || null;
        this.title.fontSize = config.title.fontSize || 74;
        this.title.fontFamily = config.title.fontFamily || 'Arial';
        this.title.textAlign = config.title.textAlign || 'center';
        // elements
        this.elements = config.elements || {};
        this.elements.width = config.elements.width || 70;
        this.elements.margin = config.elements.margin || 20;
        this.elements.padding = config.elements.padding || 20;
        this.elements.items = config.elements.items || [];
        // added check - if width is smaller than 2 times padding, use 2 times padding instead
        this.elements.width / 2 < this.elements.padding 
            ? this.elements.width = this.elements.padding * 2 
            : this.elements.width = this.elements.width;
        // slider controls
        this.sliderControls = config.sliderControls || {};
        this.sliderControls.autoStart = config.sliderControls.autoStart || true;
        this.sliderControls.moveDirection = config.sliderControls.moveDirection || 'left';
        this.sliderControls.steps = config.sliderControls.steps || 1;
        this.sliderControls.developmentMode = config.sliderControls.developmentMode || false;
        this.sliderControls.interval = null;

        // initialize the slider
        this.init();
    }

    setOuterContainer() {
        this.outerContainer.element = document.querySelector(this.outerContainer.selector);
    }

    setInnerContainerWidth() {
        // need the width to get the transform-x distance for each container
        this.innerContainer.width = this.elements.items.length * (this.elements.width + (this.elements.margin * 2));
        console.log('inner container width: ', this.innerContainer.width)
    }

    setAllInnerContainers() {
        console.log('--- setting inner Containers ---');
        console.log(this.outerContainer.maxWidth / this.innerContainer.width);
        // determine the amount of container needed
        var containerAmount = Math.ceil(this.outerContainer.maxWidth / this.innerContainer.width) + 1;
        console.log('container needed: ', containerAmount);

        let containerHTML = '';

        // create each needed container
        for (let i = 0; i < containerAmount; i++) {
            let elementsHTML = '';
            let containerSelector = `inf-slider__inner-container--${i}`;

            // loop through the items specified inside this.elements and add them to elements html
            for (let item of this.elements.items) {
                console.log('item: ', item);
                // elementsHTML += `
                //     <div class="inf-slider__slide">${item.content}</div>
                // `
                // elementsHTML += `
                //     <div class="inf-slider__slide">${item.content}</div>
                // `
            }
            // append the elements HTML to the container HTML, specify the correct left property
            containerHTML = `
                <div class="${this.innerContainer.selector.replaceAll('.','')} ${containerSelector}" style="transform:translate(${this.innerContainer.width * i}px, -50%)">
                    ${elementsHTML}
                </div>
            `
        //     containerHTML = `
        //     <div class="${this.innerContainer.selector.replaceAll('.','')} ${containerSelector}">
        //         ${elementsHTML}
        //     </div>
        // `

            // add each container to the container array
            this.innerContainer.array.push({
                containerHTML: containerHTML,
                containerSelector: containerSelector
            })
        };
        console.log(this.innerContainer.array);
    }

    insertCSS() {
        console.log('--- inserting CSS ---');
        var styleTag = document.createElement('style');
        var sliderCSS = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

        ${this.outerContainer.selector} {
            border: ${this.sliderControls.developmentMode ? '1px solid limegreen' : '' };
            position: relative;
            width: 90%;
            height: ${this.outerContainer.height}px;
            max-width: ${this.outerContainer.maxWidth}px;
            margin: 0 auto;
            padding: ${this.outerContainer.padding}px,
            overflow: hidden; display: grid;
        }

        .inf-slider__show-title-wrapper {
            display: block;
            text-align: ${this.title.textAlign};
        }

        .inf-slider__hide-title-wrapper {
            display: none;
        }

        .inf-slider__title {
            color: ${this.title.colorCode};
            font-size: ${this.title.fontSize};
            font-family: ${this.title.fontFamily || "'Open Sans', sans-serif"};
            padding: 20px;
        }

        ${this.innerContainer.selector}-wrapper {
            align-items: start;
            position: relative;
            height: 100%;
            width: ${this.innerContainer.width + 100};
        }
        
        ${this.innerContainer.selector} {
            position: absolute;
            top: 0;
            display: grid;
            grid-template-columns: repeat(${this.elements.items.length}, 1fr);
            width: ${this.innerContainer.width};
            border: ${this.sliderControls.developmentMode ? 'red 1px solid' : ''};
        }
        
        .inf-slider__slide {
            display: inline-block;
            background: #f2f2f2;
            margin: ${this.elements.margin}px;
            padding: ${this.elements.padding}px;
            width: ${this.elements.width}px;
            height: ${this.elements.width * 2};
            font-family: ${this.title.fontFamily || "'Open Sans', sans-serif"};
        }
        `;
        styleTag.innerHTML = sliderCSS;
        document.head.appendChild(styleTag);
    }

    insertHTML() {
        console.log('--- inserting HTML ---');
        var innerSliderHTML = '';
        // add title
        this.outerContainer.element.innerHTML += `
        <div class=${this.title.text ? 'inf-slider__show-title-wrapper' : 'inf-slider__hide-title-wrapper'}>
            <h1 class="inf-slider__title">${this.title.text}</h1>
        </div>
        `
        // add container
        for (let container of this.innerContainer.array) {
            innerSliderHTML += container.containerHTML
        }
        console.log(innerSliderHTML);
        this.outerContainer.element.innerHTML += `
        <div class="${this.innerContainer.selector.replaceAll('.', '')}-wrapper">
            ${innerSliderHTML}
        </div>
        `
        console.log(this.outerContainer.element.innerHTML)
    }

    startAnimation() {
        console.log('starting animation');
        let outerContainerLeft = this.outerContainer.element.offsetLeft;
        // get a reference to all DOM inner containers
        let allContainers = document.querySelectorAll(this.innerContainer.selector);
        console.log(allContainers);
        // get an array of steps for each item in the containers array
        let steps = [];
        for (let i = 0; i < allContainers.length; i++) {
            // steps.push(1);
            steps.push(this.innerContainer.width * i)
        }
        console.log(steps);
        this.interval = setInterval(() => {
            for (let i = 0; i < allContainers.length; i++) {
                // console.log('interval ', i);
                // move each container to the left or right
                let containerRight = allContainers[i].getBoundingClientRect().right;
                let containerLeft = allContainers[i].getBoundingClientRect().left;
                // console.log('container ', i, containerRight, containerLeft);
                // console.log(allContainers[i].style.transform);
                // if container outside of parent container, reset steps and move to opposite direction
                if (containerRight < outerContainerLeft) {
                    console.log('changing now: container ', i);
                    steps[i] = this.innerContainer.width * (allContainers.length - 1);
                    console.log(steps, steps[i]);
                    allContainers[i].style.transform = `translate(${steps[i]}px, -50%)`;
                    console.log(allContainers[i].style.transform)
                }

                // move each container to the right
                // this.moveDirection === 'left' ? steps[i] -= 1 
                //     : this.moveDirection === 'right' ? steps[i] += 1 : '';
                // let newTransformProperty = this.innerContainerWidth * (i) + steps[i];
                steps[i] -= 1;
                allContainers[i].style.transform = `translate(${steps[i]}px, -50%)`;
            }
        }, 25)
    }

    init() {
        this.setOuterContainer();
        this.setInnerContainerWidth();
        this.setAllInnerContainers();
        this.insertCSS();
        this.insertHTML();
        // this.sliderControls.autoStart === true ? this.startAnimation() : '';
    }
}

var sliderConfig = {
    sliderControls: {
        autoStart: false,
        moveDirection: 'left', // left or right
        interval: 50,
        step: 1,
        developmentMode: true,
    },
    outerContainer: {
        selector: '.inf-slider__outer-container',
        height: 220,
        margin: '0 auto',
        padding: 20,
        maxWidth: 1200,
    },
    title: {
        text: 'As seen in',
        fontSize: 74,
        fontFamily: "'Open Sans', sans-serif",
        colorCode: '#fff',
        textAlign: 'center',
    },
    elements: {
        width: 70, // should always be at least 2 times padding
        margin: 20,
        padding: 30,
        items:
        [
            {src: '/images/new-york-times-logo.png', content: '1'},
            {src: '', content: '2'},
            {src: '', content: '3'},
            {src: '', content: '4'},
            {src: '', content: '5'},
            {src: '', content: '6'},
            {src: '', content: '7'}
        ]
    }
}

var logoSlider = new InfiniteSlider(sliderConfig);

//             <div class="slider__slide">1</div>
{/* <div class="slider__slide">2</div>
<div class="slider__slide">3</div>
<div class="slider__slide">4</div>
<div class="slider__slide">5</div>
<div class="slider__slide">6</div>
<div class="slider__slide">7</div>
<div class="slider__slide">8</div>
<div class="slider__slide">9</div>
<div class="slider__slide">10</div> */}