import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { studentFormText } from "../i18n/studentForm";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Pageheader = ({ backbtn, heading, editStudent }) => {
  const { language } = useLanguage();
  const t = studentFormText[language];
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuBar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = (id) => {
    navigate(`/layout/student/edit/${id}`);
  };
  return (
    <>
      <div className="heading d-flex bg-primary text-white rounded mb-2">
        <div className="w-25">
          {backbtn ? (
            <Link
              to="/layout/students-table"
              className="text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline"
            >
              <button
                type="reset"
                className="btn btn-primary fw-bold"
                style={{ textDecoration: "" }}
              >
                <span style={{ letterSpacing: "-2px", marginRight: "" }}>
                  <i className="fa-solid fa-angles-left"></i>
                </span>
                {t.back}
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="text-center w-50 fw-bold pt-2">
          <p>{heading}</p>
        </div>
        <div className="w-25 text-end m">
          {editStudent ? (
            <button
              className="btn btn-primary"
              title="Update Student"
          
             onClick={() => handleEdit(editStudent)}
            >
              <i class="fas fa-edit"></i>
            </button>
          ) : (
            " "
          )}
        </div>
        <div className="text-end menu-btn">
          {/* <i class="fa-solid fa-circle-chevron-down"></i> */}
          <button className="btn btn-primary" onClick={handleMenuBar}>
            ☰
          </button>
        </div>
      </div>
      <div
        className={`menu-bar justify-content-end text-end ${isMenuOpen ? "d-flex" : "d-none"}`}
      >
        <ul>
          {/* Create Student */}
          <li>
            <NavLink
              to="/layout/student-create-form"
              style={{ width: "100%", display: "inline-block" }}
              className={({ isActive }) =>
                `text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline ${
                  isActive ? "active" : ""
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "8px" }}
              >
                <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793zM1 7v3h14V7zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              {t.StudentCreateFrom}
            </NavLink>
          </li>

          {/* Students Table */}
          <li>
            <NavLink
              to="/layout/students-table"
              style={{ width: "100%", display: "inline-block" }}
              className={({ isActive }) =>
                `text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline ${
                  isActive ? "active" : ""
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "8px" }}
              >
                <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793zM1 7v3h14V7zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              {t.StudentsTable}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/layout/new-records"
              style={{ width: "100%", display: "inline-block" }}
              className={({ isActive }) =>
                `text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline ${
                  isActive ? "active" : ""
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "8px" }}
              >
                <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793zM1 7v3h14V7zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              {t.newRecords}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/layout/old-records"
              style={{ width: "100%", display: "inline-block" }}
              className={({ isActive }) =>
                `text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline ${
                  isActive ? "active" : ""
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "8px" }}
              >
                <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793zM1 7v3h14V7zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              </svg>
              {t.oldRecords}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pageheader;
