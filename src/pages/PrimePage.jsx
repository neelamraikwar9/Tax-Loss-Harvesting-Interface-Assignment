import "./primePage.css";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchHoldings, fetchCapitalGains } from "../mockAPIs/mockApi";

const PrimePage = () => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    fetchCapitalGains().then((data) => {
      setCapitalGains(data.capitalGains);
    });
  }, []);

  const afterGains = capitalGains
    ? {
        stcg: {
          profits: capitalGains.stcg.profits,
          losses: capitalGains.stcg.losses,
        },
        ltcg: {
          profits: capitalGains.ltcg.profits,
          losses: capitalGains.ltcg.losses,
        },
      }
    : null;

  const preRealised = capitalGains
    ? capitalGains.stcg.profits -
      capitalGains.stcg.losses +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses)
    : 0;

  const postRealised = afterGains
    ? afterGains.stcg.profits -
      afterGains.stcg.losses +
      (afterGains.ltcg.profits - afterGains.ltcg.losses)
    : 0;

  const saving = preRealised > postRealised ? preRealised - postRealised : 0;

  const fmtUSD = (n) => {
    const abs = Math.abs(n);
    const str = abs.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (n < 0 ? "- $ " : "$ ") + str;
  };

  return (
    <div className="mainContainer">
      <Navbar />

      <div className="textHarvOutCont">
        <div className="textHarCont">
          <h1 className="taxHarv">Tax Harvesting</h1>
          <a href="#" className="hIWT">
            How it works?
          </a>
        </div>

        <div className="disclaimerBox">
          <div
            onClick={() => setDisclaimerOpen(!disclaimerOpen)}
            className="headerContainer"
          >
            <div className="ImporNotText">ℹ️ Important Notes & Disclaimers</div>
            <span className="arrowStyl">{disclaimerOpen ? "∧" : "∨"}</span>
          </div>

          {disclaimerOpen && (
            <ul className="points">
              <li>
                Tax-loss harvesting is currently not allowed under Indian tax
                regulations. Please consult your tax advisor before making any
                decisions.
              </li>
              <li>
                Tax harvesting does not apply to derivatives or futures. These
                are handled separately as business income under tax rules.
              </li>
              <li>
                Price and market value data is fetched from Coingecko, not from
                individual exchanges. Values may slightly differ.
              </li>
              <li>
                Some countries do not have a short-term / long-term bifurcation.
                For now, we are calculating everything as long-term.
              </li>
              <li>
                Only realized losses are considered for harvesting. Unrealized
                losses in held assets are not counted.
              </li>
            </ul>
          )}
        </div>
      </div>

      {capitalGains && afterGains && (
        <div className="harvestingCont">
          {/* Pre Harvesting */}
          <div className="preHarvCon">
            <h3 className="preHarvTxt">Pre Harvesting</h3>
            <table className="preHarvTable">
              <thead>
                <tr>
                  <th className="th1"></th>
                  <th className="th2">Short-term</th>
                  <th className="th2">Long-term</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td1">Profits</td>
                  <td className="td2">{fmtUSD(capitalGains.stcg.profits)}</td>
                  <td className="td2">{fmtUSD(capitalGains.ltcg.profits)}</td>
                </tr>
                <tr>
                  <td className="td1">Losses</td>
                  <td className="td2Loss">
                    {fmtUSD(-capitalGains.stcg.losses)}
                  </td>
                  <td className="td2Loss">
                    {fmtUSD(-capitalGains.ltcg.losses)}
                  </td>
                </tr>
                <tr>
                  <td className="td1Bold">Net Capital Gains</td>
                  <td className="td2Bold">
                    {fmtUSD(
                      capitalGains.stcg.profits - capitalGains.stcg.losses,
                    )}
                  </td>
                  <td className="td2Bold">
                    {fmtUSD(
                      capitalGains.ltcg.profits - capitalGains.ltcg.losses,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="realisedRow">
              <span className="realisedLabel">Realised Capital Gains:</span>
              <span className="realisedValue">{fmtUSD(preRealised)}</span>
            </div>
          </div>

          {/* After Harvesting */}
          <div className="afterHarvCon">
            <h3 className="afterHarvTxt">After Harvesting</h3>
            <table className="afterHarvTable">
              <thead>
                <tr>
                  <th className="afterTh"></th>
                  <th className="afterTh">Short-term</th>
                  <th className="afterTh">Long-term</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="afterTd1">Profits</td>
                  <td className="afterTd2">
                    {fmtUSD(afterGains.stcg.profits)}
                  </td>
                  <td className="afterTd2">
                    {fmtUSD(afterGains.ltcg.profits)}
                  </td>
                </tr>
                <tr>
                  <td className="afterTd1">Losses</td>
                  <td className="afterTd2Loss">
                    {fmtUSD(-afterGains.stcg.losses)}
                  </td>
                  <td className="afterTd2Loss">
                    {fmtUSD(-afterGains.ltcg.losses)}
                  </td>
                </tr>
                <tr>
                  <td className="afterTd1Bold">Net Capital Gains</td>
                  <td className="afterTd2Bold">
                    {fmtUSD(afterGains.stcg.profits - afterGains.stcg.losses)}
                  </td>
                  <td className="afterTd2Bold">
                    {fmtUSD(afterGains.ltcg.profits - afterGains.ltcg.losses)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="effectiveRow">
              <span className="effectiveLabel">Effective Capital Gains:</span>
              <span className="effectiveValue">{fmtUSD(postRealised)}</span>
            </div>
            {saving > 0 && (
              <div className="savingBanner">
                🎉 You are going to save upto <strong>{fmtUSD(saving)}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimePage;
