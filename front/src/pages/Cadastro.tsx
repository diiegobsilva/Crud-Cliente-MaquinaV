/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useFormik } from "formik";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, registrationSchema } from "../controllers";
import { URI } from "../enumerations/uri";
import React from "react";
import { initialValues } from "../types";
import clsx from "clsx";


function Cadastro() {
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    initialErrors: { nome: "" },
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      await axios.post(URI.CRIAR_CLIENTE, formik.values);
      onClickLimpar();
    },
  });

  function onClickLimpar() {
    formik.resetForm();
  }

  function onClickEnviar() {
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
      avisoConcluido();
    }
  }

  useEffect(() => { }, []);

  return (
    <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" noValidate id="form-solicitacao" onSubmit={formik.handleSubmit} style={{ margin: "8px" }}>
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">CADASTRAR CLIENTE</h1>
        <div className="text-gray-500 fs-6 font-padrao-titulo mb-5" style={{ letterSpacing: 0 }}>Preencha os campos para cadastrar um cliente!</div>
      </div>

      {formik.status && (
        <div className="mb-5 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      <div className="row">
        <div className="col-lg-4">
          {/* begin::Form group Nome */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Nome</label>
            <input placeholder="Nome" type="text" autoComplete="off" {...formik.getFieldProps("nome")}
              onChange={formik.handleChange} value={formik.values.nome}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.nome && formik.errors.nome,
                },
                {
                  "is-valid":
                    formik.touched.nome &&
                    !formik.errors.nome,
                }
              )}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.nome}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group Nome */}
        </div>
        <div className="col-lg-4">
          {/* begin::Form group Livro */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Email</label>
            <input placeholder="Email" type="text" autoComplete="off" {...formik.getFieldProps("email")}
              onChange={formik.handleChange} value={formik.values.email}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.email && formik.errors.email,
                },
                {
                  "is-valid":
                    formik.touched.email &&
                    !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group Livro */}
        </div>

        <div className="col-lg-4">
          {/* begin::Form group Editora */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">Cargo</label>
            <input placeholder="Cargo" type="text" autoComplete="off" {...formik.getFieldProps("cargo")}
              onChange={formik.handleChange} value={formik.values.cargo}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.cargo && formik.errors.cargo,
                },
                {
                  "is-valid":
                    formik.touched.cargo &&
                    !formik.errors.cargo,
                }
              )}
            />
            {formik.touched.cargo && formik.errors.cargo && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.cargo}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group Editora */}
        </div>
      </div>

      {/* begin::Form group */}
      <div className="d-flex align-items-center justify-content-between mt-4">
        <button type="button" className="btn btn-form" onClick={onClickLimpar}>Limpar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-fill" viewBox="0 0 16 16">
            <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
          </svg>
        </button>

        <button type="button" className="btn btn-form" onClick={onClickEnviar} disabled={formik.isSubmitting}>
          Enviar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
          </svg>
        </button>
      </div>
      {/* end::Form group */}
    </form>
  );
}

export default Cadastro;
