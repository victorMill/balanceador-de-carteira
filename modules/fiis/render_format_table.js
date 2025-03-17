import { sumBalance, calcPortfolio } from "./calc.js";
import { openCloseDeletePopup, openEditPopup } from "./edit_delete.js";
import { readDB, requestAssetPriceAll, updateDB } from "./create_asset.js";
import { assets } from "./create_asset.js";

export { renderTable, formatTable, formatNumber };

//create and render table and table buttons

async function renderTable() {
  await readDB();
  await requestAssetPriceAll();
  const tBody = document.getElementById("assets-table_body");
  const tdNode = [...document.querySelectorAll("#assets-table_body > tr > td")];

  sumBalance();
  calcPortfolio();

  Object.values(assets).forEach((asset) => {
    const row = document.createElement("tr");
    const assetKeys = Object.keys(asset).slice(0, -3);

    //render table based on assets in the database

    if (tdNode.some((item) => item?.id.includes(asset.ticker))) {
      assetKeys.forEach((key) => {
        const cell = document.getElementById(`${asset.ticker}-${key}`);
        cell.innerText = asset[key];
      });
    } else {
      assetKeys.forEach((key) => {
        const cell = document.createElement("td");
        cell.id = `${asset.ticker}-${key}`;
        cell.innerText = asset[key];
        row.appendChild(cell);
      });
      const editCell = document.createElement("td");
      editCell.id = `${asset.ticker}-edit`;
      row.appendChild(editCell);
      tBody.appendChild(row);
    }
  });
  formatTable();
  renderBtns();
}

//format functions

function formatNumber(value, output) {
  const options = {
    currency: { style: "currency", currency: "BRL", locale: "pt-BR" },
    percent: { style: "percent", minimumFractionDigits: 2 },
    decimal: { style: "decimal" },
  };

  const formatOutput = new Intl.NumberFormat(
    options[output]?.locale,
    options[output]
  );
  return formatOutput.format(value);
}

//format table according to output type

function formatTable() {
  Object.values(assets).forEach((asset) => {
    const cells = {
      score: document.getElementById(`${asset.ticker}-score`),
      price: document.getElementById(`${asset.ticker}-price`),
      balance: document.getElementById(`${asset.ticker}-balance`),
      currPosition: document.getElementById(`${asset.ticker}-currPosition`),
      target: document.getElementById(`${asset.ticker}-target`),
      quantity: document.getElementById(`${asset.ticker}-quantity`),
    };

    cells.price.innerText = formatNumber(asset.price, "currency");
    cells.balance.innerText = formatNumber(asset.balance, "currency");
    cells.currPosition.innerText = formatNumber(asset.currPosition, "percent");
    cells.target.innerText = formatNumber(asset.target, "percent");
    cells.quantity.innerText = formatNumber(asset.quantity, "decimal");
  });
}

//Create and render table buttons

function renderBtns() {
  assets.forEach((asset) => {
    const editCell = document.getElementById(`${asset.ticker}-edit`);

    if (!editCell.hasChildNodes()) {
      const editBtn = document.createElement("i");
      editBtn.id = `${asset.ticker}-edit_btn`;
      editBtn.title = "Editar";
      editBtn.classList.add(
        "edit-delete",
        "editBtn",
        "fa-solid",
        "fa-pen-to-square"
      );
      editBtn.addEventListener("click", openEditPopup);

      const deleteBtn = document.createElement("i");
      deleteBtn.id = `${asset.ticker}-delete_btn`;
      deleteBtn.title = "Deletar";
      deleteBtn.classList.add(
        "edit-delete",
        "deleteBtn",
        "fa-solid",
        "fa-trash"
      );
      deleteBtn.addEventListener("click", openCloseDeletePopup);

      editCell.appendChild(editBtn);
      editCell.appendChild(deleteBtn);
    }
  });
}
