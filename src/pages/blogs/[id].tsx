import React from "react";
import * as BlogAPI from "@/api/BlogAPI";
import BaseLayout from "@/layouts/BaseLayout";
import { Breadcrumb, Col, Row, Skeleton } from "antd";
import { InferGetServerSidePropsType } from "next";
import classes from "./blogs.module.scss";
import { BLOG_ROUTES } from "@/utils/routers";
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

const BlogDetailPage = ({
  blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    
    <BaseLayout>
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
            key: "title",
            href: "",
            title: <div>{blog.title || null}</div>,
          },
        ]}
      />
      <Row gutter={16} className={classes.wrapper}>
        {blog ? (
          <Col className="gutter-row" style={{ padding: "0 10px" }}>
            <h1 style={{ color: "black" }}>{blog.title}</h1>
            <p style={{ color: "black" }}>{blog.description}</p>
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
    </BaseLayout>
  );
};

export default BlogDetailPage;
