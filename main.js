let priceInputForNewValue = document.querySelector(".price-input");
let addNewPriceBtn = document.querySelector("#add-new-value");
let selectClient = document.querySelector(".select-client");
let invalidMsg = document.querySelector(".invalid-msg");
let totalPrice = document.querySelector(".total-price span");

let showEditNameBtn = document.querySelectorAll(".client-name i");
let editNameParent = document.querySelector(".change-name");
let editNameValue = document.querySelector(".change-name input");
let editeNameBtn = document.querySelector(".change-name button");
let overlay = document.querySelector(".overlay");
let exitChangeName = document.querySelector(".change-name span");
let clientsParent = document.querySelector(".clients");
let addNewClient = document.querySelector(".add-new-client");

let arrayOfClients = [];
let arrayOfPaymentData = [];

if (localStorage.getItem("total-price") != null) {
  totalPrice.innerHTML = localStorage.getItem("total-price");
}

if (localStorage.getItem("payment-details") !== null) {
  arrayOfPaymentData = JSON.parse(localStorage.getItem("payment-details"));
}
if (localStorage.getItem("clients") != null) {
  arrayOfClients = JSON.parse(localStorage.getItem("clients"));
}

function addTaskToArray(clientName, classPayment) {
  // client Data
  const clients = {
    id: Date.now(),
    name: clientName,
    price: classPayment,
    completed: false,
  };
  // Push Tasks To Array Of Task
  arrayOfClients.push(clients);
  addDataToLocalStorageFrom(arrayOfClients);
}

// Step 1

function paymentDetailsDataTo(arrayOfPaymentData) {
  window.localStorage.setItem(
    "payment-details",
    JSON.stringify(arrayOfPaymentData)
  );
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Step 2

function addPaymentDetailsToArray(clientName, classPayment) {
  let dateNow = new Date();

  let paymentDate = dateNow.getDate() + " " + months[dateNow.getMonth()];
  // client Data
  const details = {
    date: paymentDate,
    name: clientName,
    price: classPayment,
  };
  // Push Tasks To Array Of Task
  arrayOfPaymentData.push(details);
  paymentDetailsDataTo(arrayOfPaymentData);
}

function clearDataFromInput() {
  priceInputForNewValue.value = "";
}
addNewClient.onclick = function () {
  editNameParent.classList.toggle("show");
  overlay.classList.toggle("show");
  editeNameBtn.innerHTML = "Add New Client";
  editeNameBtn.style.backgroundColor = "#007bff";
};

editeNameBtn.onclick = function () {
  if (editNameValue.value != "") {
    addTaskToArray(editNameValue.value, 0);
    editNameParent.classList.remove("show");
    overlay.classList.remove("show");
  }
};

function addDataToLocalStorageFrom(arrayOfClients) {
  window.localStorage.setItem("clients", JSON.stringify(arrayOfClients));
}

function clientsDataFromLocalStorage() {
  arrayOfClients.forEach((el, i) => {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let inCome = document.createElement("div");
    let clientPayment = document.createTextNode(arrayOfClients[i].price);
    let clientName = document.createTextNode(arrayOfClients[i].name);
    let clientOption = document.createElement("option");
    let clientOptionText = document.createTextNode(arrayOfClients[i].name);
    let spanIncome = document.createElement("span");
    let spanIncomeText = document.createTextNode("Total : ");

    inCome.className = "client-income";
    div.setAttribute("id", arrayOfClients[i].id);
    clientOption.setAttribute("id", arrayOfClients[i].id);
    div.className = "client-one";
    h2.className = "client-name";

    spanIncome.appendChild(spanIncomeText);
    clientOption.appendChild(clientOptionText);
    selectClient.appendChild(clientOption);
    clientsParent.appendChild(div);
    div.appendChild(h2);
    div.appendChild(inCome);

    h2.appendChild(clientName);
    inCome.appendChild(spanIncome);
    inCome.appendChild(clientPayment);
    addNewPriceBtn.addEventListener("click", function (e) {
      if (
        priceInputForNewValue.value != "" &&
        selectClient.options[selectClient.selectedIndex].text != "Select"
      ) {
        invalidMsg.classList.remove("show");

        let resultFromInput =
          Number(clientPayment.nodeValue) + Number(priceInputForNewValue.value);
        if (div.id == selectClient.options[selectClient.selectedIndex].id) {
          totalPrice.innerHTML =
            Number(totalPrice.innerHTML) + Number(priceInputForNewValue.value);
          localStorage.setItem("total-price", totalPrice.innerHTML);

          if (Number(clientPayment.nodeValue) !== 0) {
            arrayOfClients[i].price = resultFromInput;
            clientPayment.nodeValue = resultFromInput;

            addDataToLocalStorageFrom(arrayOfClients);

            addPaymentDetailsToArray(
              selectClient.options[selectClient.selectedIndex].text,
              priceInputForNewValue.value
            );

            paymentDetailsDataTo(arrayOfPaymentData);
          } else {
            arrayOfClients[i].price = priceInputForNewValue.value;
            clientPayment.nodeValue = priceInputForNewValue.value;

            addDataToLocalStorageFrom(arrayOfClients);

            paymentDetailsDataTo(arrayOfPaymentData);
            addPaymentDetailsToArray(
              selectClient.options[selectClient.selectedIndex].text,
              priceInputForNewValue.value
            );
          }
          clearDataFromInput();
        }
      } else {
        invalidMsg.innerHTML = "Please Enter Price Or Select Your Client";
        invalidMsg.classList.add("show");
      }
    });
  });
  localStorage.setItem("total-price", totalPrice.innerHTML);
}

if (localStorage.getItem("total-price") != null) {
  totalPrice.innerHTML = localStorage.getItem("total-price");
}

exitChangeName.onclick = function () {
  editNameParent.classList.remove("show");
  overlay.classList.remove("show");
};

clientsDataFromLocalStorage();
