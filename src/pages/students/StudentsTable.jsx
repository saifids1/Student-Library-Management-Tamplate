import React, { useEffect, useState } from "react";
import axios from "axios";
import Pageheader from "../../Componets/Pageheader";
import StudentList from "../../Componets/student-list/StudentList";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import BASE_URL from "../../Constants/constants";

const API_URL = `${BASE_URL}/Student`;

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();
  const t = studentFormText[language];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(API_URL);
        setStudents([...res.data].reverse());
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="students-table">
      <Pageheader heading={t.StudentsList} />

      <StudentList
        students={students}
        loading={loading}
        setStudents={setStudents}
      />
    </div>
  );
};

export default StudentsTable;
