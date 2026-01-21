import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { studentFormText } from "../../../i18n/studentForm";
import { Link } from "react-router-dom";


const API_URL = "https://localhost:7000/api/Student";

const StudentEditForm = () => {

   

  const { id } = useParams(); // student id from URL
  const navigate = useNavigate();
const { language } = useLanguage();
const t = studentFormText[language];

  const [formData, setFormData] = useState({
    nameWithFathersname: "",
    country: "",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
    class: "",
    classleavingDate: "",
    resoneForLeaving: "",
    dateofDigri: "",
    quality: ""
  });

  /* ================= FETCH STUDENT BY ID ================= */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);

        const data = res.data;

        setFormData({
          nameWithFathersname: data.nameWithFathersname || "",
          country: data.country || "",
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          dateOfAdmission: data.dateOfAdmission?.split("T")[0] || "",
          ability: data.ability || "",
          class: data.class || "",
          classleavingDate: data.classleavingDate?.split("T")[0] || "",
          resoneForLeaving: data.resoneForLeaving || "",
          dateofDigri: data.dateofDigri?.split("T")[0] || "",
          quality: data.quality || ""
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to load student data");
      }
    };

    fetchStudent();
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= UPDATE STUDENT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
  id: Number(id),
  nameWithFathersname: formData.nameWithFathersname,
  country: formData.country,
  dateOfBirth: formData.dateOfBirth,
  dateOfAdmission: formData.dateOfAdmission,
  ability: formData.ability || null,
  class: formData.class,
  classleavingDate: formData.classleavingDate || null,
  resoneForLeaving: formData.resoneForLeaving || null,
  dateofDigri: formData.dateofDigri || null,
  quality: formData.quality || null
};


   

    try {
      await axios.put(`${API_URL}/${id}`, payload);
     // alert("Student updated successfully");
       Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Student updated successfully",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/layout/students-table")
    } catch (error) {
      console.error("Update Error:", error.response?.data);
      alert("Update failed");
    }
  };

  return (
    <div className="studentCreateFrom">
        {/* <Card.Body> */}
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
                <Form.Label>{t.doa}*</Form.Label>
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
                <Form.Label>{t.reason}</Form.Label>
                <Form.Control
                  name="resoneForLeaving"
                  value={formData.resoneForLeaving}
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

            {/* Buttons */}
            <div className="text-end mt-4">
               <button type="submit" className="btn btn-outline-primary">{t.create}</button>

               <Link
            to="/layout/students-table"
             className="text-gray-800 px-6 py-3 mb-10 rounded-lg no-underline" >
              <button type="reset" className="btn btn-outline-primary">{t.back}</button>
              </Link>

            </div>
          </Form>
        {/* </Card.Body> */}
    </div>
  );
};

export default StudentEditForm;
