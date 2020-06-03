var link = document.querySelector(".button-write-us");
var popupForm = document.querySelector(".modal-write-us");
var closeForm = document.querySelector(".close-form");
if (popupForm) {
    var form = popupForm.querySelector(".modal-write-us-form");
    var login = popupForm.querySelector("[name=name]");
    var email = popupForm.querySelector("[name=email]");
    var comment = popupForm.querySelector("[name=user-comment]");
}
var storageLogin = "";
var storageEmail = "";

var isSupportStorageLogin = true;

try {
    storageLogin = localStorage.getItem("login");
} catch (err) {
    isSupportStorageLogin = false;
}

var isSupportStorageEmail = true;

try {
    storageEmail = localStorage.getItem("email");
} catch (err) {
    isSupportStorageEmail = false;
}

// Напишите нам

if (link) {
    link.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по ссылке напишите нам");
        popupForm.classList.add("js-modal-show");
        if (storageLogin) {
            login.value = storageLogin;
            email.focus();
            email.value = storageEmail;
            comment.focus()
        } else {
            login.focus()
        }
    });

    closeForm.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по крестику закрыть");
        popupForm.classList.remove("js-modal-show");
        popupForm.classList.remove("js-modal-error");
    });

    form.addEventListener("submit", function (evt) {
        if (!login.value || !email.value || !comment.value) {
            evt.preventDefault();
            console.log("Нужно заполнить форму!!!");
            popupForm.classList.remove("js-modal-error");
            popupForm.offsetWidth = popupForm.offsetWidth;
            popupForm.classList.add("js-modal-error");
        } else {
            if (isSupportStorageLogin) {
                localStorage.setItem("login", login.value);
            }
            if (isSupportStorageEmail) {
                localStorage.setItem("email", email.value);
            }
        }
    });

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            if (popupForm.classList.contains("js-modal-show")) {
                evt.preventDefault();
                popupForm.classList.remove("js-modal-show");
                popupForm.classList.remove("js-modal-error");
            }
        }
    });
}

// Карта

var mapImg = document.querySelector(".map-img");
var map = document.querySelector(".map-popup");

if (map) {
    var closeMap = map.querySelector(".close-map");

    mapImg.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по мини-карте");
        map.classList.add("js-modal-show");
    });

    closeMap.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по крестику закрыть");
        map.classList.remove("js-modal-show");
    });

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            if (map.classList.contains("js-modal-show")) {
                evt.preventDefault();
                map.classList.remove("js-modal-show");
            }
        }
    });
}

// Покупка товара

var cart = document.querySelector(".modal-cart");
var buy = document.querySelectorAll(".button-buy");
var basket = document.querySelector(".basket");

if (cart) {
    var closeCart = cart.querySelector(".close-cart");
    var continueBuy = cart.querySelector(".modal-cart-button-continue");
    var order = cart.querySelector(".modal-cart-button-buy");
    var basketQuantity = document.querySelector(".js-basket-quantity");
    var basketCount = 0;

    basketQuantity.textContent = basketCount.toString();

    for (var i = 0; i < buy.length; i++) {
        buy[i].addEventListener("click", function (evt) {
            evt.preventDefault();
            console.log("Клик по кнопки купить");
            cart.classList.add("js-modal-show");
            basket.classList.add("color-red");
            basketCount++;
            basketQuantity.textContent = basketCount.toString();
        });
    }

    closeCart.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по крестику закрыть");
        cart.classList.remove("js-modal-show");
    });

    order.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по кнопке оформить заказ");
        cart.classList.remove("js-modal-show");
    });

    continueBuy.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по кнопке продолжить покупки");
        cart.classList.remove("js-modal-show");
    });

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            if (cart.classList.contains("js-modal-show")) {
                evt.preventDefault();
                cart.classList.remove("js-modal-show");
            }
        }
    });
}

// Добавление в закладки

var btnBookmark = document.querySelectorAll(".button-bookmark");
var bookmark = document.querySelector(".bookmark");
var bookmarkQuantity = document.querySelector(".js-bookmark-quantity");
var bookmarkCount = 0;

bookmarkQuantity.textContent = bookmarkCount.toString();

for (var b = 0; b < btnBookmark.length; b++) {
    btnBookmark[b].addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log("Клик по кнопке в закладки");
        bookmark.classList.add("color-red");
        bookmarkCount++;
        bookmarkQuantity.textContent = bookmarkCount.toString();
    });
}

// Сортировка карточек товаров

var list = document.querySelector('.product-list');
var items = list.childNodes;
var itemsArr = [];
var upPrice = document.querySelector('.sorting-price-up');
var downPrice = document.querySelector('.sorting-price-down');
var abcSort = document.querySelector('.sorting-abc');
var abcSortRevers = document.querySelector('.sorting-abc-revers');

function getArr(el) {
    el.classList.add('active');
    for (var i = 0; i < items.length; ++i) {
        itemsArr.push(items[i]);
    }
}

function sortPrice() {
    itemsArr.sort(function (a, b) {
        if (parseFloat(a.getAttribute('price')) === parseFloat(b.getAttribute('price'))) {
            return 0;
        } else if (parseFloat(a.getAttribute('price')) > parseFloat(b.getAttribute('price'))) {
            if (upPrice.classList.contains('active')) {
                return 1;
            } else if (downPrice.classList.contains('active')) {
                return -1;
            }
        } else if (parseFloat(a.getAttribute('price')) < parseFloat(b.getAttribute('price'))) {
            if (upPrice.classList.contains('active')) {
                return -1;
            } else if (downPrice.classList.contains('active')) {
                return 1;
            }
        }
    });
}

function sortAbc() {
    itemsArr.sort(function (a, b) {
        if (a.childNodes[1].childNodes[0].childNodes[0].textContent === b.childNodes[1].childNodes[0].childNodes[0].textContent) {
            return 0;
        } else if (a.childNodes[1].childNodes[0].childNodes[0].textContent > b.childNodes[1].childNodes[0].childNodes[0].textContent) {
            if (abcSort.classList.contains('active')) {
                return 1;
            } else if (abcSortRevers.classList.contains('active')) {
                return -1;
            }
        } else if (a.childNodes[1].childNodes[0].childNodes[0].textContent < b.childNodes[1].childNodes[0].childNodes[0].textContent) {
            if (abcSort.classList.contains('active')) {
                return -1;
            } else if (abcSortRevers.classList.contains('active')) {
                return 1;
            }
        }
    })
}

function embedsNewList() {
    for (var i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
}

upPrice.addEventListener('click', function () {
    downPrice.classList.remove('active');
    abcSort.classList.remove('active');
    abcSortRevers.classList.remove('active');
    itemsArr = [];
    getArr(upPrice);
    sortPrice();
    embedsNewList();
});

downPrice.addEventListener('click', function () {
    upPrice.classList.remove('active');
    abcSort.classList.remove('active');
    abcSortRevers.classList.remove('active');
    itemsArr = [];
    getArr(downPrice);
    sortPrice();
    embedsNewList();
});

abcSort.addEventListener('click', function () {
    downPrice.classList.remove('active');
    upPrice.classList.remove('active');
    abcSortRevers.classList.remove('active');
    itemsArr = [];
    getArr(abcSort);
    sortAbc();
    embedsNewList();
});

abcSortRevers.addEventListener('click', function () {
    upPrice.classList.remove('active');
    abcSort.classList.remove('active');
    downPrice.classList.remove('active');
    itemsArr = [];
    getArr(abcSortRevers);
    sortAbc();
    embedsNewList();
});

// Range jquery slider

var INITIAL_RANGE_VALUES = [5000, 95000];
var MIN_RANGE = 0;
var MAX_RANGE = 100000;

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
    var minValue = $('.js-price-min').val();
    var maxValue = $('.js-price-max').val();
    if (Number(minValue) <= Number(maxValue)) {
        if (Number(minValue) < MIN_RANGE) {
            minValue = MIN_RANGE;
            $('.js-price-min').val(minValue);
        }
        $('.js-price-range').slider('values', 0, minValue);
        $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(minValue + '₽');
    } else {
        $('.js-price-range').slider('values', 0, maxValue);
        $('.ui-slider-handle:nth-child(2) .ui-slider-handle-value').text(maxValue + '₽');
        $('.js-price-min').val(maxValue);
    }
});

$('.js-price-max').change(function () {
    var minValue = $('.js-price-min').val();
    var maxValue = $('.js-price-max').val();
    if (Number(maxValue) >= Number(minValue)) {
        if (Number(maxValue) > MAX_RANGE) {
            maxValue = MAX_RANGE;
            $('.js-price-max').val(maxValue);
        }
        $('.js-price-range').slider('values', 1, maxValue);
        $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(maxValue + '₽');
    } else {
        $('.js-price-range').slider('values', 1, minValue);
        $('.ui-slider-handle:nth-child(3) .ui-slider-handle-value').text(minValue + '₽');
        $('.js-price-max').val(minValue);
    }
});

setTimeout(function () {
    var handleValue = $('<span class="ui-slider-handle-value"></span>');
    var handleValueMin = handleValue.text($('.js-price-range').slider('values', 0) + '₽');
    $('.js-price-range .ui-slider-handle:nth-child(2)').append(handleValueMin);
});

setTimeout(function () {
    var handleValue = $('<span class="ui-slider-handle-value"></span>');
    var handleValueMax = handleValue.text($('.js-price-range').slider('values', 1) + '₽');
    $('.js-price-range .ui-slider-handle:nth-child(3)').append(handleValueMax);
});

$('.js-clear-all').on('click', function () {
    $('.js-price-range').slider('values', INITIAL_RANGE_VALUES);
    setValueToInputs();
    setHandleValues(INITIAL_RANGE_VALUES);
});
