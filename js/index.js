const modal = document.querySelector('.modal');
const modalSearch = document.querySelector('.modal__search');
const headerMenu = document.querySelector('.header__menu');
const headerMenuClose = document.querySelector('.header__menu--close');
const headerMobile = document.querySelector('.header__mobile');
const headerInputSearch = document.querySelector('.header__input--search');
const listItemPagination = document.getElementsByClassName('list-product__pagination--item');
const listProductwrapperPagination = document.querySelector('.list-product__wrapper');
const indexSliderMain = document.querySelector('#index-slider-main');

const clickOutSide = () => {
    document.body.style = '';
    modal.classList.remove('modal__active');
    headerMenu.classList.remove('header__menu--show');
    modal.removeEventListener('click', clickOutSide);
}

let isClick;

headerMobile.addEventListener('click', () => {
    if (isClick) {
        clickOutSide();
    }
    else {
        document.body.style.overflow = 'hidden';
        modal.classList.add('modal__active');
        headerMenu.classList.add('header__menu--show', 'transition-5s');
        modal.addEventListener('click', clickOutSide);
    }
});

headerMenuClose.addEventListener('click', () => { clickOutSide() });

headerInputSearch.addEventListener('click', () => {
    if (isClick) {
        clickOutSide();
    }
    else {
        document.body.style.overflow = 'hidden';
        modal.classList.add('modal__active');
        modal.addEventListener('click', clickOutSide);
    }

})

if (listItemPagination) {
    let size = () => {
        if (window.innerWidth < 550) return 100;
        else if (window.innerWidth >= 550 && window.innerWidth < 768) return 50;
        else if (window.innerWidth >= 768 && window.innerWidth < 1024) return 100 / 3;
        else return 25;
    }
    [...listItemPagination].forEach((el, index) => {
        el.addEventListener('click', () => {
            indexSliderMain.value = index;
            listProductwrapperPagination.style.transform = `translateX(-${(size()) * index}%)`;
            [...listItemPagination].forEach(el_ => {
                el_.classList.remove('list-product__pagination--active');
            });
            el.classList.add('list-product__pagination--active');
        })
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
        clickOutSide();
        headerMenu.classList.remove('transition-5s');
    }
    else {

    }
})