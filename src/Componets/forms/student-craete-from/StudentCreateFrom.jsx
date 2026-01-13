import "../student-craete-from/StudentCreateFrom.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const StudentCreateFrom = () => {
  return (
    <div className="studentCreateFrom">
      <Card>
        <Card.Body className="card-body">
          <Form>
            <Form.Text className="text-muted">Create Student</Form.Text>
            <br />
            <Form.Text className="text-muted">Required fields*</Form.Text>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <div className="row mt-3">
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">
                    Name with Father's Name
                  </Form.Label>
                  <Form.Control
                    type=""
                    placeholder=" Name with Father's Name*"
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">Country</Form.Label>
                  <Form.Control type="" placeholder="Country*" />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd-mm-yyyy*"
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">Date of Admission </Form.Label>
                  <Form.Control type="date" placeholder="dd-mm-yyyy*" />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">
                    Ability
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ability"
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">Class</Form.Label>
                  <Form.Control type="text" placeholder="Class*" />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">
                    Class Leaving Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd-mm-yyyy"
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">Reason for Leaving</Form.Label>
                  <Form.Control type="text" placeholder="Reason for Leaving" />
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Label className="from-lable">
                    Date Of Degree
                  </Form.Label>
                  <Form.Control
                  className="form-date"
                    type="date"
                    pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                    placeholder="dd-mm-yyyy"
                    required
                  />
                </div>
                <div className="col-md-6 col-sm-12 mb-2">
                  <Form.Label className="from-lable">Quality</Form.Label>
                  <Form.Control type="text" placeholder="Status / Conditions" />
                </div>
              </div>
            </Form.Group>
            <div className="form-buttons text-end justify-end">
              <button className="btn btn-outline-primary">Back</button>
              <button className="btn btn-outline-primary">Create</button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentCreateFrom;
