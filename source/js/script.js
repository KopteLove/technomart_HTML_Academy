const link = $('.button-write-us');
const popupForm = $('.modal-write-us');
const closeForm = $('.close-form');
const mapImg = $('.map-img');
const map = $('.map-popup');
const closeMap = $('.close-map');
const cart = $('.modal-cart');
const buy = $('.button-buy');
const basket = $('.basket');
const closeCart = $('.close-cart');
const continueBuy = $('.modal-cart-button-continue');
const order = $('.modal-cart-button-buy');
const basketQuantity = $('.js-basket-quantity');
const btnBookmark = $('.button-bookmark');
const bookmark = $('.bookmark');
const list = $('.product-list');
const upPrice = $('.sorting-price-up');
const downPrice = $('.sorting-price-down');
const abcSort = $('.sorting-abc');
const abcSortRevers = $('.sorting-abc-revers');
const allSortBtn = $('.sorting-button');
const range = $('.js-price-range');
const INITIAL_RANGE_VALUES = [500, 5000];
const MIN_RANGE = 0;
const MAX_RANGE = 5500;
let itemsArr = [];
let bookmarkQuantity = $('.js-bookmark-quantity');
let bookmarkCount = 0;
let basketCount = 0;
let form = $('.modal-write-us-form');
let login = $('#user-name');
let email = $('#user-email');
let comment = $('#comment');

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

$(function () {
    ///////////////////////////////////////////////////////////////////////////////// Напишите нам

    link.on('click', function (evt) {
        evt.preventDefault();
        popupForm.addClass('js-modal-show');

        setTimeout(() => popupForm.addClass('open'), 800);
        if (storageLogin) {
            login.val(storageLogin);
            email.focus();
            email.val(storageEmail);
            comment.focus();
        } else {
            login.focus();
        }
    });

    closeForm.on('click', function (evt) {
        evt.preventDefault();
        popupForm.removeClass('js-modal-show js-modal-error open');
    });

    form.on('submit', function (evt) {
        if (login.val().length < 3 || !validateEmail(email.val()) || !comment.val()) {
            evt.preventDefault();
            popupForm.addClass('js-modal-error');
            setTimeout(() => popupForm.removeClass('js-modal-error'), 800);

            if(login.val().length < 3) {
                login.focus();
            } else if(!validateEmail(email.val())) {
                email.focus();
            } else {
                comment.focus();
            }
        } else {
            if (isSupportStorageLogin) {
                localStorage.setItem('login', login.val());
            }

            if (isSupportStorageEmail) {
                localStorage.setItem('email', email.val());
            }
        }
    });

    ///////////////////////////////////////////////////////////////////////////////// Карта

    mapImg.on('click', function (evt) {
        evt.preventDefault();
        map.addClass('js-modal-show');
    });

    closeMap.on('click', function (evt) {
        evt.preventDefault();
        map.removeClass('js-modal-show');
    });

    ///////////////////////////////////////////////////////////////////////////////// Покупка товара

    basketQuantity.text(basketCount + '');

    buy.click(function (evt) {
        evt.preventDefault();
        cart.addClass('js-modal-show');
        basket.addClass('color-red');
        basketCount++;
        basketQuantity.text(basketCount + '');
    });

    closeCart.on('click', function (evt) {
        evt.preventDefault();
        cart.removeClass('js-modal-show');
    });

    order.on('click', function (evt) {
        evt.preventDefault();
        cart.removeClass('js-modal-show');
    });

    continueBuy.on('click', function (evt) {
        evt.preventDefault();
        cart.removeClass('js-modal-show');
    });

    ///////////////////////////////////////////////////////////////////////////////// Добавление в закладки

    bookmarkQuantity.text(bookmarkCount + '');

    btnBookmark.click(function (evt) {
        evt.preventDefault();
        bookmark.addClass('color-red');
        bookmarkCount++;
        bookmarkQuantity.text(bookmarkCount + '');
    });

    ///////////////////////////////////////////////////////////////////////////////// Сортировка карточек товаров

    upPrice.on('click', function () {
        allSortBtn.removeClass('active');
        getArr(upPrice);
        sortPrice();
        embedsNewList(itemsArr);
    });

    downPrice.on('click', function () {
        allSortBtn.removeClass('active');
        getArr(downPrice);
        sortPrice();
        embedsNewList(itemsArr);
    });

    abcSort.on('click', function () {
        allSortBtn.removeClass('active');
        getArr(abcSort);
        sortAbc();
        embedsNewList(itemsArr);
    });

    abcSortRevers.on('click', function () {
        allSortBtn.removeClass('active');
        getArr(abcSortRevers);
        sortAbc();
        embedsNewList(itemsArr);
    });

    $('.filters-radio-item').on('change', function () {
        sortProductByPower();
    });

    $('.filters-checkbox-item').on('change', function () {
        sortProductByFirm();
    });

    range.slider({
        range: true,
        min: MIN_RANGE,
        max: MAX_RANGE,
        values: INITIAL_RANGE_VALUES,
        slide: function (event, ui) {
            $('.js-price-min').val(ui.values[0]);
            $('.js-price-max').val(ui.values[1]);
            setHandleValues(ui.values);
            sortsProductsByRange();
        }
    });

    setValueToInputs();

    $('.js-price-min').change(function () {
        let minValue = $('.js-price-min').val();
        let maxValue = $('.js-price-max').val();
        if (Number(minValue) <= Number(maxValue)) {
            if (Number(minValue) < MIN_RANGE) {
                minValue = MIN_RANGE;
                $('.js-price-min').val(minValue);
            }
            range.slider('values', 0, minValue);
            $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(minValue + '₽');
            sortsProductsByRange();
        } else {
            range.slider('values', 0, maxValue);
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
            range.slider('values', 1, maxValue);
            $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(maxValue + '₽');
            sortsProductsByRange();
        } else {
            range.slider('values', 1, minValue);
            $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(minValue + '₽');
            $('.js-price-max').val(minValue);
            sortsProductsByRange();
        }
    });

    setTimeout(function () {
        let handleValue = $('<span class="ui-slider-handle-value"></span>');
        let handleValueMin = handleValue.text(range.slider('values', 0) + '₽');
        $('.js-price-range .ui-slider-handle:nth-child(2)').append(handleValueMin);
    });

    setTimeout(function () {
        let handleValue = $('<span class="ui-slider-handle-value"></span>');
        let handleValueMax = handleValue.text(range.slider('values', 1) + '₽');
        $('.js-price-range .ui-slider-handle:nth-child(3)').append(handleValueMax);
    });

    $('.js-clear-all').on('click', function () {
        range.slider('values', INITIAL_RANGE_VALUES);
        setValueToInputs();
        setHandleValues(INITIAL_RANGE_VALUES);
    });

    $(window).on('keydown', function (evt) {
        if (evt.keyCode === 27) {
            if (popupForm.hasClass('js-modal-show')) {
                evt.preventDefault();
                popupForm.removeClass('js-modal-show');
                popupForm.removeClass('js-modal-error');
            }

            if (map.hasClass('js-modal-show')) {
                evt.preventDefault();
                map.removeClass('js-modal-show');
            }

            if (cart.hasClass('js-modal-show')) {
                evt.preventDefault();
                cart.removeClass('js-modal-show');
            }
        }
    });
});

function validateEmail(email) {
    let reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return reg.test(email);
}

function getArr(el = false) {
    let items = list.children();
    itemsArr = [];

    if (el) {
        el.addClass('active');
    }

    for (let i = 0; i < items.length; ++i) {
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

function sortsProductsByRange() {
    getArr();

    for (let i = 0; i < itemsArr.length; ++i) {
        if ($(itemsArr[i]).attr('data-price') >= range.slider('values', 0) &&
            $(itemsArr[i]).attr('data-price') <= range.slider('values', 1)) {
            $(itemsArr[i]).removeClass('hide');
        } else {
            $(itemsArr[i]).addClass('hide');
        }
    }
}

function sortProductByPower() {
    getArr();

    let powerType = $('[name="power"]:checked').val();

    if (powerType === 'all') {
        $('.product-item').removeClass('hide-power');
    } else {
        for (let i = 0; i < itemsArr.length; ++i) {
            if ($(itemsArr[i]).attr('data-power') === powerType) {
                $(itemsArr[i]).removeClass('hide-power');
            } else {
                $(itemsArr[i]).addClass('hide-power');
            }
        }
    }
}

function sortProductByFirm() {
    const firmsNames = $('.filters-checkbox-item input:checked').get().map(item => $(item).attr('name'));

    if (firmsNames.length === 0) {
        $('.product-item').removeClass('hide-firm');
    } else {
        $('.product-item').each((index, item) => {
            if (firmsNames.includes($(item).attr('data-firm'))) {
                $(item).removeClass('hide-firm');
            } else {
                $(item).addClass('hide-firm');
            }
        });
    }
}

function getRangeValues(numberValue) {
    return range.slider('values', numberValue);
}

function setValueToInputs() {
    $('.js-price-min').attr('value', getRangeValues(0));
    $('.js-price-max').attr('value', getRangeValues(1));
}

function setHandleValues(values) {
    $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(values[0] + '₽');
    $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(values[1] + '₽');
}
