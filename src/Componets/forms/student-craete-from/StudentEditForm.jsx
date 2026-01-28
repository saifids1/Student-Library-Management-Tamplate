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
          watan: data.watan || "",
          recordYear: data.recordYear || "",
          studentStatus: data.studentStatus || "NEW",
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          dateOfAdmission: data.dateOfAdmission?.split("T")[0] || "",
          ability: data.ability || "",
          class: data.class || "",
          classleavingDate: data.classleavingDate?.split("T")[0] || "",
          classAtLeaving: data.classAtLeaving || "",
          resoneForLeaving: data.resoneForLeaving || "",
          dateofDigri: data.dateofDigri?.split("T")[0] || "",
          quality: data.quality || "",
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        Swal.fire("Error", "Failed to load student data", "error");
      }
    };

    fetchStudent();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= UPDATE STUDENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: Number(id),
      nameWithFathersname: formData.nameWithFathersname,
      country: formData.country,
      watan: formData.watan,
      recordYear: formData.recordYear,
      studentStatus: formData.studentStatus,
      dateOfBirth: formData.dateOfBirth,
      dateOfAdmission: formData.dateOfAdmission,
      ability: formData.ability || null,
      class: formData.class,
      classleavingDate: formData.classleavingDate || null,
      classAtLeaving: formData.classAtLeaving || null,
      resoneForLeaving: formData.resoneForLeaving || null,
      dateofDigri: formData.dateofDigri || null,
      quality: formData.quality || null,
    };

    try {
      await axios.put(`${API_URL}/${id}`, payload);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Student updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/layout/students-table");
    } catch (error) {
      console.error("Update Error:", error.response?.data);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="studentCreateFrom">
      <div className="heading d-flex bg-primary text-white rounded mb-2">
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
          <p>{t.editStudentFrom}</p>
        </div>
        <div className="w-25"></div>
      </div>
      <div className="form-div">
        <Form onSubmit={handleSubmit}>
          <Form.Text className="text-muted">{t.EditStudent}</Form.Text>
          {/* Name & Country */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.name} *</Form.Label>
              <Form.Control
                name="nameWithFathersname"
                value={formData.nameWithFathersname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.country}</Form.Label>
              <Form.Control
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Watan & Record Year */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.watanAddress}</Form.Label>
              <Form.Control
                name="watan"
                value={formData.watan}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.studentYearRecord}</Form.Label>
              <Form.Control
                type="number"
                name="recordYear"
                value={formData.recordYear}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Dates */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.dob}</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.doa}</Form.Label>
              <Form.Control
                type="date"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Ability & Class */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.ability}</Form.Label>
              <Form.Control
                name="ability"
                value={formData.ability}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.class}</Form.Label>
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
          {/* Degree & Quality */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.degreeDate}</Form.Label>
              <Form.Control
                type="date"
                name="dateofDigri"
                value={formData.dateofDigri}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.quality}</Form.Label>
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
            <button type="submit" className="btn btn-outline-primary">
              {t.create}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StudentEditForm;
