const modal = document.querySelector('.modal');
const modalSearch = document.querySelector('.modal__search');
const headerMenu = document.querySelector('.header__menu');
const headerMenuClose = document.querySelector('.header__menu--close');
const headerMobile = document.querySelector('.header__mobile');
const headerInputSearch = document.querySelector('.header__input--search');
const modalSearchClose = document.querySelector('.modal__search--close');

const bannerTopLeftUl = document.querySelector('.banner__top--left--ul');
const bannerTopLeftContent = document.querySelector('.banner__top--left--content');

const clickOutSide = () => {
    document.body.style = '';
    modal.classList.remove('modal__active', 'modal__black', 'modal__white');
    headerMenu.classList.remove('header__menu--show');
    modal.removeEventListener('click', clickOutSide);
    modalSearch.classList.remove('modal__search--show');
}

let isClick;
let isClickSearch;

headerMobile.addEventListener('click', () => {
    isClick ? clickOutSide() : (
        document.body.style.overflow = 'hidden',
        modal.classList.add('modal__active', 'modal__black'),
        headerMenu.classList.add('header__menu--show', 'transition-5s'),
        modal.addEventListener('click', clickOutSide)
    )
});

headerMenuClose.addEventListener('click', () => { clickOutSide() });

headerInputSearch.addEventListener('click', () => {
    isClickSearch ? clickOutSide() : (
        document.body.style.overflow = 'hidden',
        modalSearch.classList.add('modal__search--show'),
        modal.classList.add('modal__active', 'modal__white'),
        modal.addEventListener('click', clickOutSide)
    )
})

modalSearchClose.addEventListener('click', () => {
    clickOutSide();
})

window.addEventListener('resize', () => {
    window.innerWidth > 1100 && (
        clickOutSide(),
        headerMenu.classList.remove('transition-5s')
    )
});

$(document).ready(function () {
    $('.list-product__wrapper').slick({
        dots: true,
        appendDots: $('.list-product__pagination'),
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

if (bannerTopLeftUl && bannerTopLeftContent) {
    [...bannerTopLeftUl.children].forEach((el, index) => {
        el.addEventListener('click', () => {
            [...bannerTopLeftUl.children].forEach(el_ => {
                el_.classList.remove('banner__top--left--active');
            });
            el.classList.add('banner__top--left--active');
            bannerTopLeftContent.style.transform = `translateX(-${index * 100}%)`
        });
    })
}


