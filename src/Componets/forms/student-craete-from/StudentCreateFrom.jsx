import Form from "react-bootstrap/Form";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import "../student-craete-from/StudentCreateFrom.css";
import { Link, useNavigate } from "react-router-dom";
import { studentFormText } from "../../../i18n/studentForm";
import backArrow from "../../../assets/svg/chevron.png";

const API_URL = "https://localhost:7000/api/Student";

const StudentCreateFrom = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  const initialFormState = {
    nameWithFathersname: "",
    country: "",
    recordYear: "",
    studentStatus: "NEW",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    studentClass: "",
    classleavingDate: "",
    classAtLeaving: "",
    reasoneForLeaving: "",
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
    if (!formData.dateOfBirth) return t.dob + " is required";
    if (!formData.dateOfAdmission) return t.doa + " is required";
    if (!formData.class.trim()) return t.class + " is required";
    if (!formData.studentStatus.trim()) return t.studentStatus + " is required";

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
      DateOfBirth: formData.dateOfBirth,
      Ability: formData.ability || null,
      DateOfAdmission: formData.dateOfAdmission,
      Class: formData.class,
      ClassleavingDate: formData.classleavingDate || null,
      ClassAtLeaving: formData.classAtLeaving || null,
      reasoneForLeaving: formData.reasoneForLeaving || null,
      DateofDigri: formData.dateofDigri || null,
      remark: formData.remark || null,
      RecordYear: formData.recordYear,
      StudentStatus: formData.studentStatus,
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
    <div className="container-fluid p-2">
      {/* Header */}
      <div className="d-flex align-items-center bg-primary text-white rounded mb-2">
        <div className="w-25">
          <Link
            to="/layout/students-table"
            className="text-gray-800 px-6 py-2 mb-10 rounded-lg no-underline"
          >
            <button type="reset" className="btn btn-primary">
              <span>
                <img
                  src={backArrow}
                  alt=""
                  style={{
                    width: "12px",
                    height: "12px",
                    paddingBottom: "2px",
                  }}
                />{" "}
              </span>
              {t.back}
            </button>
          </Link>
        </div>

        <div className="w-50 text-center fw-bold pt-2">
          <p className="mb-0">{t.createStudentForm}</p>
        </div>

        <div className="w-25"></div>
      </div>
      <div className="form-div">
        {/* <!-- From Uiverse.io by kamehame-ha -->  */}
        <Form onSubmit={handleSubmit}>
          {/* <div className="row mt-3">
            <div className="col-md-6">
              <div class="coolinput">
                <label for="input" class="text">
                  Name:*
                </label>
                <input
                  type="text"
                  placeholder="Write here..."
                  name="input"
                  class="input"
                />
              </div>
            </div>
          </div> */}
          {/* Name & Country */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.nameWithFathersName}*</Form.Label>
              <Form.Control
                name="nameWithFathersname"
                value={formData.nameWithFathersname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.country}*</Form.Label>
              <Form.Control
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date of birth & Ability */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.dob}*</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.ability}</Form.Label>
              <Form.Control
                name="ability"
                value={formData.ability}
                onChange={handleChange}
              />
            </div>
          </div>
        

          {/* Date Of Admission & Class */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.doa}*</Form.Label>
              <Form.Control
                type="date"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.class}*</Form.Label>
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
              <Form.Label>{t.classAtTimeOfLeaving}</Form.Label>
              <Form.Control
                name="classAtLeaving"
                value={formData.classAtLeaving}
                onChange={handleChange}
              />
            </div>
          </div>
          {/*  reason for leaving & Degree */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.reasoneForLeaving}</Form.Label>
              <Form.Control
                name="reasoneForLeaving"
                value={formData.reasoneForLeaving}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.degreeDate}*</Form.Label>
              <Form.Control
                type="date"
                name="dateofDigri"
                value={formData.dateofDigri}
                onChange={handleChange}
              />
              <label className="form-check-label" style={{ textDecoration: "none", color: "black" }}>{t.new}</label>
            </div>
          </div>
          {/* status & remark*/}
          <div className="row mt-3">
            <div className="col-md-6 col-sm-12">
              <Form.Label>{t.remark}</Form.Label>
              <Form.Control
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />
              <label className="form-check-label" style={{ textDecoration: "none", color: "black" }}>{t.old}</label>
            </div>
            <div className="col-md-6">
              <Form.Label>{t.studentYearRecord}*</Form.Label>
              <Form.Control
                type="date"
                name="recordYear"
                value={formData.recordYear}
                onChange={handleChange}
              />
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <Form.Label>{t.studentStatus}*</Form.Label>
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
              {t.submit}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StudentCreateFrom;
