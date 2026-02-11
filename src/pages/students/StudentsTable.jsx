import React, { useEffect, useState } from "react";
import axios from "axios";
import Pageheader from "../../Componets/Pageheader";
import StudentList from "../../Componets/student-list/StudentList";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import BASE_URL from "../../Constants/constants";

const API_URL = `${BASE_URL}/Student/GetAllStudentBypaged`;

const StudentsTable = () => {
  const { language } = useLanguage();
  const t = studentFormText[language];

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // search & sorting
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("CreatedAt");
  const [sortOrder, setSortOrder] = useState(-1); // -1 = desc

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(API_URL, {
        params: {
          pageNumber: first / rows + 1,
          pageSize: rows,
          search: search || null,

          // 🔥 VERY IMPORTANT MAPPING
          orderBy: sortField,
          orderDirection: sortOrder === 1 ? "asc" : "desc",
        },
      });
      // console.log(res.data);

      setStudents(res.data.data);
      setTotalRecords(res.data.totalRecords);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 refetch when state changes
  useEffect(() => {
    fetchData();
  }, [first, rows, search, sortField, sortOrder]);

  return (
    <>
      <Pageheader heading={t.StudentsList} />

      <StudentList
        students={students}
        loading={loading}
        totalRecords={totalRecords}
        first={first}
        rows={rows}
        sortField={sortField}
        sortOrder={sortOrder}
        refreshData={fetchData}
        /* pagination */
        onPageChange={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
        /* sorting */
        onSort={(e) => {
          setSortField(e.sortField);
          setSortOrder(e.sortOrder);
          setFirst(0); // reset to first page
        }}
        /* search */
        onSearch={(value) => {
          setSearch(value);
          setFirst(0);
        }}
      />
    </>
  );
};

export default StudentsTable;
