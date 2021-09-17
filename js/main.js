const billInput = document.querySelector(".bill-input");
const tip = document.querySelector(".tip");
const customBtn = document.querySelector(".tip-custom");
const peopleNumberInput = document.querySelector(".people-number-input");
const peopleNumberError = document.querySelector(".people-number-error");
const tipAmount = document.querySelector(".tip-amount-calculate");
const total = document.querySelector(".total-calculate");
const resetBtn = document.querySelector(".reset");

const tipUp = tip.children[1];
const tipBelow = tip.children[2];

let customBtnActivated = false;

function init() {
  for (let i = 0; i < 3; i++) {
    tipUp.children[i].addEventListener("click", calculate);
    tipUp.children[i].addEventListener("click", activateResetBtn);
  }
  for (let i = 0; i < 2; i++) {
    tipBelow.children[i].addEventListener("click", calculate);
    tipBelow.children[i].addEventListener("click", activateResetBtn);
  }
  billInput.addEventListener("input", calculate);
  billInput.addEventListener("click", nullifyValue);
  billInput.addEventListener("click", activateResetBtn);
  customBtn.addEventListener("click", nullifyValue);
  customBtn.addEventListener("click", activateCustomBtn);
  peopleNumberInput.addEventListener("input", calculate);
  peopleNumberInput.addEventListener("click", nullifyValue);
  peopleNumberInput.addEventListener("click", activateResetBtn);
  resetBtn.addEventListener("click", deactivateResetBtn);
}

function calculate(target) {
  if (
    billInput.value == 100 &&
    tipUp.children[0].classList.contains("clicked") &&
    peopleNumberInput.value == 1
  ) {
    deactivateResetBtn();
  } else {
    activateResetBtn();
  }

  if (peopleNumberInput.value == 0 || peopleNumberInput.value === null) {
    peopleNumberInput.parentNode.classList.add("people-number-zero");
    peopleNumberError.classList.remove("hidden");
  } else {
    peopleNumberInput.parentNode.classList.remove("people-number-zero");
    peopleNumberError.classList.add("hidden");
  }

  const targetClass = target.target.classList[0];
  const customBtnValue = customBtn.value;

  if (targetClass !== "bill-input" && targetClass !== "people-number-input") {
    for (let i = 0; i < 3; i++) {
      checkClassList(tipUp.children[i]);
    }
    for (let i = 0; i < 2; i++) {
      checkClassList(tipBelow.children[i]);
    }
  }

  target.target.classList.add("clicked");
  billInput.classList.remove("clicked");
  peopleNumberInput.classList.remove("clicked");

  const clickedEl = document.querySelector(".clicked");
  const data = Number(clickedEl.outerText.slice(-3, -1));
  const customData = Number(customBtnValue.slice(-3, -1));
  const bill = Number(billInput.value);
  const people = Number(peopleNumberInput.value);

  calculateAll(data, customData, bill, people);
}

function checkClassList(target) {
  if (target.classList.contains("clicked")) {
    target.classList.remove("clicked");
  }
}

function activateCustomBtn() {
  activateResetBtn();
  customBtnActivated = true;
  tipAmount.innerHTML = "$0.00";
  total.innerHTML = "$0.00";
  for (let i = 0; i < 3; i++) {
    tipUp.children[i].classList.remove("clicked");
  }
  for (let i = 0; i < 2; i++) {
    tipBelow.children[i].classList.remove("clicked");
  }

  customBtn.classList.add("tip-custom-active");
  customBtn.addEventListener("input", calculate);
  customBtn.value = "%";
  customBtn.setSelectionRange(0, 0);
  if (peopleNumberInput.value == 0 || peopleNumberInput.value === null) {
    peopleNumberInput.parentNode.classList.add("people-number-zero");
    peopleNumberError.classList.remove("hidden");
  }
  for (let i = 0; i < 3; i++) {
    tipUp.children[i].addEventListener("click", deactivateCustomBtn);
  }
  for (let i = 0; i < 2; i++) {
    tipBelow.children[i].addEventListener("click", deactivateCustomBtn);
  }
}

function deactivateCustomBtn() {
  customBtn.classList.remove("tip-custom-active");
  customBtn.value = "Custom";
  customBtnActivated = false;
  if (
    billInput.value == 100 &&
    peopleNumberInput.value == 1 &&
    !customBtnActivated &&
    tipUp.children[0].classList.contains("clicked")
  ) {
    deactivateResetBtn();
  }
}

function activateResetBtn() {
  if (
    billInput.value == 100 &&
    tipUp.children[0].classList.contains("clicked") &&
    peopleNumberInput.value == 1
  ) {
    deactivateResetBtn();
  } else {
    resetBtn.classList.add("reset-active");
  }
}

function deactivateResetBtn() {
  resetBtn.classList.remove("reset-active");
}

function nullifyValue(target) {
  target.target.value = null;
  tipAmount.firstChild.data = "$0.00";
  total.firstChild.data = "$0.00";
  if (
    target.target.classList.contains("people-number-input") ||
    target.target.classList.contains("bill-input")
  ) {
    if (peopleNumberInput.value == 0 || peopleNumberInput.value === null) {
      peopleNumberInput.parentNode.classList.add("people-number-zero");
      peopleNumberError.classList.remove("hidden");
    }
  } else {
    peopleNumberInput.parentNode.classList.remove("people-number-zero");
    peopleNumberError.classList.add("hidden");
  }
}

function calculateAll(data, customData, bill, people) {
  if (data) {
    const amount = (bill * data) / 100 / people;
    tipAmount.innerHTML = `$${parseFloat(
      Math.round(amount * 100) / 100
    ).toFixed(2)}`;
    const totalPay = ((bill * data) / 100 + bill) / people;
    total.innerHTML = `$${parseFloat(Math.round(totalPay * 100) / 100).toFixed(
      2
    )}`;
  } else {
    const amount = (bill * customData) / 100 / people;
    tipAmount.innerHTML = `$${parseFloat(
      Math.round(amount * 100) / 100
    ).toFixed(2)}`;
    const totalPay = ((bill * customData) / 100 + bill) / people;
    total.innerHTML = `$${parseFloat(Math.round(totalPay * 100) / 100).toFixed(
      2
    )}`;
  }
  if (
    tipAmount.textContent === "$NaN" ||
    tipAmount.textContent === "$Infinity"
  ) {
    tipAmount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
  }
}

resetBtn.addEventListener("click", resetAll);

function resetAll() {
  billInput.value = 100;
  for (let i = 0; i < 3; i++) {
    tipUp.children[i].classList.remove("clicked");
  }
  for (let i = 0; i < 2; i++) {
    tipBelow.children[i].classList.remove("clicked");
  }
  tipUp.children[0].classList.add("clicked");
  peopleNumberInput.value = 1;
  tipAmount.firstChild.data = "$5.00";
  total.firstChild.data = "$105.00";
  deactivateCustomBtn();
}

init();
