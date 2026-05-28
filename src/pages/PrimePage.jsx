import "./primePage.css";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const PrimePage = () => {
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);

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

        {/* Disclaimer Box */}
        <div className="disclaimerBox">
          {/* Header row */}
          <div
            onClick={() => setDisclaimerOpen(!disclaimerOpen)}
            className="headerContainer"
          >
            <div className="ImporNotText">ℹ️ Important Notes & Disclaimers</div>
            <span className="arrowStyl">{disclaimerOpen ? "∧" : "∨"}</span>
          </div>

          {/* Points */}
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
    </div>
  );
};

export default PrimePage;
