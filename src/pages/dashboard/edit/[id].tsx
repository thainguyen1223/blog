import BaseLayout from "@/layouts/BaseLayout";
import React, { useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import * as BlogAPI from "@/api/BlogAPI";
import classes from "./edit.module.scss";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import AuthLayout from "@/layouts/AuthLayout";
import { blogStore } from "@/store/blogStore";
import { Modal } from "antd";
import { ADMIN_ROUTES } from "@/utils/routers";
import { Input } from "antd";
import { Breadcrumb } from 'antd';
import FormEdit from "../../../components/FormEdit";
const { TextArea } = Input;
const edit = ({
  blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [blogItem, setBlogItem] = useRecoilState(blogStore);

  const router = useRouter();

  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await BlogAPI.updateBlogs(blog.id, blogItem);
      setBlogItem(blogItem);

      Modal.success({
        content: " Edit in successfully ",
      });
      setTimeout(() => {
        router.push(ADMIN_ROUTES.DASHBOARD);
      }, 3000);
    } catch (err) {
      Modal.error({
        content: " Edit in failed ",
      });
    }
  };


  useEffect(() => {
    handleSubmitEditTodo;
    setBlogItem({ ...blog });
  }, []);
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
          {
            key: "title",
            href: "",
            title: <div>{blog.title || null}</div>,
          },
        ]}
      />
      <div className={classes.EditPage}>
        <h2>Edit Blog</h2>
        <FormEdit handleSubmitEditTodo={handleSubmitEditTodo} />
      </div>
    </AuthLayout>
  );
};

export default edit;

export const getServerSideProps = async ({ query }: any) => {
  const { id, params } = query;
  try {
    const res = await BlogAPI.findOneId(id, params);
    return { props: { blog: res } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
