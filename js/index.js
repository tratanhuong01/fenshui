const modal = document.querySelector('.modal');
const modalSearch = document.querySelector('.modal__search');
const headerMenu = document.querySelector('.header__menu');
const headerMenuClose = document.querySelector('.header__menu--close');
const headerMobile = document.querySelector('.header__mobile');
const headerInputSearch = document.querySelector('.header__input--search');
const modalSearchClose = document.querySelector('.modal__search--close');

const orderUlLi = document.getElementsByClassName('order__ul--li');
const orderGroup = document.querySelector('.order__group');
const orderPrice = document.querySelector('.order__price');
const orderColor = document.querySelector('.order__color');
const orderValid = document.querySelector('.order__valid');
const orderPosition = document.querySelector('.order__position');
const listOrder = [orderGroup, orderPrice, orderColor, orderValid, orderPosition];

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

if (orderUlLi.length > 0) {
    const clickOutSideOrder = (e) => {
        if (!document.querySelector('.order').contains(e.target)) {
            listOrder.forEach((el_) => {
                el_.style.display = 'none';
            });
        }
    }
    [...orderUlLi].forEach((el, index) => {
        el.addEventListener('click', async (event) => {
            event.stopPropagation();
            if (listOrder[index].style.display === 'none') {
                if (el.children[2]) {
                    if (!el.children[2].contains(event.target)) {
                        listOrder[index].style.display = 'block';
                    }
                }
                [...listOrder[index].children].forEach(el__ => {
                    if (el__.nodeName === "BUTTON") {
                        el__.addEventListener('click', () => {
                            listOrder[index].style.display = 'none';
                        })
                    }
                });
                window.addEventListener('click', clickOutSideOrder)
            }
            else {
                if (el.children[2]) {
                    if (!el.children[2].contains(event.target)) {
                        listOrder[index].style.display = 'none';
                        window.removeEventListener('click', clickOutSideOrder);
                    }
                }
            }
            listOrder.forEach((el_, index_) => {
                if (index !== index_) {
                    el_.style.display = 'none';
                }
            })
        });
    })
}


