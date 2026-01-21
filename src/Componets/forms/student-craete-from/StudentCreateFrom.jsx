import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


import axios from "axios";
import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import "../student-craete-from/StudentCreateFrom.css";



import { studentFormText } from "../../../i18n/studentForm";


const API_URL = "https://localhost:7000/api/Student";

const StudentCreateFrom = () => {

  const { language } = useLanguage();
const t = studentFormText[language];


  const [formData, setFormData] = useState({
    nameWithFathersname: "",
    country: "",
    dateOfBirth: "",
    dateOfAdmission: "",
    ability: "",
  //  class: "",
    studentClass: "",
    classleavingDate: "",
    resoneForLeaving: "",
    dateofDigri: "",
    quality: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    NameWithFathersname: formData.nameWithFathersname,
    Country: formData.country,
    DateOfBirth: formData.dateOfBirth,
    DateOfAdmission: formData.dateOfAdmission,
    Ability: formData.ability || null,
   // Class: formData.class,
    Class: formData.studentClass,
    ClassleavingDate: formData.classleavingDate || null,
    ResoneForLeaving: formData.resoneForLeaving || null,
    DateofDigri: formData.dateofDigri || null,
    Quality: formData.quality || null
  };

  try {
    const res = await axios.post(API_URL, payload);
    alert("Student created successfully");
    console.log(res.data);
  } catch (err) {
    console.error("API Error:", err.response?.data);
    alert("Validation error");
  }
};


  return (
      <div className="studentCreateFrom" style={{ minHeight: "400px", border: "2px solid red" }}>
      <Card>
        <Card.Body className="card-body">
          <Form onSubmit={handleSubmit}>
            <Form.Text>{t.title}</Form.Text>

            <br />
            <Form.Text className="text-muted">{t.required}</Form.Text>

            {/* Name & Country */}
            <div className="row mt-3">
              <div className="col-md-6 col-sm-12">
                <Form.Label>{t.name} *</Form.Label>

                <Form.Control
                  name="nameWithFathersname"
                  value={formData.nameWithFathersname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 col-sm-12">
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
              <div className="col-md-6 col-sm-12">
                <Form.Label>{t.dob} *</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 col-sm-12">
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
              <div className="col-md-6 col-sm-12">
                <Form.Label>{t.ability}</Form.Label>
                <Form.Control
                  name="ability"
                  value={formData.ability}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 col-sm-12">
                <Form.Label>{t.class} *</Form.Label>
                {/* <Form.Control
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                /> */}

                <Form.Control
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  required
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
                <Form.Label>{t.quality}</Form.Label>
                <Form.Control
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="form-buttons text-end mt-4">
             
              <button type="submit" className="btn btn-outline-primary">{t.create}</button>
              <button type="reset" className="btn btn-outline-primary">{t.back}</button>

            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>


  );
};

export default StudentCreateFrom;
