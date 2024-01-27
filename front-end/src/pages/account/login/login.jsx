import React from 'react';
import { Formik } from 'formik';
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import * as yup from 'yup';
import jwtDecode from "jwt-decode";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import  {login} from '../../../api/login.js'

export default function Login(){
  const loader = useSelector(state=>state.loader);

  const navigate = useNavigate();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const loginSchema = yup.object().shape({
    phone: yup.string().matches(phoneRegExp,'ادخل رقم هاتف صحيح').required('رقم الهاتف مطلوب')
          .test('','رقم التليفون يجب ان يكون 11 رقم',(e)=>e.toString().length ===11),
    password:yup.string()
  });

  const dataSubmit = (obj) => {
    login(obj).then((data) => {
      if (data){
        localStorage.setItem("token", data.token);
        const { isAdmin } = jwtDecode(localStorage.getItem("token"));
        if (isAdmin) navigate("/userList");
        else navigate("/userProfile");
      }
    }).catch(err=>console.log(err));
  };

    return(
        <>
            <main className="vh-100 bg-cover">
        <div className="h-100 d-flex justify-content-center align-items-center login-bg">
          <Formik
            validationSchema={loginSchema}
            onSubmit={dataSubmit}
            initialValues={{
              phone: '',
              password:''
            }}
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
                <h2 className="py-3 d-flex flex-row-reverse">تسجيل الدخول</h2>
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel controlId="phone" label="ادخل رقم الهاتف">
                    <Form.Control
                      type="text"
                      className="login-input text-dark rounded-1 "
                      name="phone"
                      placeholder="ادخل رقم الهاتف"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.phone && !errors.phone}
                      isInvalid={touched.phone && errors.phone}
                    />
                    <Form.Control.Feedback type="invalid" className='d-flex flex-row-reverse fw-bold'>
                      {errors.phone}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating  mb-4">
                  <FloatingLabel controlId="password" label="ادخل الرقم السري">
                    <Form.Control
                      type="password"
                      className="login-input text-dark rounded-1 "
                      name="password"
                      placeholder="ادخل الرقم السري"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid" className='d-flex flex-row-reverse fw-bold'>
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <div className="pb-4 pt-3 text-center">
                  <Button
                    id="loginBtn"
                    type="submit"
                    className=" fw-bold w-100 py-2"
                    disabled={!loader}
                  >
                    {loader ? "نسجيل الدخول" : "انتظر....."}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </>
    )
}