import classes from "./signup.module.scss";
import PermissionLayout from "@/layouts/PermissionLayout";
import React from "react";
import { useForm } from "react-hook-form";
import * as AuthAPI from "@/api/AuthAPI";
import { useRouter } from "next/router";
import { APP_ROUTES } from "@/utils/routers";

import {  Modal } from "antd";

interface FormData {
  id: string;
  userName: string;
  lastName: string;
  email: string;
  password: string;
  account_type: string;
  gender: string;
  phone: string;
}

const login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const res = await AuthAPI.signup({
        email: data?.email,
        userName: data?.userName,
        lastName: data?.lastName,
        password: data?.password,
        account_type: data?.account_type,
        gender: data?.gender,
        phone: data?.phone,
      });
      console.log(res);
      setTimeout(() => {
        Modal.success({
          content: " Created in success",
        });
        router.push(APP_ROUTES.LOGIN);
      },3000);
    } catch (error) {
      Modal.error({
        content: " created in failed",
      });
    }
  });
  return (
    <PermissionLayout>
      <div className={classes.loginPage}>
        <div className={classes.leftSide}>
          <img
            src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="login"
          />
        </div>
        <div className={classes.rightSide}>
          <div className={classes.headSide}>
            <img
              src="https://hitek.com.vn/wp-content/uploads/2022/08/logo-300x82.png"
              alt=""
            />
            <h3>Welcome to Hitek </h3>
          </div>
          <div className={classes.contentSide}>
            <form onSubmit={onSubmit}>
              <div className={classes.formGroup}>
                <label>UserName</label>
                <input
                  {...register("userName", {
                    required: true,
                  })}
                  placeholder="Enter your UserName"
                  type="userName"
                />
                {errors.userName && (
                  <span className={classes.required}>
                    Please your UserName{" "}
                  </span>
                )}
              </div>
              <div className={classes.formGroup}>
                <label>LastName</label>
                <input
                  {...register("lastName", {
                    required: true,
                  })}
                  placeholder="Enter your LastName"
                  type="lastName"
                />
                {errors.lastName && (
                  <span className={classes.required}>
                    Please your LastName{" "}
                  </span>
                )}
              </div>
              <div className={classes.formGroup}>
                <label>Email</label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your Email"
                  type="email"
                />
                {errors.email && (
                  <span className={classes.required}>Please your email </span>
                )}
              </div>
              <div className={classes.formGroup}>
                <label>password</label>
                <input
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  type="password"
                />
                {errors.password && (
                  <span className={classes.required}>
                    Please your password{" "}
                  </span>
                )}
              </div>

              <div className={classes.formGroup}>
                <label>phone</label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Enter your phone"
                  type="text"
                />
                {errors.phone && (
                  <span className={classes.required}>Please your phone </span>
                )}
              </div>

              <div className={classes.formGroup}>
                <label>gender</label>
                <select {...register("gender")}>
                  <option value="">Select...</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
                {errors.gender && (
                  <span className={classes.required}>Please your gender </span>
                )}
              </div>

              <div className={classes.formGroup}>
                <label>account</label>
                <select {...register("account_type")}>
                  <option value="">Select...</option>
                  <option value="master">Master</option>
                  <option value="normal">Normal</option>
                </select>
                {errors.account_type && (
                  <span className={classes.required}>
                    Please your account_type{" "}
                  </span>
                )}
              </div>
              <div className={classes.forgotPassword}>
                <p>Forgot Password?</p>
              </div>
              <div className={classes.btnSide}>
                <button type="submit">Log in</button>
              </div>
                <div className={classes.signUp}>
                  <p>Don't have an account?</p>

                  <a onClick={() => router.push(APP_ROUTES.LOGIN)}>Sign in</a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </PermissionLayout>
  );
};

export default login;
