import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { studentFormText } from "../../../i18n/studentForm";
import backArrow from "../../../assets/svg/chevron.png";

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
    studentStatus: 1,
  });

  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data;

        setFormData({
          nameWithFathersname: data.nameWithFathersname || "",
          address: data.address || "",
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

  /* ================= UPDATE ================= */
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
              <span>
                <img
                  src={backArrow}
                  alt=""
                  style={{
                    width: "12px",
                    height: "12px",
                    paddingBottom: "2px",
                  }}
                />
              </span>{" "}
              {t.back}
            </button>
          </Link>
        </div>
        <div className="text-center w-50 fw-bold pt-2">
          <p>{t.editStudentFrom}</p>
        </div>
      </div>
      <div className="form-div">
        <Form onSubmit={handleSubmit}>
          {/* Name & Country */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.nameWithFathersName}*</Form.Label>
              <Form.Control
                name="nameWithFathersname"
                value={formData.nameWithFathersname}
                placeholder="Enter full name"
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
          {/* Dates */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.dob}*</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
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
                placeholder="Enter class"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <Form.Label>{t.leavingDate}*</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                name="classleavingDate"
                value={formData.classleavingDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t.resoneForLeaving}</label>
              <input
                className="form-control"
                name="resoneForLeaving"
                value={formData.resoneForLeaving}
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
                required
              />
            </div>

            <div className="col-md-6">
              <Form.Label>{t.classAtTimeOfLeaving}*</Form.Label>
              <Form.Control
                name="classAtLeaving"
                value={formData.classAtLeaving}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* reasone for leaving & degree date */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.reasoneForLeaving}*</Form.Label>
              <Form.Control
                name="quality"
                value={formData.reasoneForLeaving}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>{t.degreeDate}*</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
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
                placeholder="Any remarks"
                onChange={handleChange}
              />
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
          </div>
          {/* Student Status */}
          <div className="row mt-3">
            <div className="col-md-6">
              <Form.Label>{t.studentStatus} *</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  name="studentStatus"
                  checked={formData.studentStatus === 1}
                  onChange={() =>
                    setFormData((p) => ({ ...p, studentStatus: 1 }))
                  }
                />
                <label className="form-check-label" style={{ textDecoration: "none", color: "black" }}>{t.new}</label>
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
                <label className="form-check-label" style={{ textDecoration: "none", color: "black" }}>{t.old}</label>
              </div>
            </div>
          </div>
          {/* Submit */}
          <div className="form-buttons text-end mt-4">
            <button type="submit" className="btn btn-outline-primary">
              {t.update}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default StudentEditForm;
