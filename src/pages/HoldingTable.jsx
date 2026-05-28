import React from "react";
import "./holdingTable.css";

const fmtGain = (n) => {
  const abs = Math.abs(n);
  const s =
    abs >= 1e6
      ? (abs / 1e6).toFixed(2) + "M"
      : abs.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  return (n < 0 ? "-$" : "+$") + s;
};

function CoinLogo({ src, coin }) {
  if (!src) {
    return <div className="coinFallback">{coin.slice(0, 2)}</div>;
  }
  return <img src={src} alt={coin} className="coinLogo" />;
}

const HoldingsTable = (props) => {
  const {
    holdings = [],
    selected = new Set(),
    toggleOne = () => {},
    toggleAll = () => {},
    showAll = false,
    setShowAll = () => {},
  } = props || {};

  const visibleHoldings = showAll ? holdings : holdings.slice(0, 6);
  const allChecked = holdings.length > 0 && selected.size === holdings.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div className="holdingsBox">
      <div className="holdingsHeader">
        <h2>Holdings</h2>
      </div>

      <div className="tableWrap">
        <table className="holdingsTable">
          <thead>
            <tr className="tableHeadRow">
              <th className="checkCol">
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked;
                  }}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th className="assetCol">Asset</th>
              <th className="holdingsCol">
                Holdings
                <br />
                <span>Current Market Rate</span>
              </th>
              <th className="valueCol">Total Current Value</th>
              <th className="shortCol">Short-term</th>
              <th className="longCol">Long-Term</th>
              <th className="sellCol">Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {visibleHoldings.map((h, i) => {
              const isSel = selected.has(i);
              const totalVal = h.currentPrice * h.totalHolding;
              const amtSell = h.stcg.balance + h.ltcg.balance;

              return (
                <tr
                  key={i}
                  className={isSel ? "rowSelected" : "tableRow"}
                  onClick={() => toggleOne(i)}
                >
                  <td className="checkCol">
                    <input
                      type="checkbox"
                      checked={isSel}
                      onChange={() => toggleOne(i)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>

                  <td className="assetCell">
                    <div className="assetWrap">
                      <CoinLogo src={h.logo} coin={h.coin} />
                      <div>
                        <div className="coinName">{h.coinName}</div>
                        <div className="coinSymbol">{h.coin}</div>
                      </div>
                    </div>
                  </td>

                  <td className="holdingsCell">
                    <div className="holdingMain">
                      {h.totalHolding < 0.001
                        ? h.totalHolding.toExponential(2)
                        : h.totalHolding.toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          })}{" "}
                      {h.coin}
                    </div>
                    <div className="holdingSub">
                      $
                      {h.currentPrice.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}
                      /{h.coin}
                    </div>
                  </td>

                  <td className="valueCell">
                    $
                    {totalVal.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="gainCell">
                    <div
                      className={h.stcg.gain < 0 ? "lossText" : "profitText"}
                    >
                      {fmtGain(h.stcg.gain)}
                    </div>
                    {h.stcg.balance > 0 && (
                      <div className="gainSub">
                        {h.stcg.balance} {h.coin}
                      </div>
                    )}
                  </td>

                  <td className="gainCell">
                    {h.ltcg.gain !== 0 ? (
                      <>
                        <div
                          className={
                            h.ltcg.gain < 0 ? "lossText" : "profitText"
                          }
                        >
                          {fmtGain(h.ltcg.gain)}
                        </div>
                        {h.ltcg.balance > 0 && (
                          <div className="gainSub">
                            {h.ltcg.balance} {h.coin}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="dashText">-</span>
                    )}
                  </td>

                  <td className="sellCell">
                    {amtSell > 0 ? (
                      <span className={isSel ? "sellSelected" : "sellNormal"}>
                        {amtSell.toFixed(4)} {h.coin}
                      </span>
                    ) : (
                      <span className="dashText">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > 6 && (
        <div className="viewMoreWrap">
          <button onClick={() => setShowAll(!showAll)} className="viewMoreBtn">
            {showAll ? "View less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
