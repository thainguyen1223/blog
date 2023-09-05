import classes from "./login.module.scss";
import PermissionLayout from "@/layouts/PermissionLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as AuthAPI from "@/api/AuthAPI";
import { LoginResponse } from "@/types/model/auth";
import { useSetRecoilState } from "recoil";
import { userStore } from "@/store/userStore";
import { APP_ROUTES, ADMIN_ROUTES, API_ROUTES } from "@/utils/routers";
import { Form, Modal, Input, Button } from "antd";
interface FormData {
  email: string;
  password: string;
}

const login = () => {
  const router = useRouter();
  const { register,
    formState: { errors },
  } = useForm<FormData>();
  const setUserState = useSetRecoilState(userStore);
  const onSubmit = async (data: FormData) => {
    try {
      const res = await AuthAPI.login({
        email: data.email,
        password: data.password,
      });
      const {
        id,
        email,
        userName,
        lastName,
        account_type,
        password,
        gender,
        phone,
      } = res?.user;
      const token = res?.accessToken;
      console.log(res);
      setUserState({
        id,
        email,
        password,
        userName,
        lastName,
        account_type,
        gender,
        phone,
        token,
      });

      if (token && account_type == "master") {
        router.push(ADMIN_ROUTES.DASHBOARD);
        console.log(account_type);
      } else if (token && account_type == "normal") {
        router.push(APP_ROUTES.BLOGS);
      }

      Modal.success({
        content: " Logged in successfully ",
      });
    } catch (error) {
      // Modal.error({
      //   conten t: " Logged in failed ",
      // });
    }
  };

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
          <Form
              name="basic"
              labelCol={{ span: 8 }}

              wrapperCol={{ span: 24 }}
              onFinish={onSubmit}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" } ,
                ]}
                className={classes.formGroup}
              >
                <Input  />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                className={classes.formGroup}
              >
                <Input.Password  />
              </Form.Item>

              <Form.Item  className={classes.btnSide}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <div className={classes.signUp}>
                  <p>Don't have an account?</p>

                  <a onClick={() => router.push("/signup")}>Sign up for free</a>
                </div>
            </Form>

          </div>
        </div>
      </div>
    </PermissionLayout>
  );
};

export default login;
