var link = document.querySelector(".button-write-us");
var popupform = document.querySelector(".modal-write-us");
var closeform = document.querySelector(".close-form");
var form = popupform.querySelector(".modal-write-us-form");
var login = popupform.querySelector("[name=name]");
var email = popupform.querySelector("[name=email]");
var comment = popupform.querySelector("[name=user-comment]");
var storagelogin = localStorage.getItem("login");
var storageemail = localStorage.getItem("email");


var isSupportStoragelogin = true;
var storagelogin = "";


try {
  storagelogin = localStorage.getItem("login");
} catch (err) {
  isSupportStoragelogin = false;
}

var isSupportStorageemail = true;
var storageemail = "";

try {
  storageemail = localStorage.getItem("email");
} catch (err) {
  isSupportStorageemail = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по ссылке напишите нам");
  popupform.classList.add("modal-show");

  if (storagelogin) {
    login.value = storagelogin;
    email.focus();
  } else {
    login.focus()
  }

  if (storageemail) {
    email.value = storageemail;
    comment.focus()
  } else {
    email.focus()
  }
});

closeform.addEventListener("click", function (evt) {
  evt.preventDefault();
  console.log("Клик по крестику закрыть");
  popupform.classList.remove("modal-show");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value || !comment.value) {
    evt.preventDefault();
    console.log("Нужно заполнить форму!!!");
  } else {
    if (isSupportStoragelogin) {
      localStorage.setItem("login", login.value);
    }
    if (isSupportStorageemail) {
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupform.classList.contains("modal-show")) {
      evt.preventDefault();
      popupform.classList.remove("modal-show");
    }
  }
});
