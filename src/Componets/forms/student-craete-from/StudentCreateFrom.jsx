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
    country: "",
    watan: "",
    recordYear: "",
    studentStatus: "NEW",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    class: "",
    classleavingDate: "",
    classAtLeaving: "",
    resoneForLeaving: "",
    dateofDigri: "",
    quality: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.nameWithFathersname.trim()) return t.name + " is required";
    if (!formData.country.trim()) return t.country + " is required";
    if (!formData.watan.trim()) return t.watanAddress + " is required";
    if (!formData.recordYear) return t.studentYearRecord + " is required";
    if (!formData.dateOfBirth) return t.dob + " is required";
    if (!formData.dateOfAdmission) return t.doa + " is required";
    if (!formData.class.trim()) return t.class + " is required";

    return null;
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
      NameWithFathersname: formData.nameWithFathersname,
      Country: formData.country,
      Watan: formData.watan,
      RecordYear: formData.recordYear,
      StudentStatus: formData.studentStatus,
      DateOfBirth: formData.dateOfBirth,
      DateOfAdmission: formData.dateOfAdmission,
      Ability: formData.ability || null,
      Class: formData.class,
      ClassleavingDate: formData.classleavingDate || null,
      ClassAtLeaving: formData.classAtLeaving || null,
      ResoneForLeaving: formData.resoneForLeaving || null,
      DateofDigri: formData.dateofDigri || null,
      Quality: formData.quality || null,
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
    <div className="studentCreateFrom pl-2">
      <div className="heading d-flex bg-primary text-white rounded mb-1">
        <div className="w-25">
          <Link
            to="/layout/students-table"
            className="text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline"
          >
            <button type="reset" className="btn btn-primary">
              <span style={{ letterSpacing: "-4px", marginRight: "6px" }}>
                {"<< "}
              </span>
              {t.back}
            </button>
          </Link>
        </div>
        <div className="text-center w-50 fw-bold pt-2">
          <p>{t.createStudentForm}</p>
        </div>
        <div className="w-25"></div>
      </div>
      <div className="form-div">
        <Form onSubmit={handleSubmit}>
          {/* Name & Country */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.name} *</Form.Label>
              <Form.Control
                name="nameWithFathersname"
                value={formData.nameWithFathersname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.country} *</Form.Label>
              <Form.Control
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Watan & Record Year */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.watanAddress} *</Form.Label>
              <Form.Control
                name="watan"
                value={formData.watan}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.studentYearRecord} *</Form.Label>
              <Form.Control
                type="date"
                name="recordYear"
                value={formData.recordYear}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.dob} *</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.doa} *</Form.Label>
              <Form.Control
                type="date"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Ability & Class */}
          <div className="row mt-3">
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.ability}</Form.Label>
              <Form.Control
                name="ability"
                value={formData.ability}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.class} *</Form.Label>
              <Form.Control
                name="class"
                value={formData.class}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Leaving Details */}
          <div className="row mt-3">
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.leavingDate}</Form.Label>
              <Form.Control
                type="date"
                name="classleavingDate"
                value={formData.classleavingDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.classAtTimeOfLeaving}*</Form.Label>
              <Form.Control
                name="classAtLeaving"
                value={formData.classAtLeaving}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Degree & Quality */}
          <div className="row mt-3">
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.degreeDate}</Form.Label>
              <Form.Control
                type="date"
                name="dateofDigri"
                value={formData.dateofDigri}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.remark}</Form.Label>
              <Form.Control
                name="quality"
                value={formData.quality}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* OLD / NEW */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.studentStatus}</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  label={t.new}
                  name="studentStatus"
                  value="NEW"
                  checked={formData.studentStatus === "NEW"}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label={t.old}
                  name="studentStatus"
                  value="OLD"
                  checked={formData.studentStatus === "OLD"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="form-buttons text-end mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={handleClearForm}
            >
              {t.clear}
            </button>
            <button type="submit" className="btn btn-outline-primary">
              {t.create}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StudentCreateFrom;
