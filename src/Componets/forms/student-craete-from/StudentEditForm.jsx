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
    address: "",
    country: "India",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    class: "",
    classleavingDate: "",
    resoneForLeaving: "",
    classLeavingTime: "",
    studentRecordYear: "",
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
          studentRecordYear: data.studentRecordYear?.split("T")[0] || "",
          studentStatus: data.studentStatus || "NEW",
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          dateOfAdmission: data.dateOfAdmission?.split("T")[0] || "",
          ability: data.ability || "",
          class: data.class || "",
          classleavingDate: data.classleavingDate?.split("T")[0] || "",
          classAtLeaving: data.classAtLeaving || "",
          classLeavingTime: data.classLeavingTime || "",
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
      address: formData.address,
      country: formData.country,

      dateOfBirth: formData.dateOfBirth || null,
      dateOfAdmission: formData.dateOfAdmission || null,

      ability: formData.ability || null,
      class: formData.class,

      classleavingDate: formData.classleavingDate || null,
      classLeavingTime: formData.classLeavingTime || null,
      resoneForLeaving: formData.resoneForLeaving || null,

      studentRecordYear: formData.studentRecordYear,
      dateofDigri: formData.dateofDigri || null,
      quality: formData.quality || null,

      studentStatus: Number(formData.studentStatus),
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
        <form onSubmit={handleSubmit} className="p-4 rounded bg-white">
          {/* Row 1 */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{t.name} *</label>
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
                name="class"
                value={formData.class}
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
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t.studentYearRecord} *</label>
              <input
                type="date"
                className="form-control"
                name="studentRecordYear"
                value={formData.studentRecordYear}
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
                name="dateofDigri"
                value={formData.dateofDigri}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t.remark}</label>
              <input
                className="form-control"
                name="quality"
                value={formData.quality}
                placeholder="Any remarks"
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
            <button type="submit" className="btn btn-primary">
              {t.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEditForm;
