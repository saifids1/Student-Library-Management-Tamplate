// TCPrint.jsx
import React, { forwardRef } from "react";
import Logo from "../../../public/blackWhiteLogo.png";
import "./tcPrint.css";

const TCPrint = forwardRef(({ data }, ref) => {
  return (
    <div style={{ display: "flex" }} ref={ref} className="tc-print">
      <div style={{ width: "600px" }}>
        <div
          style={{
            padding: 40,
            width: "800px",
            background: "#ffffff",
            fontFamily: "times new roman",
          }}
        >
          <h5 style={{ textAlign: "center" }}>ORIGINAL</h5>
          <h5 style={{ textAlign: "center", marginBottom: "0" }}>
            KASHIFUL-ULOOM URDU PRIMARY SCHOOL
          </h5>
          <p style={{ textAlign: "center" }}>
            Under Madarsa Arbiya Kashiful Uloom Trust, Aurangabad{" "}
          </p>
          <p style={{ textAlign: "center" }}>
            Address Buddi Lane, Aurangabad(M.S.)
          </p>
          <h5 style={{ textAlign: "center" }}>SCHOOL LEAVING CERTIFICATE</h5>
          <br />

          {/* _________________________form ______________________________ */}

          <p>
            Sr.No: <span style={{ marginRight: "100px" }}></span> Medium :{" "}
            <b style={{ marginRight: "100px" }}>Urdu</b>
            Udise No: <b style={{ marginRight: "100px" }}>2719110111</b>
            L.C No:
          </p>

          <p style={{ marginTop: "10px" }}>
            Student I.D.:
            <strong>{data.studentId}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            U.I.D No.(Aadhar Card No): <strong>{data.aadharCardNo}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            1) Full Name Of The Student :{" "}
            <strong
            >
              {data.nameWithFathersname}
            </strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            2) Father's Name: <strong>{data.fathersName}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            3) Mother's Name: <strong>{data.mothersName}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            4) Nationality:{" "}
            <strong style={{ marginRight: "150px" }}>{data.nationality}</strong>
            {"  "}Mother Tongue: <strong>{data.mothersTongue}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            5) Religion:{" "}
            <strong style={{ marginRight: "150px" }}>{data.religion}</strong>
            {"  "}Caste:{" "}
            <strong style={{ marginRight: "150px" }}>{data.caste}</strong>
            {"  "}Sub Caste: <strong>{data.subCaste}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            6) Place of Birth:{" "}
            <strong style={{ marginRight: "150px" }}>
              {data.placeOfBirth}
            </strong>
            {"  "}Taluka: <strong>{data.taluka}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            7) Dist:{" "}
            <strong style={{ marginRight: "150px" }}>{data.district}</strong>
            {"  "}State:{" "}
            <strong style={{ marginRight: "150px" }}>{data.state}</strong>
            {"  "}Country: <strong>{data.country}</strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            8) Date of Birth (in figure):
            <strong>{data.dateOfBirth?.split("T")[0]}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            9) Date of Birth (in words):
            <strong>{data.dateOfBirthInWords}</strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            10) Last School Attended & Class:
            <strong>{data.lastSchoolAttended}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            11) Date of Admission:
            <strong style={{ marginRight: "150px" }}>
              {data.dateOfAdmission?.split("T")[0]}
            </strong>
            {"  "}Class: <strong>{data.class}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            12) Progress in study:
            <strong style={{ marginRight: "150px" }}>
              {data.progressInStudy}
            </strong>
            {"  "}Conduct: <strong>{data.conduct}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            13) Date of Leaving The School:
            <strong>{data.classleavingDate?.split("T")[0]}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            14) Class Studying & since when:
            <strong>{data.classStudyingSince}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            15) Reason For Leaving: <strong>{data.reasonForLeaving}</strong>
          </p>

          <p style={{ marginTop: "10px" }}>
            16) Remark: <strong>{data.quality}</strong>
          </p>

          <p style={{ marginTop: "40px" }}>
            <b>
              Certified that the above information is in accordance with the
              school records.
            </b>
          </p>

          <p style={{ marginTop: "10px" }}>
            Date : ________________ Month : ________________ Year :
            ________________
          </p>

          <br />
          <br />

          <p>
            <b>
              <span style={{ marginRight: "150px" }}>Class Teacher</span>
              <span style={{ marginRight: "150px" }}>Clerk</span>
              <span>Head Master</span>
            </b>
          </p>
          <div style={{ marginTop: "80px" }}>
            <p>Note : Unauthorized change are punishable as per rules.</p>
          </div>
        </div>
      </div>
      <div style={{ width: "200px" }}>
        <img src="/blackWhiteLogo.png" alt="" />
      </div>
    </div>
  );
});

export default TCPrint;
