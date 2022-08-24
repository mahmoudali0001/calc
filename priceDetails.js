let detailsParent = document.querySelector(".details-parent");
let totalPrice = document.querySelector(".total-price span");
let spendInput = document.querySelector(".spend");
let spendBtn = document.querySelector(".neg-spend");
let priceAfterSpend = document.querySelector(".price-after-spend");

let paymentData = [];

if (localStorage.getItem("payment-details") !== null) {
  paymentData = JSON.parse(localStorage.getItem("payment-details"));
}

if (localStorage.getItem("total-price") != null) {
  totalPrice.innerHTML = localStorage.getItem("total-price");
}

paymentData.forEach((e, i) => {
  let paymentParent = document.createElement("div");
  let dateSpan = document.createElement("span");
  let nameSpan = document.createElement("span");
  let priceSpan = document.createElement("span");

  let dateText = document.createTextNode(paymentData[i].date);
  let nameText = document.createTextNode(paymentData[i].name);
  let priceText = document.createTextNode(paymentData[i].price);

  paymentParent.className = "details";
  nameSpan.style.width = "90px";

  dateSpan.appendChild(dateText);
  nameSpan.appendChild(nameText);
  priceSpan.appendChild(priceText);

  paymentParent.appendChild(nameSpan);
  paymentParent.appendChild(priceSpan);
  paymentParent.appendChild(dateSpan);

  detailsParent.appendChild(paymentParent);
});

if (localStorage.getItem("total-price") != null) {
  totalPrice.innerHTML = localStorage.getItem("total-price");
}

if (localStorage.getItem("price-after-spend") !== null) {
  priceAfterSpend.innerHTML = localStorage.getItem("price-after-spend");
} else {
  priceAfterSpend.innerHTML = totalPrice.innerHTML;
}

spendBtn.onclick = function () {
  if (spendInput.value != "") {
    priceAfterSpend.innerHTML =
      Number(priceAfterSpend.innerHTML) - Number(spendInput.value);

    localStorage.setItem("price-after-spend", priceAfterSpend.innerHTML);

    spendInput.value = "";
  }
};
