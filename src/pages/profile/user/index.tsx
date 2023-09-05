
import { userStore } from "@/store/userStore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Breadcrumb, Col,  List } from "antd";
import classes from "./User.module.scss";
import { useForm } from "react-hook-form";

import BaseLayout from "@/layouts/BaseLayout";
import { BLOG_ROUTES } from "@/utils/routers";
const User = () => {
  interface FormProfile {
    id: string;
    email: string;
    gender: string;
    lastName: string;
    userName: string;
    phone: string;
    account_type: string;
    password: string;
  }
  const [profile, setProfile] = useRecoilState(userStore);
  const {
    register,
    formState: { errors },
  } = useForm<FormProfile>();
  useEffect(() => {
    console.log(profile);
  }, []);
  return (
    <BaseLayout>
      <List grid={{ gutter: 16 }} className={classes.ProfitePage}>
      <Breadcrumb
        className="breadcrumb"
        items={[
          {
            key: "home",
            href: "",
            title: "Home",
          },
          {
            key: "blogs",
            href: BLOG_ROUTES.BLOGS,
            title: "Blogs",
          },
          {
            key: "Profile",
            href: "",
            title: <div>{profile.lastName + " " + profile.userName || null}</div>,
          },
        ]}
      />
        <h2>Profile</h2>

        <Col span={14} className={classes.formGroup}>
          <label>FullName</label>
          <input
            {...register("userName", {
              required: true,
            })}
            placeholder="Enter your email"
            value={profile.lastName + " " + profile.userName}
          />
        </Col>

        <Col span={14} className={classes.formGroup}>
          <label>Email</label>
          <input
            {...register("email", {
              required: true,
            })}
            placeholder="Enter your email"
            value={profile.email}
          />
        </Col>

        <Col span={14} className={classes.formGroup}>
          <label>Gender</label>
          <input
            {...register("gender", {
              required: true,
            })}
            placeholder="Enter your gender"
            value={profile.gender}
          />
        </Col>

        <Col span={14} className={classes.formGroup}>
          <label>Phone</label>
          <input
            {...register("phone", {
              required: true,
            })}
            placeholder="Enter your phone"
            value={profile.phone}
          />
        </Col>

        <Col span={14} className={classes.formGroup}>
          <label>Account</label>
          <input
            {...register("account_type", {
              required: true,
            })}
            placeholder="Enter your email"
            value={profile.account_type}
          />
        </Col>
      </List>
    </BaseLayout>
  );
};

export default User;
