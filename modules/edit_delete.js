import { assets } from "../database/stocks_db.js";
import { renderTable } from "./render_format_table.js";
import { sumBalance } from "./calculations.js";
import { findAsset } from "./create_asset.js";

export { openCloseDeletePopup, openEditPopup, editAsset, deleteAsset };

//section to edit asset score and quantity

const qntInput = document.getElementById("edit-quantity");
const scoreInput = document.getElementById("edit-score");
const editPopup = document.getElementById("edit-popup");

function openEditPopup(ev) {
  //Open popup on click and asign title and values
  const ticker = ev.target.parentElement.id.match(/^.{5}/g);
  document.getElementById("edit-ticker").innerText = ticker;
  editPopup.dataset.ticker = ticker;
  console.log(ticker);
  const currentQuantity = document.getElementById(
    `${ticker}-quantity`
  ).innerText;
  const currScore = document.getElementById(`${ticker}-score`).innerText;
  const rangeValue = document.getElementById("rangeValue1");

  qntInput.value = currentQuantity;
  scoreInput.value = currScore;
  rangeValue.innerText = currScore;
  editPopup.style.display = "block";
}

function editAsset(ev) {
  //save edited values do designed asset and update table
  const ticker = editPopup.dataset.ticker;
  const asset = findAsset(ticker);
  asset.quantity = qntInput.value;
  asset.score = scoreInput.value;
  editPopup.style.display = "none";
  renderTable();
}

//section to delete asset from table and database

const deletePopup = document.getElementById("delete-popup");

function openCloseDeletePopup(ev) {
  //toggle delete popup exibiton and asign titles
  const deletePopup = document.getElementById("delete-popup");
  if (deletePopup.style.display === "block") {
    deletePopup.style.display = "none";
  } else {
    deletePopup.style.display = "block";
  }
  const ticker = ev.target.parentElement.id.match(/\w{5,6}/);
  document.getElementById("delete-ticker").innerText = ticker;
  deletePopup.dataset.ticker = ticker;
}

function deleteAsset(ev) {
  //delete asset from database and delete correspondent table row
  const ticker = deletePopup.dataset.ticker;
  assets.filter((asset, index) => {
    if (asset.ticker === ticker) {
      assets.splice(index, 1);
      document.getElementById(`${ticker}-ticker`).parentElement.remove();
    }
  });
  deletePopup.style.display = "none";
  sumBalance();
}
