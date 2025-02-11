//****modules*****

import { renderTable } from "./modules/render_format_table.js";
import { addNewAsset, preventSelection } from "./modules/create_asset.js";
import {
  editAsset,
  openCloseDeletePopup,
  deleteAsset,
} from "./modules/edit_delete.js";

import { calcDistribution } from "./modules/calculations.js";
import { openBuyPopup } from "./modules/asset_distribution.js";

//General stuff*****

//Render table form database when page load
addEventListener("DOMContentLoaded", renderTable);

//Prevent user from selecting non-listed asset
const input = document.getElementById("add-asset_ticker");
input.addEventListener("change", preventSelection);

//create new asset
const addAssetBtn = document.getElementById("add-asset_btn");
addAssetBtn.addEventListener("click", addNewAsset);

//Calculate distribution of investment based on availabe money informed
const calcBtn = document.getElementById("calc-btn");
calcBtn.addEventListener("click", calcDistribution);

//*******Popups*******

//Close edit popup
const editPopup = document.getElementById("edit-popup");
const editCancelBtn = document.getElementById("popup-btn_cancel");
editCancelBtn.addEventListener(
  "click",
  () => (editPopup.style.display = "none")
);

//Save changes and close edit pupup
const editSaveBtn = document.getElementById("popup-btn_save");
editSaveBtn.addEventListener("click", editAsset);

//close detele popup
const deleteBtnNo = document.getElementById("popup-btn_n");
deleteBtnNo.addEventListener("click", openCloseDeletePopup);

//delete selected asset and close delte popup
const deleteBtnYes = document.getElementById("popup-btn_y");
deleteBtnYes.addEventListener("click", deleteAsset);

//Open purchase confirmation popup, when clicked yes, distributed assets quantity will be added to current portfolio
const buyBtn = document.getElementById("buy-btn");
buyBtn.addEventListener("click", openBuyPopup);
