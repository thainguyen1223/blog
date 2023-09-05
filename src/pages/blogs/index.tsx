import BaseLayout from "@/layouts/BaseLayout";
import React, { useEffect, useState } from "react";
import * as BlogAPI from "@/api/BlogAPI";
import { BlogModel, BlogState } from "@/types/model/blogs";
import {
  Avatar,
  List,
  Skeleton,
  Pagination,
  Breadcrumb,
  PaginationProps,
} from "antd";
import Link from "next/link";

import { APP_ROUTES } from "@/utils/routers";
import classes from "./blogs.module.scss";


const blogs = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: null,
  });
  const [loading, setLoading] = useState(false);
  const [blogsState, setBlogsState] = useState<BlogState>({
    total: undefined,
    rows: [],
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


	const handleChangePagination: PaginationProps['onChange'] = (page) => {
	
		setPagination({
			...pagination,
			page: page,
		})
	}
  useEffect(() => {
    getBlogList();
  }, [pagination]);

  return (
    <BaseLayout>
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
            key: "blogs",
            href: "",
            title: "Blogs",
          },
        ]}
      />

      {blogsState && blogsState?.rows && blogsState?.rows?.length > 0 ? (
        <div
 
        >
          <List
            itemLayout="horizontal"
            className={classes.listBlogs}
            dataSource={blogsState?.rows}
            renderItem={(item: BlogModel) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={
                    <Link href={`${APP_ROUTES.BLOGS}/${item.id}`}>
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
    </BaseLayout>
  );
};

export default blogs;
