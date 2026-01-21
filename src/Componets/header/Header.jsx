import Bars from "../../assets/dasdhboard/bars.svg";
import Avatar from "../../assets/dasdhboard/avatar.webp";
import ChevronDown from "../../assets/dasdhboard/chevron-down.svg";
import "../header/Header.css";


import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  const navigate = useNavigate();


  const { language, toggleLanguage } = useLanguage();

  const nextLanguage = language === "en" ? "Urdu" : "English";

  const t = studentFormText[language];


  const handleLogout = async () => {
    try {
      await axios.post("https://localhost:7000/api/Account/logout");

    } catch (err) {
      console.warn("Logout API failed, clearing local data anyway");
    } finally {
      localStorage.removeItem("auth");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="header">
      <header>
        <div className="row align-items-center">
          <div className="col-md-3">
            <h3>{t.StudentLibrary}</h3>
          </div>



          <div className="col-md-9">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={Bars} alt="Menu" />
              </div>

              <div className="col-md-3"></div>

              <div className="col-md-7 text-end">
                <div className="row">
                  <div className="col text-end pt-3">
                    <button
                      className="btn btn-primary"
                      onClick={toggleLanguage}
                    >
                      Switch to {nextLanguage}
                    </button>
                  </div>
                  <div className="col-md-2">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          onClick={toggleDropdown}
                          aria-haspopup="true"
                          aria-expanded={dropdownOpen}
                        >

                          <img
                            src={Avatar}
                            width="50"
                            height="50"
                            className="rounded-circle user-avatar"
                            alt="User"
                          />

                        </a>
                        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMenuLink">
                          {/* <div className="subscription-icons d-flex">
                      <img src="/images/setting.svg" className="add-icons" alt="Settings" width="20" height="20" />
                      <Link className="dropdown-item" to="/">Login</Link>
                    </div> */}
                          <div
                            className="subscription-icons d-flex"
                            onClick={handleLogout}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src="/images/log-out.svg"
                              className="add-icons"
                              alt="Logout"
                              width="20"
                              height="20"
                            />
                            <span className="dropdown-item">Logout</span>
                          </div>

                        </div>
                      </li>
                    </ul>

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
