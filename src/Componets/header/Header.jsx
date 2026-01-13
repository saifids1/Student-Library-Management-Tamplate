import Bars from "../../assets/dasdhboard/bars.svg";
import Avatar from "../../assets/dasdhboard/avatar.webp";
import ChevronDown from "../../assets/dasdhboard/chevron-down.svg";
import "../header/Header.css";
import { useState } from "react";

const Header = () => {
  
  const [language, setLanguage] = useState("Urdu");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "Urdu" ? "English" : "Urdu"));
  };

  const nextLanguage = language === "Urdu" ? "English" : "Urdu";

  return (
    <div className="header">
      <header>
        <div className="row align-items-center">
          <div className="col-md-3">
            <h3>Student Library</h3>
          </div>

          <div className="col-md-9">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={Bars} alt="Menu" />
              </div>

              <div className="col-md-3">
                <h2></h2>
              </div>

              <div className="col-md-7 text-end">
                <div className="row align-items-center">
                  <div className="col-md-5">
                    <p className="me-1 mt-2">
                      10-01-2026 11:05 AM
                    </p>
                  </div>

                  <div className="col">
                    <img
                      src={Avatar}
                      alt="User"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <img
                      src={ChevronDown}
                      alt="Dropdown"
                      style={{ width: "20px", height: "20px", margin: "10px" }}
                    />
                  </div>

                  <div className="col-md-4">
                    <button
                      className="btn btn-primary"
                      onClick={toggleLanguage}
                    >
                      Switch to {nextLanguage}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
