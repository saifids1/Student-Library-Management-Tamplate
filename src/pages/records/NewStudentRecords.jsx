import { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "../../Componets/student-list/StudentList";
import Pageheader from "../../Componets/Pageheader";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import BASE_URL from "../../Constants/constants";
const API_URL = `${BASE_URL}/Student`;

const NewStudentRecords = () => {
  const { language } = useLanguage();
  const t = studentFormText[language];
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("1"); // 1=new, 2=old, all
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  const filteredStudents =
    status === "all"
      ? students
      : students.filter((s) => s.studentStatus === Number(status));

  return (
    <>
      <Pageheader heading={t.newRecords} backbtn={true} />
      <StudentList
        students={filteredStudents}
        loading={loading}
        setStudents={setStudents}
      />
    </>
  );
};
export default NewStudentRecords;
