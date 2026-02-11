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
  ReadOnly,
}) => {
  const { language } = useLanguage();
  const t = studentFormText[language];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="p-4 rounded bg-white">
      {/* row  mt-2 1 */}
      <div className="row  g-3">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.nameWithFathersName} *</label>
          <input
            className="form-control"
            name="nameWithFathersname"
            value={formData.nameWithFathersname}
            onChange={handleChange}
            required
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label mt-2">{t.watanAddress} *</label>
          <input
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            readOnly={ReadOnly}
          />
        </div>
      </div>

      {/* row  mt-2 2 */}
      <div className="row  mt-2 g-3 ">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.dob} *</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label mt-2">{t.doa} *</label>
          <input
            type="date"
            className="form-control"
            name="dateOfAdmission"
            value={formData.dateOfAdmission}
            onChange={handleChange}
            required
            readOnly={ReadOnly}
          />
        </div>
      </div>

      <div className="row  mt-2 g-3 ">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.ability}</label>
          <input
            className="form-control"
            name="ability"
            value={formData.ability}
            placeholder=""
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.class} *</label>
          <input
            type="text"
            className="form-control"
            name="class"
            value={formData.class}
            placeholder=""
            onChange={handleChange}
            required
            readOnly={ReadOnly}
          />
        </div>
      </div>

      {/* row  mt-2 4 */}
      <div className="row  mt-2 g-3 ">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.leavingDate}</label>
          <input
            type="date"
            className="form-control"
            name="classleavingDate"
            value={formData.classleavingDate}
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.reasoneForLeaving}</label>
          <input
            className="form-control"
            name="reasonForLeaving"
            value={formData.reasonForLeaving}
            placeholder=""
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>
      </div>

      {/* row  mt-2 5 */}
      <div className="row  mt-2 g-3 ">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.classAtTimeOfLeaving}</label>
          <input
            type="text"
            className="form-control"
            name="classLeavingTime"
            value={formData.classLeavingTime}
            placeholder=""
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.studentYearRecord}</label>
          <input
            type="date"
            className="form-control"
            name="studentRecordYear"
            value={formData.studentRecordYear}
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>
      </div>

      {/* row  mt-2 6 */}
      <div className="row  mt-2 g-3 ">
        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.degreeDate}</label>
          <input
            type="date"
            className="form-control"
            name="dateofDigri"
            value={formData.dateofDigri}
            onChange={handleChange}
            readOnly={ReadOnly}
          />
        </div>

        <div className="col-md-6 ">
          <label className="form-label mt-2">{t.remark}</label>
          <input
            className="form-control"
            name="quality"
            value={formData.quality}
            placeholder=""
            onChange={handleChange}
            readOnly={ReadOnly}
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
              onChange={() => setFormData((p) => ({ ...p, studentStatus: 1 }))}
              disabled={ReadOnly}
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
              disabled={ReadOnly}
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
        {submitText ? (
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        ) : (
          " "
        )}
      </div>
    </form>
  );
};

export default StudentForm;
