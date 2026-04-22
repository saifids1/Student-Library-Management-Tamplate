// TCPrint.jsx
import React, { forwardRef } from "react";

const TCPrint = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
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
        <strong style={{ marginRight: "100px" }}>Urdu</strong>
        Udise No: <strong style={{ marginRight: "100px" }}>2719110111</strong>
        L.C No:
      </p>

      <p style={{ marginTop: "10px" }}>
        Student'
        I.D.:_________________________________________________________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        U.I.D No.(Aadhar Card No):
        ____________________________________________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        1) Full Name Of The Student :{" "}
        <strong style={{ maxWidth: "100%", borderBottom: "1px solid black" }}>
          {data.nameWithFathersname}
        </strong>
      </p>
      <p style={{ marginTop: "10px" }}>
        2) Father's Name: _______________________________
        (surname)_____________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        3) Mother's Name:
        ____________________________________________________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        4) Nationality: <strong style={{ marginRight: "150px" }}>Indian</strong>
        Mother Tongue: <strong style={{ marginRight: "100px" }}>Urdu</strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        5) Religion: <strong style={{ marginRight: "100px" }}>Islam</strong>
        Caste: <strong style={{ marginRight: "140px" }}>Muslim</strong>Sub
        Caste:__________________
      </p>

      <p style={{ marginTop: "10px" }}>
        6) Place of Birth: ___________________________________ Taluka
        ____________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        7) Dist:_______________________ State:{" "}
        <strong style={{ marginInline: "100px" }}>Maharashtra</strong> Country:{" "}
        <strong>India</strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        8) Date of Birth:(in figure): <strong>{data.dateOfBirth}</strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        9) Date of Birth:(in words):
        _____________________________________________________________
      </p>
      <p style={{ marginTop: "10px" }}>
        10) Last School Attended & Class:
        _______________________________________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        11) Date of Admission:{" "}
        <strong style={{ marginRight: "150px" }}>{data.dateOfAdmission}</strong>{" "}
        Class: ____________________
      </p>

      <p style={{ marginTop: "10px" }}>
        12) Progress in study:{" "}
        <strong style={{ marginRight: "150px" }}>Satisfactory</strong> Conduct:
        <strong>Good</strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        13) Date of Leaving The School :{" "}
        <strong>{data.classleavingDate}</strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        14) Class Studying & since when:
        ________________________________________________________
      </p>

      <p style={{ marginTop: "10px" }}>
        15) Reason For Leaving: {data.reasonForLeaving}
      </p>

      <p style={{ marginTop: "10px" }}>
        16) Remark: {data.quality}
      </p>

      <p style={{ marginTop: "10px" }}>
        <strong>
          Certified that the above information is in accordance with the school
          records.
        </strong>
      </p>

      <p style={{ marginTop: "10px" }}>
        Date : ________________ Month : ________________ Year : ________________
      </p>

      <br />
      <br />

      <p>
        <strong>
          <span style={{ marginRight: "150px" }}>Class Teacher</span>
          <span style={{ marginRight: "150px" }}>Clerk</span>
          <span>Head Master</span>
        </strong>
      </p>
      <div style={{ marginTop: "80px" }}>
        <p>Note : Unauthorized change are punishable as per rules.</p>
      </div>
    </div>
  );
});

export default TCPrint;
