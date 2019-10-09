var cart = document.querySelector(".modal-cart");
var buy = document.querySelectorAll(".button-buy");
var closecart = cart.querySelector(".close-cart");
var continuebuy = cart.querySelector(".modal-cart-button-continue");
var basket = document.querySelector(".basket");


for (var i = 0; i < buy.length; i++) {
  buy[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    console.log("Клик по кнопки купить");
    cart.classList.add("modal-show");
    basket.classList.add("color-red");
  });
}

closecart.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по крестику закрыть");
  cart.classList.remove("modal-show");
});

continuebuy.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по кнопке продолжить покупки");
  cart.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (cart.classList.contains("modal-show")) {
      evt.preventDefault();
      cart.classList.remove("modal-show");
    }
  }
});

var btnbookmark = document.querySelectorAll(".button-bookmark");
var bookmark = document.querySelector(".bookmark");

for (var b = 0; b < btnbookmark.length; b++) {

  btnbookmark[b].addEventListener("click", function (evt) {
    evt.preventDefault();
    console.log("Клик по кнопке в закладки");
    bookmark.classList.add("color-red");
  });
}
