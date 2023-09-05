import React from "react";
import * as BlogAPI from "@/api/BlogAPI";
import { InferGetServerSidePropsType } from "next";
import classes from "./dashboard.module.scss";
import { Breadcrumb, Col, Row, Skeleton } from "antd";
import AuthLayout from "@/layouts/AuthLayout";
import Link from "next/link";
import { ADMIN_ROUTES } from "@/utils/routers";
const blogDetail = ({
  blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AuthLayout>
      <Breadcrumb
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
      <Row gutter={16} className={classes.wrapper}>
        {blog ? (
          <Col className="gutter-row" style={{ padding: "0 10px" }}>
            <h1 style={{color:'black'}}>{blog.title}</h1>
            <p  style={{color:'black'}}>{blog.description}</p>
            <div className={classes.blogDetailImgContainer}>
              <img
                src={blog.image}
                alt={blog.title}
                className={classes.blogDetailImg}
              />
            </div>
            <div className={classes.blogDetailContent}>
              <p style={{ whiteSpace: "pre-line" }}>{blog.content}</p>
            </div>
          </Col>
        ) : (
          <Col className="gutter-row" span={18}>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Col>
        )}
      </Row>
    </AuthLayout>
  );
};

export default blogDetail;

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
