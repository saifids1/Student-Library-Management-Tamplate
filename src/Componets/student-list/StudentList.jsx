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
  const exportData = students.map((s, index) => ({
    "Sr No": index + 1 + first,
    Name: s.nameWithFathersname,
    Country: s.country,
    "Date of Birth": formatDate(s.dateOfBirth),
    Quality: s.quality || s.ability || "-",
    "Date of Admission": formatDate(s.dateOfAdmission),
    Class: s.class,
    "Leaving Date": formatDate(s.classleavingDate),
    "Class At Time Of Leaving": s.class,
    "Reason For Leaving": s.reasonForLeaving,
    "Degree Date": s.dateofDigri ? formatDate(s.dateofDigri) : "-",
    Ability: s.ability || "-",
  }));

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "students.xlsx");
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(exportData);

    const csv = XLSX.utils.sheet_to_csv(ws);

    saveAs(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
      "students.csv",
    );
  };
  const exportPDF = () => {
    const doc = new jsPDF("l", "mm", "a4"); // landscape for more columns

    doc.addFileToVFS("Urdu.ttf", urduFont);
    doc.addFont("Urdu.ttf", "Urdu", "normal", "Identity-H");

    const isUrdu = language === "ur";
    doc.setFont(isUrdu ? "Urdu" : "helvetica");

    const headers = [
      [
        t.srNo,
        t.nameWithFathersName,
        t.country,
        t.dob,
        t.quality,
        t.doa,
        t.class,
        t.leavingDate,
        t.classAtTimeOfLeaving,
        t.reasoneForLeaving,
        t.degreeDate,
        t.ability,
      ],
    ];

    const rows = students.map((s, index) => [
      index + 1 + first,
      s.nameWithFathersname,
      s.country,
      formatDate(s.dateOfBirth),
      s.quality || s.ability || "-",
      formatDate(s.dateOfAdmission),
      s.class,
      formatDate(s.classleavingDate),
      s.class,
      s.reasonForLeaving,
      s.dateofDigri ? formatDate(s.dateofDigri) : "-",
      s.ability || "-",
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      styles: {
        font: isUrdu ? "Urdu" : "helvetica",
        halign: isUrdu ? "right" : "left",
      },
      headStyles: {
        halign: isUrdu ? "right" : "left",
      },
      margin: { top: 20 },
    });

    doc.save(isUrdu ? "طلباء.pdf" : "students.pdf");
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
            onClick={exportPDF}
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
        <Column
          header={t.srNo}
          body={(rowData, options) => options.rowIndex + 1 + first}
        />
        <Column field="nameWithFathersname" header={t.nameWithFathersName} />
        <Column field="country" header={t.country} />
        <Column
          field="dateOfBirth"
          header={t.dob}
          body={(r) => formatDate(r.dateOfBirth)}
        />
        <Column field="quality" header={t.remark} />
        <Column
          field="dateOfAdmission"
          header={t.doa}
          body={(r) => formatDate(r.dateOfAdmission)}
        />
        <Column field="class" header={t.class} />
        <Column
          field="classleavingDate"
          header={t.leavingDate}
          body={(r) => formatDate(r.classleavingDate)}
        />
        <Column field="class" header={t.classAtTimeOfLeaving} />
        <Column field="reasonForLeaving" header={t.reasoneForLeaving} />
        <Column field="dateofDigri" header={t.degreeDate} />
        <Column field="ability" header={t.quality} />
        <Column header={t.action} body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default StudentList;
