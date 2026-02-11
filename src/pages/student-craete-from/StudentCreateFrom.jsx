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
    ability: "",
    Country: "",
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

    const requiredFields = [
      { key: "nameWithFathersname", label: t.nameWithFathersname },
      { key: "country", label: t.country },
      { key: "dateOfAdmission", label: t.dateOfAdmission },
      { key: "dateOfBirth", label: t.dateOfBirth },
      { key: "class", label: t.Class },
      { key: "studentStatus", label: t.studentStatus },
    ];

    const missingField = requiredFields.find((field) => !formData[field.key]);

    if (missingField) {
      Swal.fire(
        "Validation Error",
        `${missingField.label} is required`,
        "warning",
      );
      return;
    }

    try {
      await axios.post(API_URL, formData);
      Swal.fire("Success", "Student Created", "success");
      navigate("/layout/students-table");
    } catch (error) {
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
