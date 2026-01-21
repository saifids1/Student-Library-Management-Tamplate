import React from "react";
import "../students/StudentsTable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UpDownArrow from "../../../assets/dasdhboard/up-down.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

import { studentFormText } from "../../../i18n/studentForm";


const API_URL = "https://localhost:7000/api/Student";



 


const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

   const { language } = useLanguage();
  const t = studentFormText[language];

   useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(API_URL);
        setStudents(res.data); // API returns array
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toISOString().split("T")[0];
};

const filteredStudents = students.filter((student) => {
  const search = searchTerm.toLowerCase();

  return (
    student.nameWithFathersname?.toLowerCase().includes(search) ||
    student.country?.toLowerCase().includes(search) ||
    formatDate(student.dateOfBirth).includes(search) ||
    formatDate(student.dateOfAdmission).includes(search) ||
    student.class?.toLowerCase().includes(search)
  );
});




// EDIT
const handleEdit = (id) => {
  navigate(`/layout/student/edit/${id}`);
};

// DELETE
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    // Remove deleted student from UI
    setStudents((prev) => prev.filter((s) => s.id !== id));
    alert("Student deleted successfully");
  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete student");
  }
};

  return (
    <div className="card students-table">
      <div className="container-fluid px-4 py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-semibold">{t.StudentsList}</h5>
          <a href="/layout/student-create-form">
            <button className="btn btn-outline-primary btn-sm">
             {t.CreateStudent}
            </button>
          </a>
        </div>
        {/* Controls */}
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm">
              Show 10 rows{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </button>
            <button className="btn btn-primary btn-sm">CSV</button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold">{t.Search}</span>
           
            <input
            type="text"
            className="form-control form-control-sm w-64 search-bar"
            placeholder={`Search by ${t.name}, ${t.country}, ${t.class}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          </div>
        </div>
        {/* Table */}
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-bordered  table-striped  table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="text-start">
                   {t.name}
                  <img
                    src={UpDownArrow}
                    alt=""
                    style={{ width: "14px", height: "14px" }}
                  />
                </th>
                <th>

              {t.country}               
                 <img
                    src={UpDownArrow}
                    alt=""
                    style={{ width: "14px", height: "14px" }}
                  />
                </th>
                <th>
                  {t.dob}
                  <img
                    src={UpDownArrow}
                    alt=""
                    style={{ width: "14px", height: "14px" }}
                  />
                </th>
                <th>
                  {t.doa}
                  <img
                    src={UpDownArrow}
                    alt=""
                    style={{ width: "14px", height: "14px" }}
                  />
                </th>
                <th>
                  {t.class}
                  <img
                    src={UpDownArrow}
                    alt=""
                    style={{ width: "14px", height: "14px" }}
                  />
                </th>
                <th className="text-center">{t.action}</th>
              </tr>
            </thead>
            <tbody>
              
                    {filteredStudents.map((student) => (

                  <tr key={student.id} className="align-middle">
                    <td className="text-start">
                      {student.nameWithFathersname}
                    </td>
                    <td>{student.country}</td>
                    <td>{formatDate(student.dateOfBirth)}</td>
                    <td>{formatDate(student.dateOfAdmission)}</td>
                    <td>{student.class}</td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(student.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                          //  fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </button>
                      <button className="btn btn-outline-danger btn-sm"
                       onClick={() => handleDelete(student.id)}
                      
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card"></div>
    </div>
  );
};

export default StudentsTable;
