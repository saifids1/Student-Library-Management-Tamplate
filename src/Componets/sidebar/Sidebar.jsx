import "../sidebar/Sidebar.css";
import { useLanguage } from "../../context/LanguageContext";
import { NavLink } from "react-router-dom";
import { studentFormText } from "../../i18n/studentForm";

const Sidebar = () => {
  const { language } = useLanguage();
  const t = studentFormText[language];

  return (
    <div className="sidebar">
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
  );
};

export default Sidebar;
