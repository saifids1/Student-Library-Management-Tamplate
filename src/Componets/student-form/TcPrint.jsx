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

          <p>
            Sr.No: <span style={{ marginRight: "100px" }}></span> Medium :{" "}
            <b style={{ marginRight: "100px" }}>Urdu</b>
            Udise No: <b style={{ marginRight: "100px" }}>2719110111</b>
            L.C No:
          </p>
          {/* _________________________form ______________________________ */}

          {/* FORM */}
          <div className="tc-form">
            <p className="tc-row">
              <span className="print-label">Student I.D.:</span>
              <span className="print-field">{data.studentId}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">U.I.D No (Aadhar):</span>
              <span className="print-field">{data.aadharCardNo}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">1) Full Name of Student:</span>
              <span className="print-field">{data.nameWithFathersname}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">2) Father's Name:</span>
              <span className="print-field">{data.fathersName}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">3) Mother's Name:</span>
              <span className="print-field">{data.mothersName}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">4) Nationality:</span>
              <span className="print-field">{data.nationality}</span>

              <span className="print-label">Mother Tongue:</span>
              <span className="print-field">{data.mothersTongue}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">5) Religion:</span>
              <span className="print-field">{data.religion}</span>

              <span className="print-label">Caste:</span>
              <span className="print-field">{data.caste}</span>

              <span className="print-label">Sub Caste:</span>
              <span className="print-field">{data.subCaste}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">6) Place of Birth:</span>
              <span className="print-field">{data.placeOfBirth}</span>

              <span className="print-label">Taluka:</span>
              <span className="print-field">{data.taluka}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">7) Dist:</span>
              <span className="print-field">{data.district}</span>

              <span className="print-label">State:</span>
              <span className="print-field">{data.state}</span>

              <span className="print-label">Country:</span>
              <span className="print-field">{data.country}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">8) DOB (in figures):</span>
              <span className="print-field">
                {data.dateOfBirth?.split("T")[0]}
              </span>
            </p>

            <p className="tc-row">
              <span className="print-label">9) DOB (in words):</span>
              <span className="print-field">{data.dateOfBirthInWords}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">
                10) Last School Attended & Class:
              </span>
              <span className="print-field">{data.lastSchoolAttended}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">11) Date of Admission:</span>
              <span className="print-field">
                {data.dateOfAdmission?.split("T")[0]}
              </span>

              <span className="print-label">Class:</span>
              <span className="print-field">{data.class}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">12) Progress:</span>
              <span className="print-field">{data.progressInStudy}</span>

              <span className="print-label">Conduct:</span>
              <span className="print-field">{data.conduct}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">13) Date of Leaving:</span>
              <span className="print-field">
                {data.classleavingDate?.split("T")[0]}
              </span>
            </p>

            <p className="tc-row">
              <span className="print-label">14) Class Studying & Since:</span>
              <span className="print-field">{data.classStudyingSince}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">15) Reason for Leaving:</span>
              <span className="print-field">{data.reasonForLeaving}</span>
            </p>

            <p className="tc-row">
              <span className="print-label">16) Remarks:</span>
              <span className="print-field">{data.quality}</span>
            </p>
          </div>

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
          <div style={{ marginTop: "100px" }}>
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
