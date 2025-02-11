export { openBuyPopup };
import { findAsset } from "./create_asset.js";
import { renderTable } from "./render_format_table.js";

//Add asset quantity to table after distribution

const elements = [
  {
    ticker: document.getElementById("ticker-0"),
    quantity: document.getElementById("quantity-0"),
    value: document.getElementById("value-0"),
  },
  {
    ticker: document.getElementById("ticker-1"),
    quantity: document.getElementById("quantity-1"),
    value: document.getElementById("value-1"),
  },
  {
    ticker: document.getElementById("ticker-2"),
    quantity: document.getElementById("quantity-2"),
    value: document.getElementById("value-2"),
  },
];

const total = document.getElementById("sum-td"),
  buyPopup = document.getElementById("buy-popup"),
  buyBtnY = document.getElementById("buy-popup-btn_y"),
  buyBtnN = document.getElementById("buy-popup-btn_n"),
  buyText = document.getElementById("buy-text");

function makePurchase() {
  //Add quantity of each asset to the database
  Object.values(elements).forEach((el) => {
    findAsset(el.ticker.innerText).quantity += Number(el.quantity.innerText);
  });
  renderTable();
  //Clear distribution table
  elements.forEach((group) => {
    Object.values(group).forEach((el) => {
      el.innerText = "";
    });
  });
  total.innerText = "";
  //close the popup
  buyPopup.style.display = "none";
}

function openBuyPopup() {
  if (elements[0].ticker.innerText === "") {
    alert("Por favor calcule o rateio antes de realizar a compra.");
  } else {
    buyPopup.style.display = "block";
    buyText.innerText = `- ${elements[0].quantity.innerText} ações de ${elements[0].ticker.innerText}
      - ${elements[1].quantity.innerText} ações de ${elements[1].ticker.innerText}
      - ${elements[2].quantity.innerText} ações de ${elements[2].ticker.innerText}`;
    buyBtnY.addEventListener("click", makePurchase);
    buyBtnN.addEventListener("click", () => (buyPopup.style.display = "none"));
  }
}
