// StudentEditForm.jsx
import StudentForm from "../../Componets/student-form/StudentFrom";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  // ✅ Load student data
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const data = res.data;

        setFormData({
          ...data,
          dateOfBirth: data.dateOfBirth?.split("T")[0] || "",
          dateOfAdmission: data.dateOfAdmission?.split("T")[0] || "",
          classleavingDate: data.classleavingDate?.split("T")[0] || "",
          dateofDigri: data.dateofDigri?.split("T")[0] || "",
          studentRecordYear: data.studentRecordYear?.split("T")[0] || "",
        });
      })
      .catch((err) => {
        console.error("Error loading student:", err);
      });
  }, [id]);

  // ✅ Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault();

    const studentId = parseInt(id);

    const updatedData = { ...formData };

    // ✅ Convert only optional date fields to null
    const optionalDateFields = [
      "classleavingDate",
      "dateofDigri",
      "studentRecordYear",
    ];

    optionalDateFields.forEach((field) => {
      if (!updatedData[field]) {
        updatedData[field] = null;
      }
    });

    // ✅ Force address to empty string
    updatedData.address = "";

    console.log("Sending:", updatedData);

    try {
      await axios.put(`${API_URL}/${studentId}`, updatedData);

      Swal.fire("Success", "Student Updated", "success");
      navigate("/layout/students-table");
    } catch (error) {
      console.log(error.response?.data);
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
