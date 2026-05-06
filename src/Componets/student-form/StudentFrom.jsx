// components/StudentForm.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";
import Swal from "sweetalert2";
import { read } from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import TCPrint from "./TcPrint";
import BASE_URL from "../../Constants/constants";
import { DistributeVertical } from "react-bootstrap-icons";

const StudentForm = ({
  formData,
  setFormData,
  onSubmit,
  submitText,
  showClear = false,
  onClear,
  ReadOnly,
  updateMode,
}) => {
  const { language } = useLanguage();
  const t = studentFormText[language];
  const printRef = useRef();

  const handleChange = (e) => {
    if (ReadOnly) {
      Swal.fire({
        icon: "warning",
        title: "Not Allowed",
        text: "You cannot edit from here! Please use the edit option to make changes.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (formData.issueLeavingCertificate) {
      Swal.fire({
        icon: "warning",
        title: "Not Allowed",
        text: "You cannot edit After issuing Leaving Certificate!.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleIssueTc = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You Cannot Change Record after issuing Leaving Certificate!",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      // ✅ CALL API FIRST
      const response = await fetch(
        `${BASE_URL}/Student/update-leaving-certificate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formData?.id,
            issueLeavingCertificate: true,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update TC status");
      }

      // ✅ UPDATE LOCAL STATE
      setFormData((prev) => ({
        ...prev,
        issueLeavingCertificate: true,
      }));

      // ✅ GENERATE PDF
      const element = printRef.current;

      if (!element) {
        Swal.fire("Error", "TC template not found!", "error");
        return;
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // ✅ DOWNLOAD PDF
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = url;

      // clean filename
      const fileName = formData?.name?.replace(/\s+/g, "_") || "Student";

      link.download = `Leaving_Certificate_${fileName}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url); // cleanup

      Swal.fire(
        "Success",
        "Leaving Certificate Issued & Downloaded!",
        "success",
      );
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="p-4 rounded bg-white">
        {/* row  mt-2 1 */}
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.studentsId}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.UidNo}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="aadharCardNo"
              value={formData.aadharCardNo}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.nameWithFathersName} *</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="nameWithFathersname"
              value={formData.nameWithFathersname}
              onChange={handleChange}
              required
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.FatherName}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="fathersName"
              value={formData.fathersName}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.mothersName}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="mothersName"
              value={formData.mothersName}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.nationality}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.mothersTongue}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="mothersTongue"
              value={formData.mothersTongue}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.religion}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.caste}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.subCaste}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="subCaste"
              value={formData.subCaste}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}

              // readOnly={ReadOnly}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.placeOfBirth}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.taluka}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.dist}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="district"
              value={formData.district}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.state}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="state"
              value={formData.state}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>
        </div>
        <div className="row  g-3">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.country}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="country"
              value={formData.country}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>

          <div className="col-md-6"></div>
        </div>

        {/* row  mt-2 2 */}
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.dob} *</label>
            <input
              type="date"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.dateOfBirthInWords}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="dateOfBirthInWords"
              value={formData.dateOfBirthInWords}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>
        </div>
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.classAtTimeOfLeaving}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="classAtTimeOfLeaving"
              value={formData.classAtTimeOfLeaving}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.doa} *</label>
            <input
              type="date"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
              onChange={handleChange}
              required
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.class}*</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label mt-2">{t.progressInStudy}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="progressInStudy"
              value={formData.progressInStudy}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.conduct}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="conduct"
              value={formData.conduct}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
          <div className="col-md-6 ">
            <label className="form-label mt-2">
              {t.lastSchoolAttendedAndClass}
            </label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="lastSchoolAttended"
              value={formData.lastSchoolAttended}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>

        {/* row  mt-2 4 */}
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.leavingDate}</label>
            <input
              type="date"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="classleavingDate"
              value={formData.classleavingDate}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>

          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.reasoneForLeaving}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="reasonForLeaving"
              value={formData.reasonForLeaving}
              placeholder=""
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>

        {/* row  mt-2 5 */}
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.classStudyingSince}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="classStudyingSince"
              value={formData.classStudyingSince}
              placeholder=""
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.quality}</label>
            <input
              type="text"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="ability"
              value={formData.ability}
              placeholder=""
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
          
        </div>

        {/* row  mt-2 6 */}
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.degreeDate}</label>
            <input
              type="date"
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="dateofDigri"
              value={formData.dateofDigri}
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
              // readOnly={ReadOnly}
            />
          </div>

          <div className="col-md-6 ">
            <label className="form-label mt-2">{t.remark}</label>
            <input
              className={`form-control ${formData.issueLeavingCertificate ? "bg-secondary text-white" : ""}`}
              name="quality"
              value={formData.quality}
              placeholder=""
              onChange={handleChange}
              readOnly={ReadOnly || formData.issueLeavingCertificate}
            />
          </div>
        </div>

        {/* row  mt-2 7 - Radio inline */}
        <div className="row  mt-2 g-3 ">
          <div className="col-md-6 ">
            <label className="form-label mt-2 d-block">{t.studentStatus}</label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="studentStatus"
                checked={formData.studentStatus === 1}
                onChange={() =>
                  setFormData((p) => ({ ...p, studentStatus: 1 }))
                }
                disabled={ReadOnly || formData.issueLeavingCertificate}
              />
              <label
                className="form-check-label"
                style={{ textDecoration: "none", color: "black" }}
              >
                {t.new}
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="studentStatus"
                checked={formData.studentStatus === 2}
                onChange={() =>
                  setFormData((p) => ({ ...p, studentStatus: 2 }))
                }
                disabled={ReadOnly || formData.issueLeavingCertificate}
              />
              <label
                className="form-check-label"
                style={{ textDecoration: "none", color: "black" }}
              >
                {t.old}
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          {showClear && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClear}
            >
              {t.clear}
            </button>
          )}
          {submitText && !formData.issueLeavingCertificate && (
            <button type="submit" className="btn btn-primary">
              {submitText}
            </button>
          )}
          {formData.issueLeavingCertificate && (
            <button type="submit" className="btn btn-secondary">
              Leaving Certificate Issued
            </button>
          )}
        </div>
      </form>
      {updateMode &&
        ReadOnly &&
        !formData.issueLeavingCertificate && (
          <div className="row  g-3 ">
            <div className="col p-4 text-end">
              <button className="btn btn-danger" onClick={handleIssueTc}>
                Issue Leaving Certificate
              </button>
            </div>
          </div>
        )}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <TCPrint ref={printRef} data={formData} />
      </div>
    </>
  );
};

export default StudentForm;
