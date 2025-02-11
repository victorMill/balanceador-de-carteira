export { sumBalance, calcPortfolio, calcDistribution };
import { assets } from "../database/stocks_db.js";
import { formatNumber } from "./render_format_table.js";

// calculations
function sumBalance() {
  //calculate balance of each asset
  assets.forEach((asset) => (asset.balance = asset.quantity * asset.price));
  //calculate total balance of portfolio
  const balance = document.getElementById("balance-value");
  let result = assets.reduce((accm, item) => accm + Number(item.balance), 0);
  balance.innerText = formatNumber(result, "currency");
  return result;
}

function calcPortfolio() {
  const totalBalance = sumBalance();
  const scoreSum = assets.reduce((accm, item) => accm + Number(item.score), 0);

  Object.values(assets).forEach((asset) => {
    asset.currPosition = asset.balance / totalBalance;
    asset.target = asset.score / scoreSum;
    asset.deviation = asset.target - asset.currPosition;
    asset.quantityToTarget = Math.round(
      (totalBalance * asset.target - asset.balance) / asset.price
    );
    asset.valueToTarget = asset.quantityToTarget * asset.price;
  });
}

//Calculate apportioning of value to invest

function calcDistribution(ev) {
  ev.preventDefault();
  const valueInput = document.getElementById("value-input");
  const total = document.getElementById("sum-td");
  let totalSum = 0;

  if (!valueInput.value) {
    alert("Por favor insira um valor para ser rateado");
    return;
  }

  assets.sort((x, y) => y.quantityToTarget - x.quantityToTarget);
  const highest = assets.slice(0, 3);
  const valueToTargetSum = highest.reduce(
    (accm, item) => accm + Number(item.valueToTarget),
    0
  );
  for (const asset in highest) {
    const tickerCell = document.getElementById(`ticker-${asset}`);
    const quantityCell = document.getElementById(`quantity-${asset}`);
    const valueCell = document.getElementById(`value-${asset}`);
    tickerCell.innerText = highest[asset].ticker;
    quantityCell.innerText = Math.round(
      (valueInput.value * (highest[asset].valueToTarget / valueToTargetSum)) /
        highest[asset].price
    );
    valueCell.innerText = formatNumber(
      quantityCell.innerText * assets[asset].price,
      "currency"
    );
    totalSum += quantityCell.innerText * assets[asset].price;
  }
  total.innerText = formatNumber(totalSum, "currecy");
  valueInput.value = "";
}
