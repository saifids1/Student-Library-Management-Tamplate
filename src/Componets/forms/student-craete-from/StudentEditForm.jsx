import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { studentFormText } from "../../../i18n/studentForm";

const API_URL = "https://localhost:7000/api/Student";

const StudentEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  const [formData, setFormData] = useState({
    nameWithFathersname: "",
    country: "",
    recordYear: "",
    studentStatus: "NEW",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    class: "",
    classleavingDate: "",
    classAtLeaving: "",
    reasoneForLeaving: "",
    dateofDigri: "",
    quality: "",
  });

  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data;

        setFormData({
          nameWithFathersname: data.nameWithFathersname || "",
          country: data.country || "",
          recordYear: data.recordYear || "",
          studentStatus: data.studentStatus || "NEW",
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          dateOfAdmission: data.dateOfAdmission?.split("T")[0] || "",
          ability: data.ability || "",
          class: data.class || "",
          classleavingDate: data.classleavingDate?.split("T")[0] || "",
          classAtLeaving: data.classAtLeaving || "",
          reasoneForLeaving: data.reasoneForLeaving || "",
          dateofDigri: data.dateofDigri?.split("T")[0] || "",
          quality: data.quality || "",
        });
      } catch {
        Swal.fire("Error", "Failed to load student data", "error");
      }
    };

    fetchStudent();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/${id}`, {
        ...formData,
        id: Number(id),
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Student updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/layout/students-table");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="studentCreateFrom">
      <div className="heading d-flex bg-primary text-white rounded mb-2">
        <div className="w-25">
          <Link to="/layout/students-table">
            <button type="button" className="btn btn-primary">
              {"<< "} {t.back}
            </button>
          </Link>
        </div>
        <div className="text-center w-50 fw-bold pt-2">
          <p>{t.editStudentFrom}</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        {/* Name & Country */}
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.nameWithFathersName} *</Form.Label>
            <Form.Control
              name="nameWithFathersname"
              value={formData.nameWithFathersname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <Form.Label>{t.country} *</Form.Label>
            <Form.Control
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="col-md-6">
            <Form.Label>{t.ability}</Form.Label>
            <Form.Control
              name="ability"
              value={formData.ability}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* date of admission and class */}
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.doa} *</Form.Label>
            <Form.Control
              type="date"
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <Form.Label>{t.class} *</Form.Label>
            <Form.Control
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Leaving Details */}
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.leavingDate}</Form.Label>
            <Form.Control
              type="date"
              name="classleavingDate"
              value={formData.classleavingDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <Form.Label>{t.classAtTimeOfLeaving}</Form.Label>
            <Form.Control
              name="classAtLeaving"
              value={formData.classAtLeaving}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* reasone for leaving & degree date */}
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.reasoneForLeaving}</Form.Label>
            <Form.Control
              name="quality"
              value={formData.reasoneForLeaving}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>{t.degreeDate}</Form.Label>
            <Form.Control
              type="date"
              name="dateofDigri"
              value={formData.dateofDigri}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.remark}</Form.Label>
            <Form.Control
              name="quality"
              value={formData.quality}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>{t.studentYearRecord} *</Form.Label>
            <Form.Control
              type="number"
              name="recordYear"
              value={formData.recordYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Student Status */}
        <div className="row mt-3">
          <div className="col-md-6">
            <Form.Label>{t.studentStatus} *</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label={t.new}
                name="studentStatus"
                value="NEW"
                checked={formData.studentStatus === "NEW"}
                onChange={handleChange}
                required
              />
              <Form.Check
                type="radio"
                label={t.old}
                name="studentStatus"
                value="OLD"
                checked={formData.studentStatus === "OLD"}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="form-buttons text-end mt-4">
          <button type="submit" className="btn btn-outline-primary">
            {t.update}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default StudentEditForm;
