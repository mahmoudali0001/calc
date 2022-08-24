let detailsParent = document.querySelector(".details-parent");
let totalPrice = document.querySelector(".total-price span");
let spendInput = document.querySelector(".spend");
let spendBtn = document.querySelector(".neg-spend");

let paymentData = JSON.parse(localStorage.getItem("payment-details"));

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

spendBtn.onclick = function () {
  if (spendInput.value != "") {
    if (totalPrice.innerHTML == "0") {
      totalPrice.innerHTML =
        Number(totalPrice.innerHTML) - Number(spendInput.value);

      localStorage.setItem("total-price", totalPrice.innerHTML);
    } else {
    }

    spendInput.value = "";
  }
};
