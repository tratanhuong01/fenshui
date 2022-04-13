const orderUlLi = document.getElementsByClassName('order__ul--li');
const orderGroup = document.querySelector('.order__group');
const orderPrice = document.querySelector('.order__price');
const orderColor = document.querySelector('.order__color');
const orderValid = document.querySelector('.order__valid');
const orderPosition = document.querySelector('.order__position');
const listOrder = [orderGroup, orderPrice, orderColor, orderValid, orderPosition];


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