const link = $('.button-write-us');
const popupForm = $('.modal-write-us');
const closeForm = $('.close-form');
let form = $('.modal-write-us-form');
let login = $('[name=name]');
let email = $('[name=email]');
let comment = $('[name=user-comment]');

let storageLogin = '';
let storageEmail = '';

let isSupportStorageLogin = true;

try {
    storageLogin = localStorage.getItem('login');
} catch (err) {
    isSupportStorageLogin = false;
}

let isSupportStorageEmail = true;

try {
    storageEmail = localStorage.getItem('email');
} catch (err) {
    isSupportStorageEmail = false;
}

///////////////////////////////////////////////////////////////////////////////// Напишите нам

link.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по ссылке напишите нам');
    popupForm.addClass('js-modal-show');
    if (storageLogin) {
        login.value = storageLogin;
        email.focus();
        email.value = storageEmail;
        comment.focus()
    } else {
        login.focus()
    }
});

closeForm.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по крестику закрыть');
    popupForm.removeClass('js-modal-show');
    popupForm.removeClass('js-modal-error');
});

form.on('submit', function (evt) {
    if (!login.value || !email.value || !comment.value) {
        evt.preventDefault();
        console.log('Нужно заполнить форму!!!');
        popupForm.removeClass('js-modal-error');
        popupForm.offsetWidth = popupForm.offsetWidth;
        popupForm.addClass('js-modal-error');
    } else {
        if (isSupportStorageLogin) {
            localStorage.setItem('login', login.value);
        }
        if (isSupportStorageEmail) {
            localStorage.setItem('email', email.value);
        }
    }
});

$(window).on('keydown', function (evt) {
    if (evt.keyCode === 27) {
        if (popupForm.hasClass('js-modal-show')) {
            evt.preventDefault();
            popupForm.removeClass('js-modal-show');
            popupForm.removeClass('js-modal-error');
        }
    }
});

///////////////////////////////////////////////////////////////////////////////// Карта

const mapImg = $('.map-img');
const map = $('.map-popup');
const closeMap = $('.close-map');

mapImg.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по мини-карте');
    map.addClass('js-modal-show');
});

closeMap.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по крестику закрыть');
    map.removeClass('js-modal-show');
});

$(window).on('keydown', function (evt) {
    if (evt.keyCode === 27) {
        if (map.hasClass('js-modal-show')) {
            evt.preventDefault();
            map.removeClass('js-modal-show');
        }
    }
});

///////////////////////////////////////////////////////////////////////////////// Покупка товара

const cart = $('.modal-cart');
const buy = $('.button-buy');
const basket = $('.basket');
const closeCart = $('.close-cart');
const continueBuy = $('.modal-cart-button-continue');
const order = $('.modal-cart-button-buy');
const basketQuantity = $('.js-basket-quantity');
let basketCount = 0;

basketQuantity.text(basketCount + '');

buy.click(function (evt) {
    evt.preventDefault();
    console.log('Клик по кнопки купить');
    cart.addClass('js-modal-show');
    basket.addClass('color-red');
    basketCount++;
    basketQuantity.text(basketCount + '');
});

closeCart.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по крестику закрыть');
    cart.removeClass('js-modal-show');
});

order.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по кнопке оформить заказ');
    cart.removeClass('js-modal-show');
});

continueBuy.on('click', function (evt) {
    evt.preventDefault();
    console.log('Клик по кнопке продолжить покупки');
    cart.removeClass('js-modal-show');
});

$(window).on('keydown', function (evt) {
    if (evt.keyCode === 27) {
        if (cart.hasClass('js-modal-show')) {
            evt.preventDefault();
            cart.removeClass('js-modal-show');
        }
    }
});

///////////////////////////////////////////////////////////////////////////////// Добавление в закладки

const btnBookmark = $('.button-bookmark');
const bookmark = $('.bookmark');
let bookmarkQuantity = $('.js-bookmark-quantity');
let bookmarkCount = 0;

bookmarkQuantity.text(bookmarkCount + '');

btnBookmark.click(function (evt) {
    evt.preventDefault();
    console.log('Клик по кнопке в закладки');
    bookmark.addClass('color-red');
    bookmarkCount++;
    bookmarkQuantity.text(bookmarkCount + '');
});

///////////////////////////////////////////////////////////////////////////////// Сортировка карточек товаров

const list = $('.product-list');
let items = list.children();
let itemsArr = [];
const upPrice = $('.sorting-price-up');
const downPrice = $('.sorting-price-down');
const abcSort = $('.sorting-abc');
const abcSortRevers = $('.sorting-abc-revers');

function getArr(el) {
    itemsArr = [];
    el.addClass('active');
    for (var i = 0; i < items.length; ++i) {
        itemsArr.push(items[i]);
    }
}

function sortPrice() {
    itemsArr.sort(function (a, b) {
        if (parseFloat(a.getAttribute('data-price')) === parseFloat(b.getAttribute('data-price'))) {
            return 0;
        } else if (parseFloat(a.getAttribute('data-price')) > parseFloat(b.getAttribute('data-price'))) {
            if (upPrice.hasClass('active')) {
                return 1;
            } else if (downPrice.hasClass('active')) {
                return -1;
            }
        } else if (parseFloat(a.getAttribute('data-price')) < parseFloat(b.getAttribute('data-price'))) {
            if (upPrice.hasClass('active')) {
                return -1;
            } else if (downPrice.hasClass('active')) {
                return 1;
            }
        }
    });
}

function sortAbc() {
    itemsArr.sort(function (a, b) {
        if (a.children[1].children[0].children[0].textContent === b.children[1].children[0].children[0].textContent) {
            return 0;
        } else if (a.children[1].children[0].children[0].textContent > b.children[1].children[0].children[0].textContent) {
            if (abcSort.hasClass('active')) {
                return 1;
            } else if (abcSortRevers.hasClass('active')) {
                return -1;
            }
        } else if (a.children[1].children[0].children[0].textContent < b.children[1].children[0].children[0].textContent) {
            if (abcSort.hasClass('active')) {
                return -1;
            } else if (abcSortRevers.hasClass('active')) {
                return 1;
            }
        }
    })
}

function embedsNewList(arr) {
    for (let i = 0; i < arr.length; ++i) {
        list.append(arr[i]);
    }
}

upPrice.on('click', function () {
    downPrice.removeClass('active');
    abcSort.removeClass('active');
    abcSortRevers.removeClass('active');
    itemsArr = [];
    getArr(upPrice);
    sortPrice();
    embedsNewList(itemsArr);
});

downPrice.on('click', function () {
    upPrice.removeClass('active');
    abcSort.removeClass('active');
    abcSortRevers.removeClass('active');
    itemsArr = [];
    getArr(downPrice);
    sortPrice();
    embedsNewList(itemsArr);
});

abcSort.on('click', function () {
    downPrice.removeClass('active');
    upPrice.removeClass('active');
    abcSortRevers.removeClass('active');
    itemsArr = [];
    getArr(abcSort);
    sortAbc();
    embedsNewList(itemsArr);
});

abcSortRevers.on('click', function () {
    upPrice.removeClass('active');
    abcSort.removeClass('active');
    downPrice.removeClass('active');
    itemsArr = [];
    getArr(abcSortRevers);
    sortAbc();
    embedsNewList(itemsArr);
});

///////////////////////////////////////////////////////////////////////////////// Range jquery slider

const INITIAL_RANGE_VALUES = [3000, 95000];
const MIN_RANGE = 0;
const MAX_RANGE = 100000;
let itemsArrRange = [];
const headerPrice = $('.js-filter-header');

$('.js-price-range').slider({
    range: true,
    min: MIN_RANGE,
    max: MAX_RANGE,
    values: INITIAL_RANGE_VALUES,
    slide: function (event, ui) {
        $('.js-price-min').val(ui.values[0]);
        $('.js-price-max').val(ui.values[1]);
        setHandleValues(ui.values);
    }
});

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function sortsProductsByRange() {
    getArr(headerPrice);

    for (let i = 0; i < itemsArr.length; ++i) {
        if (itemsArr[i].getAttribute('data-price') >= $('.js-price-range').slider('values', 0) && itemsArr[i].getAttribute('data-price') <= $('.js-price-range').slider('values', 1)) {
            itemsArrRange.push(itemsArr[i]);
            itemsArr[i].style.display = 'flex';
        } else {
            itemsArrRange.push(itemsArr[i]);
            itemsArr[i].style.display = 'none';
        }
    }
    clearList();
    embedsNewList(itemsArrRange);
    itemsArrRange = [];
}

function getRangeValues(numberValue) {
    return $('.js-price-range').slider('values', numberValue);
}

function setValueToInputs() {
    $('.js-price-min').attr('value', getRangeValues(0));
    $('.js-price-max').attr('value', getRangeValues(1));
}

function setHandleValues(values) {
    $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(values[0] + '₽');
    $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(values[1] + '₽');
}

setValueToInputs();

$('.js-price-min').change(function () {
    let minValue = $('.js-price-min').val();
    let maxValue = $('.js-price-max').val();
    if (Number(minValue) <= Number(maxValue)) {
        if (Number(minValue) < MIN_RANGE) {
            minValue = MIN_RANGE;
            $('.js-price-min').val(minValue);
        }
        $('.js-price-range').slider('values', 0, minValue);
        $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(minValue + '₽');
        sortsProductsByRange();
    } else {
        $('.js-price-range').slider('values', 0, maxValue);
        $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(maxValue + '₽');
        $('.js-price-min').val(maxValue);
        sortsProductsByRange();
    }
});

$('.js-price-max').change(function () {
    let minValue = $('.js-price-min').val();
    let maxValue = $('.js-price-max').val();
    if (Number(maxValue) >= Number(minValue)) {
        if (Number(maxValue) > MAX_RANGE) {
            maxValue = MAX_RANGE;
            $('.js-price-max').val(maxValue);
        }
        $('.js-price-range').slider('values', 1, maxValue);
        $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(maxValue + '₽');
        sortsProductsByRange();
    } else {
        $('.js-price-range').slider('values', 1, minValue);
        $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(minValue + '₽');
        $('.js-price-max').val(minValue);
        sortsProductsByRange();
    }
});

setTimeout(function () {
    let handleValue = $('<span class="ui-slider-handle-value"></span>');
    let handleValueMin = handleValue.text($('.js-price-range').slider('values', 0) + '₽');
    $('.js-price-range .ui-slider-handle:nth-child(2)').append(handleValueMin);
});

setTimeout(function () {
    let handleValue = $('<span class="ui-slider-handle-value"></span>');
    let handleValueMax = handleValue.text($('.js-price-range').slider('values', 1) + '₽');
    $('.js-price-range .ui-slider-handle:nth-child(3)').append(handleValueMax);
});

$('.js-clear-all').on('click', function () {
    $('.js-price-range').slider('values', INITIAL_RANGE_VALUES);
    setValueToInputs();
    setHandleValues(INITIAL_RANGE_VALUES);
});
