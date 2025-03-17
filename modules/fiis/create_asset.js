import { renderTable, formatTable } from "./render_format_table.js";

export {
  requestAssetPrice,
  requestAssetPriceAll,
  addNewAsset,
  findAsset,
  preventSelection,
  readDB,
  updateDB,
};

//------------------import and export data from DB and push to assets----------

export const assets = [];

const path = "https://api.jsonbin.io/v3/b/INSERIR AQUI A BIN ID DO JSON DE FIIS";
const accessKey =
  "INSERIR X-MASTER-KEY";

async function readDB() {
  try {
    const res = await fetch(path, {
      method: "GET",
      headers: { "X-Master-Key": accessKey, "X-Bin-Meta": false },
    });

    if (!res.ok) throw new Error(`Error: ${res.status} - ${res.statusText}`);

    const data = await res.json();
    assets.length = 0;
    data.map((el) => assets.push(el));
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function updateDB() {
  try {
    const response = await fetch(path, {
      method: "PUT",
      body: JSON.stringify(assets),
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": accessKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log("Update successful:", data);
  } catch (error) {
    console.error("Update failed:", error.message);
  }
}

//--------------create new asset and find existing asset by ticker -----------------------

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

async function addNewAsset(ev) {
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
    assets.push(new Asset(ticker[0], quantity, score));
    await requestAssetPrice(ticker[0]);
    await updateDB();
    renderTable();
    form.reset();
  }
}

function findAsset(ticker) {
  let thisAsset = assets.find((asset) => asset.ticker === ticker);
  return thisAsset;
}

// Requisitar preço de item especifico, para quando adicionar novo item

async function requestAssetPrice(ticker) {
  const apiKey = "INSERIR TOKEN BRAPI.DEV";

  try {
    const res = await fetch(
      `https://brapi.dev/api/quote/${ticker}?token=${apiKey}`
    );
    const assetInfo = await res.json();
    if (!res.ok) {
      console.log("A chave API ou o Ticker estão errados");
      return;
    }
    console.log(assetInfo["results"][0]["regularMarketPrice"]);
    findAsset(ticker).price = assetInfo["results"][0]["regularMarketPrice"];
  } catch (error) {
    alert(
      "Houve um erro na obtenção do valor dos ativos, por favor verifique se a sua API key está correta e atualize a página."
    );
    console.error(`Erro ao buscar preço do ativo ${ticker}`, error);
  }
}

//Requisitar preços de todos os itens do servidor, para quando iniciar a página

async function requestAssetPriceAll() {
  const apiKey = "njGH8fj7EhkP1XEYn62kHD";

  for (const asset in assets) {
    try {
      const res = await fetch(
        `https://brapi.dev/api/quote/${assets[asset].ticker}?token=${apiKey}`
      );
      const assetInfo = await res.json();
      if (!res.ok) {
        console.log("A chave API ou o Ticker estão errados");
        return;
      }
      assets[asset].price = assetInfo["results"][0]["regularMarketPrice"];
    } catch (error) {
      alert(
        "Houve um erro na obtenção do valor dos ativos, por favor verifique se a sua API key está correta e atualize a página."
      );
      console.log(error);
    }
  }
}

//-------------------Prevent user from selecting non-listed asset----------------------------

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
