import "../header/Header.css";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import { useNavigate } from "react-router-dom";
import Avatar from "../../assets/dasdhboard/avatar.webp"

const Header = () => {
  // const [students, setStudents] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navigate = useNavigate();

  const { language, toggleLanguage } = useLanguage();

  const nextLanguage =
    language === "ur" ? "انگریزی میں تبدیل کریں" : "Switch to Urdu";

  const t = studentFormText[language];

  const handleLogout = async () => {
    try {
      await axios.post("https://localhost:7000/api/Account/logout");
    } catch (err) {
      console.warn("Logout API failed, clearing local data anyway", err);
    } finally {
      localStorage.removeItem("auth");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="app-header">
      {/* LEFT: Logo */}
      <div className="header-left">
        <img src="/images/JMLogo.png" alt="Logo" className="header-logo" />
      </div>

      {/* CENTER: Student Details / Title */}
      <div className="header-center">
        <h5 className="header-title">{t.WebsiteName}</h5>
      </div>

      {/* RIGHT: Existing Controls */}
      <div className="header-right">
        {/* <img src={Bars} alt="Menu" className="menu-icon" /> */}

        <button className="btn btn-primary mt-1" onClick={toggleLanguage}>
          {nextLanguage}
        </button>

        <div className="dropdown">
          <img
            src={Avatar}
            width="45"
            height="45"
            className="rounded-circle user-avatar"
            alt="User"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          />

          <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <div
              className="subscription-icons d-flex align-items-center"
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
              <span className="dropdown-item">{t.logout}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
