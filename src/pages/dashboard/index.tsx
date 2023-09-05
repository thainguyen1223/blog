import React, { useEffect, useState } from "react";
import * as BlogAPI from "@/api/BlogAPI";
import { BlogModel, BlogState } from "@/types/model/blogs";
import {
  Avatar,
  List,
  Skeleton,
  Button,
  Breadcrumb,
  Divider,
  PaginationProps,
  Pagination,
} from "antd";
import Link from "next/link";
import { ADMIN_ROUTES } from "@/utils/routers";
import classes from "./dashboard.module.scss";
import AuthLayout from "@/layouts/AuthLayout";

import { PlusCircleOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

const dashboard = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: null,
  });
  const [loading, setLoading] = useState(false);
  const [blogsState, setBlogsState] = useState<BlogState>({
    rows: [],
    total: undefined,
  });

  const getBlogList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const res = await BlogAPI.getList({
        page: pagination.page,
        limit: pagination.limit,
      });
      const indexlastpage = pagination.page * pagination.limit;
      const indexfirstpage = indexlastpage - pagination.limit;
      const currentPage = res.slice(indexfirstpage, indexlastpage);
      setBlogsState({
        rows: currentPage,
        total: res.length,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleChangePagination: PaginationProps["onChange"] = (page) => {
    setPagination({
      ...pagination,
      page: page,
    });
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await BlogAPI.deleteBlogs(id);

      getBlogList();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogList();
  }, [pagination]);
  return (
    <AuthLayout>
      <Breadcrumb
        style={{ marginLeft: 10 }}
        className="breadcrumb"
        items={[
          {
            key: "home",
            href: "",
            title: "Home",
          },
          {
            key: "Dashboard",
            href: "",
            title: "Dashboard",
          },
        ]}
      />
      <div className={classes.btnCreate}>
        <Button type="primary">
          <Link href={ADMIN_ROUTES.CREATE}>
            <PlusCircleOutlined /> Add
          </Link>
        </Button>
      </div>
      {blogsState && blogsState?.rows && blogsState?.rows?.length > 0 ? (
        <div>
          <List
            itemLayout="horizontal"
            className={classes.listBlogs}
            dataSource={blogsState?.rows}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link href={`${ADMIN_ROUTES.EDIT}/${item.id}`}>edit</Link>,
                  <a
                    key="list-loadmore-edit"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={
                    <Link href={`${ADMIN_ROUTES.DASHBOARD}/${item.id}`}>
                      {item.title}
                    </Link>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
          <Pagination
            pageSize={pagination.limit}
            total={blogsState?.total}
            defaultCurrent={1}
            current={pagination.page}
            onChange={handleChangePagination}
          />
        </div>
      ) : (
        <Skeleton
          avatar
          paragraph={{ rows: 1 }}
          active
          style={{ marginTop: 20 }}
        />
      )}
    </AuthLayout>
  );
};

export default dashboard;
