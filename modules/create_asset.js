import { assets } from "../database/stocks_db.js";
import { requestAssetPrice } from "./get_price_api.js";

export { addNewAsset, findAsset, preventSelection };

// create new asset and find existing asset ny ticker

class Asset {
  constructor(ticker, quantity, score) {
    this.ticker = ticker;
    this.score = score;
    this.currPosition = 0;
    this.target = 0;
    this.quantity = quantity;
    this.price = 0;
    this.balance = this.quantity * this.price;
    this.deviation = 0;
    this.quantityToTarget = 0;
    this.valueToTarget = 0;
  }
}

function addNewAsset(ev) {
  ev.preventDefault();
  const asset = document.getElementById("add-asset_ticker").value;
  const ticker = asset.match(/\w{5,6}/);
  const quantity = Number(document.getElementById("add-asset_quantity").value);
  const score = Number(document.getElementById("add-asset_score").value);
  const form = document.getElementById("add-asset");
  if (findAsset(ticker)) {
    alert("Esta ação já existe na tabela");
  } else if (!ticker || !quantity || !score) {
    alert("Por favor preencha todos os dados.");
  } else {
    assets.push(new Asset(ticker, quantity, score));
    requestAssetPrice(ticker);
    form.reset();
  }
}

function findAsset(ticker) {
  let thisAsset = "";
  thisAsset = assets.find((asset) => asset.ticker === ticker);
  return thisAsset;
}

//Prevent user from selecting non-listed asset

function preventSelection() {
  let isEqual = false,
    datalist = this.list;
  for (var i = 0; i < datalist.options.length; i++) {
    if (this.value == datalist.options[i].value) {
      isEqual = true;
      break;
    }
  }
  if (!isEqual) {
    alert("Ativo não encontrado, por favor escolha um ativo da lista.");
    input.value = "";
  }
}
