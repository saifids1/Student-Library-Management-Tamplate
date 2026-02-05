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
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";

const API_URL = `${BASE_URL}/Student`;

const StudentList = ({ students, loading, onEdit, setStudents }) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];
  /* ================= FORMAT DATE ================= */
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "-";

  /* **************** Search ******************* */

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });

    setGlobalFilterValue(value);
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
      setStudents((prev) => prev.filter((s) => s.id !== id));

      Swal.fire("Deleted!", "Student deleted successfully", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // EDIT
  const handleEdit = (id) => {
    navigate(`/layout/student/edit/${id}`);
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
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Country", "DOB", "DOA", "Class"]],
      body: exportData.map(Object.values),
    });
    doc.save("students.pdf");
  };

  /* ================= ACTION TEMPLATE ================= */
  const actionTemplate = (row) => (
    <>
      <button
        className="btn btn-outline-primary btn-sm me-2"
        onClick={() => handleEdit(row.id)}
      >
        ✏️
      </button>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => handleDelete(row.id)}
      >
        🗑️
      </button>
    </>
  );
  /* ================= UI ================= */
  return (
    <div className="card p-3">
      {/* EXPORT BUTTONS */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className=" text-center search-div">
          <div className="d-flex align-items-center gap-2 ">
            <span className="fw-semibold">{t.Search}</span>
            <IconField iconPosition="left">
              {/* <InputIcon className="pi pi-search" /> */}
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder={`${t.searchBy} ${t.name}, ${t.country}, ${t.class}`}
              />
            </IconField>
          </div>
        </div>

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
      <hr />
      {/* search  */}
      {/* TABLE */}
      <div className="table-responsive">
        <DataTable
          value={students}
          loading={loading}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          stripedRows
          responsiveLayout="scroll"
          className="table-striped"
          filters={filters}
          globalFilterFields={[
            "nameWithFathersname",
            "country",
            "class",
            "dateOfBirth",
            "dateOfAdmission",
          ]}
        >
          <Column
            field="nameWithFathersname"
            header={t.nameWithFathersName}
            sortable
          />
          <Column field="country" header={t.country} sortable />
          <Column
            field="dateOfBirth"
            header={t.dob}
            body={(r) => formatDate(r.dateOfBirth)}
            sortable
          />
          <Column
            field="dateOfAdmission"
            header={t.doa}
            body={(r) => formatDate(r.dateOfAdmission)}
            sortable
          />
          <Column field="class" header={t.class} sortable />
          <Column
            header={t.action}
            className="text-center justify-content-center"
            body={actionTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default StudentList;
