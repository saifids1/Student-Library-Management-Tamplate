import Form from "react-bootstrap/Form";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import "../student-craete-from/StudentCreateFrom.css";
import { Link, useNavigate } from "react-router-dom";
import { studentFormText } from "../../../i18n/studentForm";

const API_URL = "https://localhost:7000/api/Student";

const StudentCreateFrom = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  const initialFormState = {
    nameWithFathersname: "",
    address: "",
    country: "India",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    studentClass: "",
    classleavingDate: "",
    reasoneForLeaving: "",
    classLeavingTime: "",
    recordYear: "",
    dateOfDegree: "",
    quality: "",
    studentStatus: 1,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.nameWithFathersname.trim())
      return `${t.nanameWithFathersNameme} is required`;

    if (!formData.address.trim()) return `${t.watanAddress} is required`;

    if (!formData.studentClass.trim()) return `${t.class} is required`;

    if (!formData.dateOfBirth) return `${t.dob} is required`;

    if (!formData.dateOfAdmission) return `${t.doa} is required`;

    // Student status check
    if (![1, 2].includes(formData.studentStatus))
      return `${t.studentStatus} is required`;

    // DOB should be before Admission Date
    if (new Date(formData.dateOfBirth) >= new Date(formData.dateOfAdmission)) {
      return `${t.dob} must be before ${t.doa}`;
    }

    // If leaving date exists → class at leaving must exist
    if (formData.classleavingDate && !formData.classLeavingTime?.trim()) {
      return `${t.classAtTimeOfLeaving} is required`;
    }

    return null; // ✅ valid
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      Swal.fire({
        icon: "warning",
        title: "Required Field",
        text: errorMessage,
      });
      return;
    }

    const payload = {
      nameWithFathersname: formData.nameWithFathersname,
      country: formData.country,
      dateOfBirth: formData.dateOfBirth,
      dateOfAdmission: formData.dateOfAdmission,
      ability: formData.ability || null,
      class: formData.studentClass,
      classleavingDate: formData.classleavingDate || null,
      classLeavingTime: formData.classLeavingTime || null,
      reasoneForLeaving: formData.reasoneForLeaving || null,
      dateofDigri: formData.dateOfDegree || null,
      address: formData.address,
      studentStatus: formData.studentStatus,
      RecordYear: formData.recordYear,
      quality: formData.quality || null,
    };

    try {
      await axios.post(API_URL, payload);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Student created successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/layout/students-table");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormState);
    Swal.fire({
      icon: "info",
      title: "Cleared",
      text: "Form has been cleared",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <div className="container-fluid p-2 studentCreateFrom">
      {/* Header */}
      <div className="d-flex align-items-center bg-primary text-white rounded mb-2">
        <div className="w-25">
          <Link
            to="/layout/students-table"
            className="text-white text-decoration-none"
          >
            <button type="button" className="btn btn-primary">
              &laquo; {t.back}
            </button>
          </Link>
        </div>

        <div className="w-50 text-center fw-bold pt-2">
          <p className="mb-0">{t.createStudentForm}</p>
        </div>

        <div className="w-25"></div>
      </div>

      <div className="form-div">
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 rounded bg-white">
          {/* Row 1 */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t.nameWithFathersName} *</label>
              <input
                className="form-control"
                name="nameWithFathersname"
                value={formData.nameWithFathersname}
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.watanAddress} *</label>
              <input
                className="form-control"
                name="address"
                value={formData.address}
                placeholder="Enter address"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">{t.dob} *</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.doa} *</label>
              <input
                type="date"
                className="form-control"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">{t.ability}</label>
              <input
                className="form-control"
                name="ability"
                value={formData.ability}
                placeholder="Enter ability"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.class} *</label>
              <input
                className="form-control"
                name="studentClass"
                value={formData.studentClass}
                placeholder="Enter class"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Row 4 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">{t.leavingDate}</label>
              <input
                type="date"
                className="form-control"
                name="classleavingDate"
                value={formData.classleavingDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.reasoneForLeaving}</label>
              <input
                className="form-control"
                name="reasoneForLeaving"
                value={formData.reasoneForLeaving}
                placeholder="Reason for leaving"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Row 5 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">{t.classAtTimeOfLeaving} *</label>
              <input
                className="form-control"
                name="classLeavingTime"
                value={formData.classLeavingTime}
                placeholder="Class at time of leaving"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.studentYearRecord} *</label>
              <input
                type="date"
                className="form-control"
                name="recordYear"
                value={formData.recordYear}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Row 6 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">{t.degreeDate}</label>
              <input
                type="date"
                className="form-control"
                name="dateOfDegree"
                value={formData.dateOfDegree}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t.remark}</label>
              <input
                type="text"
                className="form-control"
                name="quality"
                value={formData.quality}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Row 7 - Radio inline */}
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <label className="form-label d-block">{t.studentStatus}</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="studentStatus"
                  checked={formData.studentStatus === 1}
                  onChange={() =>
                    setFormData((p) => ({ ...p, studentStatus: 1 }))
                  }
                />
                <label
                  className="form-check-label"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {t.new}
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="studentStatus"
                  checked={formData.studentStatus === 2}
                  onChange={() =>
                    setFormData((p) => ({ ...p, studentStatus: 2 }))
                  }
                />
                <label
                  className="form-check-label"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {t.old}
                </label>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleClearForm}
            >
              {t.clear}
            </button>
            <button type="submit" className="btn btn-primary">
              {t.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentCreateFrom;
