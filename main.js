let price = document.querySelector(".price-input");
let addBtn = document.querySelector("button");
let selectClient = document.querySelector("#select-client");
let clientOne = document.querySelector(".client-one .client-income span");
let clientTwo = document.querySelector(".client-Two .client-income span");
let invalidMsg = document.querySelector(".invalid-msg");
let totalPrice = document.querySelector(".total-price span");
let clientOneName = document.querySelector(".client-one .client-name span");
let clientTwoName = document.querySelector(".client-two .client-name span");
let showEditNameBtn = document.querySelectorAll(".client-name i");
let editNameParent = document.querySelector(".change-name");
let editNameValue = document.querySelector(".change-name input");
let editeNameBtn = document.querySelector(".change-name button");
let overlay = document.querySelector(".overlay");
let exitChangeName = document.querySelector(".change-name span");

let priceOne = window.localStorage.getItem("price-one");
let priceTwo = window.localStorage.getItem("price-two");
let totalPriceFromLocal = window.localStorage.getItem("total-price");
let clientOneNameFromLocal = window.localStorage.getItem("client-one-name");
let clientTwoNameFromLocal = window.localStorage.getItem("client-two-name");

addBtn.onclick = function () {
  if (price.value != "") {
    if (selectClient.value == "client 1") {
      if (clientOne.textContent == 0) {
        clientOne.textContent = price.value;
      } else {
        clientOne.textContent =
          Number(clientOne.textContent) + Number(price.value);
      }

      window.localStorage.setItem("price-one", clientOne.textContent);
      invalidMsg.classList.remove("show");
      price.value = "";
      calcTotal();
    } else if (selectClient.value == "client 2") {
      if (clientTwo.textContent == 0) {
        clientTwo.textContent = price.value;
      } else {
        clientTwo.textContent =
          Number(clientTwo.textContent) + Number(price.value);
      }
      window.localStorage.setItem("price-two", clientTwo.textContent);

      invalidMsg.classList.remove("show");
      price.value = "";
      calcTotal();
    } else {
      invalidMsg.textContent = "Please Select Your Client";
      invalidMsg.classList.add("show");
    }
  } else {
    invalidMsg.textContent = "Please Enter Income";
    invalidMsg.classList.add("show");
  }
};

function calcTotal() {
  totalPrice.textContent =
    Number(clientOne.textContent) + Number(clientTwo.textContent);
  window.localStorage.setItem("total-price", totalPrice.textContent);
}

if (priceTwo && priceOne && totalPriceFromLocal) {
  clientOne.textContent = priceOne;
  clientTwo.textContent = priceTwo;
  totalPrice.textContent = totalPriceFromLocal;
}

showEditNameBtn.forEach((el) => {
  el.addEventListener("click", function (e) {
    editNameParent.classList.toggle("show");
    overlay.classList.toggle("show");
    editeNameBtn.onclick = function () {
      if (editNameValue.value != "") {
        if (e.target.parentElement.getAttribute("id") == 1) {
          window.localStorage.setItem("client-one-name", editNameValue.value);
        } else {
          window.localStorage.setItem("client-two-name", editNameValue.value);
        }
        e.target.parentElement.textContent = editNameValue.value;
        editNameParent.classList.toggle("show");
        overlay.classList.toggle("show");
        editNameValue.value = "";
      }
    };
  });
});

exitChangeName.onclick = function () {
  editNameParent.classList.remove("show");
  overlay.classList.remove("show");
};

if (clientOneName && clientTwoName) {
  clientOneName.textContent = clientOneNameFromLocal;
  clientTwoName.textContent = clientTwoNameFromLocal;
}
