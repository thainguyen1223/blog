import React from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "@/layouts/AuthLayout";
import classes from "./create.module.scss";
import { BlogModel } from "@/types/model/blogs";
import * as BlogAPI from "@/api/BlogAPI";
import { useRouter } from "next/router";


import { Breadcrumb, Modal } from "antd";
import FormCreate from "@/components/FormCreate";
import { ADMIN_ROUTES, BLOG_ROUTES } from "@/utils/routers";

const create = () => {
  interface FormData{
    id: string,
		title: string,
		image: string,
		content: string,
		description: string,
  }
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data :FormData) => {   

    try {
      const res = await BlogAPI.createBlogs(data);
      
      Modal.success({
        title: "Success",
        content: "Successfully created blog!",
      });
 
        router.push(BLOG_ROUTES.BLOGS)

      console.log(res);
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Your account do not correct!",
      });
    }
  });
  return (
    <AuthLayout>
          <Breadcrumb style={{marginLeft:10}}
        className="breadcrumb"
        items={[
          {
            key: "home",
            href: "",
            title: "Home",
          },
          {
            key: "Dashboard",
            href: ADMIN_ROUTES.DASHBOARD,
            title: "Dashboard",
          },
        ]}
      />
      <div className={classes.CreatePage}>
        <h2>Add Blog</h2>
        <FormCreate onSubmit ={onSubmit} errors={errors} register={register}/> 
      </div>
    </AuthLayout>
  );
};

export default create;
