import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { studentFormText } from "../i18n/studentForm";

const Pageheader = ({backbtn ,heading }) => {
  const { language } = useLanguage();
  const t = studentFormText[language];
  return (
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
            style={{ textDecoration: "underline" }}
          >
            <span style={{ letterSpacing: "-2px", marginRight: "" }}>
              <i className="fa-solid fa-angles-left"></i>
            </span>
            {t.back}
          </button>
        </Link>

        ): ""}
      </div>
      <div className="text-center w-50 fw-bold pt-2">
        <p>{heading}</p>
      </div>
      <div className="w-25"></div>
    </div>
  );
};

export default Pageheader;
