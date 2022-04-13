function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    var size = 400;
    img = imgID
    result = resultID
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute('data-fancybox-trigger', 'gallery-image')
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = 1;
    cy = 1;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (500 * cx) + "px " + (500 * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener('mouseleave', () => {
        resultID.style.display = 'none'
    })
    img.addEventListener('mouseleave', () => {
        resultID.style.display = 'none'
    })
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        result.style.display = 'block';
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        /* Calculate the position of the lens: */
        x = pos.x - (size / 2);
        y = pos.y - (size / 2);
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - size) { x = img.width - size; }
        if (x < 0) { x = 0; }
        if (y > img.height - size) { y = img.height - size; }
        if (y < 0) { y = 0; }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

imageZoom(document.querySelector('.detail-product__left--preview__'),
    document.querySelector('.detail-product__left--preview'))

// Initialise Carousel
const mainCarousel = new Carousel(document.querySelector("#mainCarouselImage"), {
    Dots: false,
});

// const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
//     Sync: {
//         target: mainCarousel,
//         friction: 0,
//     },
//     Dots: false,
//     Navigation: false,
//     center: true,
//     slidesPerPage: 1,
//     infinite: false,
// });

// Customize Fancybox
Fancybox.bind('[data-fancybox="gallery-image"]', {
    Carousel: {
        on: {
            change: (that) => {
                mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
                    friction: 0,
                });
            },
        },
    },
    Thumbs: {
        autoStart: false,
    },
});
