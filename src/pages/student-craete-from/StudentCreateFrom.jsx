// StudentCreateForm.jsx
import StudentForm from "../../Componets/student-form/StudentFrom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";

import BASE_URL from "../../Constants/constants.js";
import Pageheader from "../../Componets/Pageheader.jsx";

const API_URL = `${BASE_URL}/Student`;

const StudentCreateForm = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = studentFormText[language];

  const initialState = {
    nameWithFathersname: "",
    dateOfBirth: "",
    dateOfAdmission: "",
    class: "",
    address: "",
    ability: "",
    country: "",
    classleavingDate: "",
    reasonForLeaving: "",
    classAtTimeOfLeaving: "",
    studentRecordYear: "",
    dateofDigri: "",
    quality: "",
    studentStatus: 1,
  };

  const [formData, setFormData] = useState(initialState);

  const isFormValid =
    formData.nameWithFathersname &&
    formData.country &&
    formData.dateOfAdmission &&
    formData.dateOfBirth &&
    formData.class &&
    formData.studentStatus;

const handleCreate = async (e) => {
  e.preventDefault();

  const cleanedData = Object.fromEntries(
    Object.entries(formData).filter(
      ([_, value]) => value !== "" && value !== null
    )
  );

  try {
    await axios.post(API_URL, cleanedData);
    Swal.fire("Success", "Student Created", "success");
    navigate("/layout/students-table");
  } catch (error) {
    console.log(error.response?.data);
    Swal.fire("Error", "Create failed", "error");
  }
};


  return (
    <div>
      <Pageheader heading={t.StudentCreateFrom} backbtn={true} />
      <div className="form-div">
        <StudentForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreate}
          submitText={t.CreateStudent}
          showClear
          onClear={() => setFormData(initialState)}
          submitDisabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default StudentCreateForm;
