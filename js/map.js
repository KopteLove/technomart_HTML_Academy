var mapimg = document.querySelector(".map-img");
var map = document.querySelector(".map-popup");
var closemap = map.querySelector(".close-map");

mapimg.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по мини-карте");
  map.classList.add("modal-show");
});

closemap.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по крестику закрыть");
  map.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (map.classList.contains("modal-show")) {
      evt.preventDefault();
      map.classList.remove("modal-show");
    }
  }
});
