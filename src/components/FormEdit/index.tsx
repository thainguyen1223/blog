import React, { useState } from "react";
import { Col, Input, Row ,List,Button } from "antd";
import { useRecoilState } from "recoil";
import Link from "next/link"; 
import { blogStore } from "@/store/blogStore";
import classes from "./FromEdit.module.scss";
import { ADMIN_ROUTES } from "@/utils/routers";

const FormEdit = ({ handleSubmitEditTodo }: any) => {
  const [blogItem, setBlogItem] = useRecoilState(blogStore);
  const { TextArea } = Input;

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogItem({
      ...blogItem,

      title: e.target.value,
    });
  };
  const handlecontent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogItem({
      ...blogItem,

      content: e.target.value,
    });
  };

  const handleimage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogItem({
      ...blogItem,

      image: e.target.value,
    });
  };

  const handledescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogItem({
      ...blogItem,

      description: e.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmitEditTodo} style={{marginLeft:'10px'}}>
      <List  grid={{
      gutter: 16,

    }}>
        <Col span={20} className={classes.formGroup}>
          <label>Title</label>
          <Input
            className={classes.title}
            value={blogItem.title}
            onChange={handleTitle}
            placeholder="Enter your title"
            type="text"
          />
        </Col>
        <Col span={20} className={classes.formGroup}>
          <label>Content</label>
          <TextArea
            className={classes.content}
            showCount
            value={blogItem.content}
            onChange={handlecontent}
            placeholder="Enter your content"
          />
        </Col>
        <Col span={20} className={classes.formGroup}>
          <label>Image</label>
          <Input
            value={blogItem.image}
            onChange={handleimage}
            placeholder="Enter your image"
            type="text"
          />
        </Col>

        <Col span={20} className={classes.formGroup}>
          <label>Description</label>
          <TextArea
            showCount
            className={classes.description}
            value={blogItem.description}
            onChange={handledescription}
            placeholder="Enter your description"
          />
        </Col>
        <Row gutter={16}>
        <Col span={10} xs={12} sm={10}  className={classes.btnEdit}>
          <button type="submit" ><Link href={ADMIN_ROUTES.DASHBOARD}>Back </Link></button>
        </Col>
        <Col span={10}  xs={8} sm={10} className={classes.btnEdit}>
          <button type="submit">Edit</button>
        </Col>
        </Row>
      </List>
    </form>
  );
};

export default FormEdit;