import "../sidebar/Sidebar.css";
import { useLanguage } from "../../context/LanguageContext";
import { NavLink } from "react-router-dom";
import { studentFormText } from "../../i18n/studentForm";

const Sidebar = () => {
  const { language } = useLanguage();
  const t = studentFormText[language];

  const menuItems = [
    {
      path: "/layout/student-create-form",
      label: t.StudentCreateFrom,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a3 3 0 0 1 3 3v1h1a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h1V3a3 3 0 0 1 3-3z"/>
        </svg>
      ),
    },
    {
      path: "/layout/students-table",
      label: t.StudentsTable,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm2 1v2h12V3H2zm0 3v2h12V6H2zm0 3v2h12V9H2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu" >
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
            style={{border:"0.5px solid #00000030"}}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
