// components/StudentForm.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { studentFormText } from "../../i18n/studentForm";

const StudentForm = ({
  formData,
  setFormData,
  onSubmit,
  submitText,
  showClear = false,
  onClear,
}) => {
  const { language } = useLanguage();
  const t = studentFormText[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="p-4 rounded bg-white">
      {/* Row 1 */}
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">{t.nameWithFathersName} *</label>
          <input
            className="form-control"
            name="nameWithFathersname"
            value={formData.nameWithFathersname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.watanAddress} *</label>
          <input
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">{t.dob} *</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.doa} *</label>
          <input
            type="date"
            className="form-control"
            name="dateOfAdmission"
            value={formData.dateOfAdmission}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">{t.ability}</label>
          <input
            className="form-control"
            name="ability"
            value={formData.ability}
            placeholder="Enter ability"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.class} *</label>
          <input
            className="form-control"
            name="class"
            value={formData.class}
            placeholder="Enter class"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">{t.leavingDate}</label>
          <input
            type="date"
            className="form-control"
            name="classleavingDate"
            value={formData.classleavingDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.reasoneForLeaving}</label>
          <input
            className="form-control"
            name="resoneForLeaving"
            value={formData.resoneForLeaving}
            placeholder="Reason for leaving"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">{t.classAtTimeOfLeaving}</label>
          <input
            className="form-control"
            name="classLeavingTime"
            value={formData.classLeavingTime}
            placeholder="Class at time of leaving"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.studentYearRecord}</label>
          <input
            type="date"
            className="form-control"
            name="studentRecordYear"
            value={formData.studentRecordYear}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 6 */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <label className="form-label">{t.degreeDate}</label>
          <input
            type="date"
            className="form-control"
            name="dateofDigri"
            value={formData.dateofDigri}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">{t.remark}</label>
          <input
            className="form-control"
            name="quality"
            value={formData.quality}
            placeholder="Any remarks"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Row 7 - Radio inline */}
      <div className="row g-3 mt-3">
        <div className="col-md-6">
          <label className="form-label d-block">{t.studentStatus}</label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="studentStatus"
              checked={formData.studentStatus === 1}
              onChange={() => setFormData((p) => ({ ...p, studentStatus: 1 }))}
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
              onChange={() => setFormData((p) => ({ ...p, studentStatus: 2 }))}
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

        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
