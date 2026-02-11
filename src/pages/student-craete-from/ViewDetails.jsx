import React from "react";

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
const ViewDetails = () => {
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

  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.put(`${API_URL}/${id}`, formData);
  //     Swal.fire("Updated", "Student Updated", "success");
  //     navigate("/layout/students-table");
  //   } catch {
  //     Swal.fire("Error", "Update failed", "error");
  //   }
  // };

  if (!formData) return null;

  return (
    <div>
      <Pageheader heading={t.viewDetails} backbtn editStudent={id} />
      <div className="form-div">
        <StudentForm
          formData={formData}
          setFormData={setFormData}
          //   onSubmit={handleUpdate}
          // submitText={t.update}
          ReadOnly={true}
        />
      </div>
    </div>
  );
};

export default ViewDetails;
