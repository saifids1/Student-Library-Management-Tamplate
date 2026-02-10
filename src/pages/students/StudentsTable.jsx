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

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    const res = await axios.get(API_URL, {
      params: {
        pageNumber: first / rows + 1, // PrimeReact → API
        pageSize: rows,
        search: search || null,
        orderBy: "CreatedAt",
        orderDirection: "desc",

        // 🔥 map sorting correctly
        orderBy: sortField || "CreatedAt",
        orderDirection: sortOrder === 1 ? "asc" : "desc",
      },
    });

    setStudents(res.data.data);
    setTotal(res.data.totalRecords);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [first, rows, search, sortField, sortOrder]);

  return (
    <>
      <Pageheader heading={t.StudentsList} />
      <StudentList
        students={students}
        loading={loading}
        totalRecords={total}
        first={first}
        rows={rows}
        sortField={sortField}
        sortOrder={sortOrder}
        onPageChange={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
        onSort={(e) => {
          setSortField(e.sortField);
          setSortOrder(e.sortOrder);
          setFirst(0);
        }}
        onSearch={(v) => {
          setSearch(v);
          setFirst(0);
        }}
        refreshData={fetchData}
      />
    </>
  );
};

export default StudentsTable;
