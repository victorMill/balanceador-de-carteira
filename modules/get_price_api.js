import { assets } from "../database/stocks_db.js";
import { renderTable, formatTable } from "./render_format_table.js";
import { calcPortfolio } from "./calculations.js";
import { findAsset } from "./create_asset.js";

export { requestAssetPrice, requestAssetPriceAll };

// Requisitar preço de item especifico, para quando adicionar novo item

async function requestAssetPrice(ticker) {
  const apiKey = "njGH8fj7EhkP1XEYn62kHD";

  try {
    const res = await fetch(
      `https://brapi.dev/api/quote/${ticker}?token=${apiKey}`
    );
    const assetInfo = await res.json();
    if (!res.ok) {
      console.log("A chave API ou o Ticker estão errados");
      return;
    }
    findAsset(ticker).price = assetInfo["results"][0]["regularMarketPrice"];
  } catch (error) {
    alert(
      "Houve um erro na obtenção do valor dos ativos, por favor verifique se a sua API key está correta e atualize a página."
    );
    console.error(`Erro ao buscar preço do ativo ${ticker}`, error);
  }
  renderTable();
  calcPortfolio();
  formatTable();
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
      renderTable();
      alert(
        "Houve um erro na obtenção do valor dos ativos, por favor verifique se a sua API key está correta e atualize a página."
      );
      console.log(error);
    }
  }
  renderTable();
  calcPortfolio();
  formatTable();
}
