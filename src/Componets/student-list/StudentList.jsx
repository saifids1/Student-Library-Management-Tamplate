import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../../Constants/constants";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import pdfIcon from "../../assets/svg/pdf-file.png";
import excelIcon from "../../assets/svg/xlsx-file-format-extension.png";
import csvIcon from "../../assets/svg/csv.png";
import moreicon from "../../assets/svg/more.png";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import urduFont from "../../assets/fonts/urduFont";

const API_URL = `${BASE_URL}/Student`;

const StudentList = ({
  students,
  loading,
  totalRecords,
  first,
  rows,
  onPageChange,
  onSearch,
  onSort,
  sortField,
  sortOrder,
  refreshData,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  /* ================= FORMAT DATE ================= */
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "-";

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire("Deleted!", "Student deleted successfully", "success");
      refreshData(); // ✅ correct
    } catch (error) {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (id) => {
    navigate(`/layout/student/edit/${id}`);
  };
  const handleViewDetails = (id) => {
    navigate(`/layout/student/details/${id}`);
  };

  /* ================= EXPORT ================= */
  const exportData = students.map((s) => ({
    Name: s.nameWithFathersname,
    Country: s.country,
    DOB: formatDate(s.dateOfBirth),
    DOA: formatDate(s.dateOfAdmission),
    Class: s.class,
  }));

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    saveAs(
      new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })]),
      "students.xlsx",
    );
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    saveAs(
      new Blob([XLSX.utils.sheet_to_csv(ws)], {
        type: "text/csv;charset=utf-8;",
      }),
      "students.csv",
    );
  };
  const exportPDF = () => {
    const currentLang = language;
    const labels = studentFormText[currentLang];

    const doc = new jsPDF("p", "mm", "a4");

    // Load Urdu Font
    doc.addFileToVFS("Urdu.ttf", urduFont);
    doc.addFont("Urdu.ttf", "Urdu", "normal", "Identity-H");
    doc.setFont(currentLang === "ur" ? "Urdu" : "helvetica");

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;
    const rowHeight = 10;
    const colWidth = pageWidth / 5;

    // Columns (Reverse for Urdu)
    const headers =
      currentLang === "ur"
        ? [
            labels.class,
            labels.dateOfAdmission,
            labels.dateOfBirth,
            labels.country,
            labels.nameWithFathersname,
          ]
        : [
            labels.nameWithFathersname,
            labels.country,
            labels.dateOfBirth,
            labels.dateOfAdmission,
            labels.class,
          ];

    const rows = exportData.map((r) =>
      currentLang === "ur"
        ? [r.Class, r.DOA, r.DOB, r.Country, r.Name]
        : [r.Name, r.Country, r.DOB, r.DOA, r.Class],
    );

    // 🔹 Draw Header
    headers.forEach((header, i) => {
      const x =
        currentLang === "ur" ? pageWidth - colWidth * (i + 1) : colWidth * i;

      doc.rect(x, y, colWidth, rowHeight);
      doc.text(header, x + colWidth - 2, y + 6, {
        align: currentLang === "ur" ? "right" : "left",
      });
    });

    y += rowHeight;

    // 🔹 Draw Rows
    rows.forEach((row) => {
      row.forEach((cell, i) => {
        const x =
          currentLang === "ur" ? pageWidth - colWidth * (i + 1) : colWidth * i;

        doc.rect(x, y, colWidth, rowHeight);
        doc.text(String(cell), x + colWidth - 2, y + 6, {
          align: currentLang === "ur" ? "right" : "left",
        });
      });

      y += rowHeight;

      // Add new page if overflow
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(currentLang === "ur" ? "طلباء.pdf" : "students.pdf");
  };

  /* ================= ACTION COLUMN ================= */
  const actionTemplate = (row) => (
    <>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-primary btn-sm me-2"
          onClick={() => handleViewDetails(row.id)}
          title={t.viewDetails}
        >
          {/* <Info /> */}
          <span
            style={{
              border: "1px solid blue",
              borderRadius: "50%",
              padding: "2px 6px",
            }}
          >
            𝓲
          </span>
          {/* ✏️ */}
        </button>
        {/* <button
        className="btn btn-outline-primary btn-sm me-2"
        onClick={() => handleEdit(row.id)}
         title="View Details"
      >
       
        ✏️
      </button> */}
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleDelete(row.id)}
          title={t.deleteStudent}
        >
          🗑️
        </button>
      </div>
    </>
  );

  /* ================= UI ================= */
  return (
    <div className="card p-3">
      {/* SEARCH + EXPORT */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <IconField>
          <label htmlFor="">{t.Search} : </label>
          <InputText
            value={searchValue}
            onChange={handleSearch}
            placeholder={`${t.searchBy} ${t.name}`}
          />
        </IconField>

        <div className=" text-end icons-div">
          <img
            src={csvIcon}
            alt=""
            title={t.convertToCSV}
            style={{ cursor: "pointer" }}
            onClick={exportCSV}
          />
          <img
            src={excelIcon}
            alt=""
            title={t.convertToEXL}
            style={{ cursor: "pointer" }}
            onClick={exportExcel}
          />
          <img
            src={pdfIcon}
            alt=""
            title={t.convertToPDF}
            style={{ cursor: "pointer" }}
          />
          {/* <img
            src={pdfIcon}
            alt=""
            title={t.convertToPDF}
            style={{ cursor: "pointer" }}
            onClick={exportPDF}
          /> */}
          <Link to="/layout/student-create-form">
            <img
              src={moreicon}
              alt=""
              data-toggle="tooltip"
              data-placement="left"
              title={t.addStudent}
            />
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        value={students}
        lazy
        loading={loading}
        paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={onPageChange}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
        dataKey="id"
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="nameWithFathersname" header={t.nameWithFathersName} />
        <Column field="country" header={t.country} />
        <Column
          field="dateOfBirth"
          header={t.dob}
          body={(r) => formatDate(r.dateOfBirth)}
        />
        <Column
          field="dateOfAdmission"
          header={t.doa}
          body={(r) => formatDate(r.dateOfAdmission)}
        />
        <Column field="class" header={t.class} />
        <Column header={t.action} body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default StudentList;
