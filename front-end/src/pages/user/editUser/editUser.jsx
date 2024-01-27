import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editUser, getUserById } from "../../../api/adminApi";
import NavBar from "../../../components/navBar";

export default function AddUser() {
  const loader = useSelector((state) => state.loader);
  const navigate = useNavigate();
  const { id } = useParams();
  const [disabledGradeField, setDisabledGradeField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const addSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(phoneRegExp, "ادخل رقم هاتف صحيح")
      .required("رقم الهاتف مطلوب")
      .test(
        "",
        "رقم التليفون يجب ان يكون 11 رقم",
        (e) => e.toString().length === 11
      ),
    userName: yup.string().required("ادخل الاسم"),
    isAdmin: yup.boolean().required("اختر المستخدم"),
    count: yup.number().integer(),
  });

  const handleSelectChange = (target) => {
    if (target.value === "true") {
      setDisabledGradeField(true);
    } else {
      setDisabledGradeField(false);
    }
  };

  const dataSubmit = (obj) => {
    if(disabledGradeField)obj.count=0;
    editUser(obj)
      .then((data) => {
        if (data) {
          navigate("/userList");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserById(id)
      .then((data) => {
        if (data) {
          setUser(data.data);
          setDisabledGradeField(data.data.isAdmin)
        }
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <NavBar />
      <main className="bg-cover">
        <div className="d-flex justify-content-center align-items-center login-bg mt-4">
          {isLoading && (
            <Formik
              validationSchema={addSchema}
              onSubmit={dataSubmit}
              initialValues={user}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  className="col-xl-4 col-lg-6 col-md-8  col-10 mx-auto text-dark p-5
                rounded-4 border border-info login-form-bg "
                >
                  <h2 className="d-flex flex-row-reverse">تعديل مخدوم</h2>
                  <Form.Group className="form-floating  mb-2">
                    <FloatingLabel controlId="userName" label="ادخل الاسم">
                      <Form.Control
                        type="string"
                        className="login-input text-dark rounded-1 "
                        name="userName"
                        placeholder="ادخل الاسم"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.userName && !errors.userName}
                        isInvalid={touched.userName && errors.userName}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-flex flex-row-reverse fw-bold"
                      >
                        {errors.userName}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating  mb-2">
                    <FloatingLabel controlId="phone" label="ادخل رقم التليفون">
                      <Form.Control
                        type="text"
                        className="login-input text-dark rounded-1 "
                        name="phone"
                        placeholder="ادخل رقم التليفون"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.phone && !errors.phone}
                        isInvalid={touched.phone && errors.phone}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-flex flex-row-reverse fw-bold"
                      >
                        {errors.phone}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  {/* count */}
                  <Form.Group className="form-floating  mb-1">
                    <FloatingLabel controlId="count" label="ادخل الدرجات">
                      <Form.Control
                        disabled={disabledGradeField}
                        type="number"
                        className="login-input text-dark rounded-1 "
                        name="count"
                        placeholder="ادخل الدرجات"
                        defaultValue={values.count}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.count && !errors.count}
                        isInvalid={touched.count && errors.count}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-flex flex-row-reverse fw-bold"
                      >
                        {errors.count}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="form-floating  mb-2">
                    <div key={`default-radio`} className="mb-1">
                      <Form.Label className="d-flex flex-row-reverse fw-bold">
                        اختر المستخدم
                      </Form.Label>
                      <Form.Check
                        reverse
                        name="isAdmin"
                        type={"radio"}
                        label={`خادم`}
                        id={`خادم`}
                        onClick={(e) => handleSelectChange(e.target)}
                        value={true}
                        defaultChecked={values.isAdmin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Form.Check
                        reverse
                        name="isAdmin"
                        type={"radio"}
                        id={`مخدوم`}
                        label={`مخدوم`}
                        onClick={(e) => handleSelectChange(e.target)}
                        value={false}
                        defaultChecked={!values.isAdmin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <Form.Control.Feedback
                      type="invalid"
                      className="d-flex flex-row-reverse fw-bold"
                    >
                      {errors.isAdmin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="pb-1 pt-3 text-center">
                    <Button
                      id="loginBtn"
                      type="submit"
                      className=" fw-bold w-100 py-2"
                    >
                      {loader ? " تعديل مستخدم" : "انتظر....."}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </main>
    </>
  );
}
