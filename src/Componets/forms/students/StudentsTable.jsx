import React, { useEffect, useState } from "react";
import "../students/StudentsTable.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { studentFormText } from "../../../i18n/studentForm";

import UpDownArrow from "../../../assets/dasdhboard/up-down.png";
import pdfIcon from "../../../assets/svg/pdf-file.png";
import excelIcon from "../../../assets/svg/xlsx-file-format-extension.png";
import moreicon from "../../../assets/svg/more.png";
import csvIcon from "../../../assets/svg/csv.png";

const API_URL = "https://localhost:7000/api/Student";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(API_URL);
        setStudents([...res.data].reverse());
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

  // 🔹 filter
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

  // 🔹 pagination calculations
  const totalRecords = filteredStudents.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + rowsPerPage,
  );
  const startEntry = totalRecords === 0 ? 0 : startIndex + 1;
  const endEntry = Math.min(startIndex + rowsPerPage, totalRecords);

  // EDIT
  const handleEdit = (id) => {
    navigate(`/layout/student/edit/${id}`);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Student deleted successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="card students-table">
      <div className="container-fluid px-4 py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="w-20">
            <h5 className="fw-semibold">{t.StudentsList}</h5>
          </div>

          <div className=" text-center">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold">{t.Search}</span>
              <input
                type="text"
                className="form-control form-control-sm w-65 search-bar"
                placeholder={`${t.searchBy} ${t.name}, ${t.country}, ${t.class}`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
              />
            </div>
          </div>

          <div className=" text-end icons-div">
            <img src={csvIcon} alt=""  data-toggle="tooltip" data-placement="left" title={t.convertToCSV} />
            <img src={excelIcon} alt=""  data-toggle="tooltip" data-placement="left" title={t.convertToEXL}/>
            <img src={pdfIcon} alt=""  data-toggle="tooltip" data-placement="left" title={t.convertToPDF}/>
            <Link to="/layout/student-create-form"><img src={moreicon} alt=""  data-toggle="tooltip" data-placement="left" title={t.addStudent} /></Link>
          </div>
        </div>

        <hr />

        {/* Table */}
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-bordered table-striped table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th>
                  {t.nameWithFathersName} <img src={UpDownArrow} width="14" />
                </th>
                <th>
                  {t.country} <img src={UpDownArrow} width="14" />
                </th>
                <th>
                  {t.dob} <img src={UpDownArrow} width="14" />
                </th>
                <th>
                  {t.doa} <img src={UpDownArrow} width="14" />
                </th>
                <th>
                  {t.class} <img src={UpDownArrow} width="14" />
                </th>
                <th className="text-center">{t.action}</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.nameWithFathersname}</td>
                  <td>{student.country}</td>
                  <td>{formatDate(student.dateOfBirth)}</td>
                  <td>{formatDate(student.dateOfAdmission)}</td>
                  <td>{student.class}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleEdit(student.id)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination footer (design unchanged) */}
          <div className="row p-0 m-0">
            <div className="col pagination pt-4">
              <p>
                {t.show} : <input type="number" value={rowsPerPage} readOnly /> {t.enteries}{" "}
                {startEntry} {t.to} {endEntry} {t.rowOutOf} <b>{totalRecords}</b>
              </p>
            </div>

            <div className="col pt-3 text-end">
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button 
                  style ={{borderRadius : "5px 0px 0px 5px"}}
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    &laquo;
                  </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 && "active"}`}
                  >
                    <button
                    style={{borderRadius: "0px"}}
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                      style ={{borderRadius : "0px 5px 5px 0px"}}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
