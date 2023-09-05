import React from "react";
import classes from "./FormCreate.module.scss";
import { Input, List, Row, Col,  } from "antd";
import Link from "next/link";
import { ADMIN_ROUTES } from "@/utils/routers";

const FormCreate = ({ onSubmit, register, errors }: any) => {
  return (
    <form onSubmit={onSubmit} style={{marginLeft:'10px'}}>
      <List grid={{ gutter: 16 }}>
        <Col span={20} className={classes.formGroup}>
          <label>Title</label>
          <input
            {...register("title", {
              required: true,
            })}
            placeholder="Enter your title"
            type="text"
          />
          {errors.title && (
            <span className={classes.required}>Please your title </span>
          )}
        </Col>
        <Col span={20} className={classes.formGroup}>
          <label>Content</label>
          <textarea
            {...register("content", { required: true })}
            placeholder="Enter your content"
            type="text"
          />
          {errors.content && (
            <span className={classes.required}>Please your content </span>
          )}
        </Col>
        <Col span={20} className={classes.formGroup}>
          <label>Image</label>
          <input type="text" {...register("image")} />
          {errors.image && (
            <span className={classes.required}>Please your image </span>
          )}
        </Col>

        <Col span={20} className={classes.formGroup}>
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter your description"
            type="text"
          />
          {errors.description && (
            <span className={classes.required}>Please your description </span>
          )}
        </Col>
        <Row>
          <Col span={10} xs={12} sm={10} className={classes.btnCreate}>
            <button type="submit" >
  
              <Link href={ADMIN_ROUTES.DASHBOARD}>Back</Link>
            </button>
          </Col>
          <Col span={10} xs={8}sm={10} className={classes.btnCreate}>
            <button type="submit" >
              Create{" "}
            </button>
          </Col>
        </Row>
      </List>
    </form>
  );
};

export default FormCreate;
