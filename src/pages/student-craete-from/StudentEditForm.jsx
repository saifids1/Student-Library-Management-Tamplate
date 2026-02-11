// StudentEditForm.jsx
import StudentForm from "../../Componets/student-form/StudentFrom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import BASE_URL from "../../Constants/constants.js";
import Pageheader from "../../Componets/Pageheader.jsx";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";

const API_URL = `${BASE_URL}/Student`;

const StudentEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const { language } = useLanguage();
  const t = studentFormText[language];

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => {
      const data = res.data;
      setFormData({
        ...data,
        dateOfBirth: data.dateOfBirth?.split("T")[0],
        dateOfAdmission: data.dateOfAdmission?.split("T")[0],
        classleavingDate: data.classleavingDate?.split("T")[0],
        dateofDigri: data.dateofDigri?.split("T")[0],
        studentRecordYear: data.studentRecordYear?.split("T")[0],
      });
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const studentId = parseInt(id); // use existing id

    try {
      await axios.put(`${API_URL}/${studentId}`, formData);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Student Updated Successfully",
      });

      navigate("/layout/students-table");
    } catch (error) {
      console.log(error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data || "Something went wrong",
      });
    }
  };

  if (!formData) return null;

  return (
    <div>
      <Pageheader heading={t.EditStudent} backbtn />
      <div className="form-div">
        <StudentForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          submitText={t.update}
        />
      </div>
    </div>
  );
};

export default StudentEditForm;
