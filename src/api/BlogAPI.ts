import axios from "axios";

import { APP_ROUTES, BLOG_ROUTES } from "@/utils/routers";
import { APIGetParams, exportResults } from "@/utils/api";
import { URL } from "@/axios";
import { BlogModel } from "@/types/model/blogs";

export const getList = async (params: APIGetParams) => 
 exportResults(
    await axios.get(`${URL}${BLOG_ROUTES.BLOGS}` ,{
      params :params
    })
  )
 

// if(params.limit  && params.page){
//   const lastPagition = params.page * params.limit;
//   const firstPagition = lastPagition - params.limit;
//   const currentPagtion = res.slice(firstPagition, lastPagition);
//   console.log({total :res.length , rows:res});
//   return { total: res.length, rows: currentPagtion }
// }
// return {total :res.length , rows:res}

export const findOneId = async (id: string, params: BlogModel) =>
  exportResults(
    await axios.get(`${URL}${BLOG_ROUTES.BLOGS}/${id} `, {
      params: params,
    })
  );

export const createBlogs = async (payload: BlogModel) =>
  exportResults(await axios.post(`${URL}${BLOG_ROUTES.BLOGS} `, payload));

export const deleteBlogs = async (id: string) =>
  exportResults(await axios.delete(`${URL}${BLOG_ROUTES.BLOGS}/${id} `));

export const updateBlogs = async (id: string, payload: BlogModel) =>
  exportResults(await axios.patch(`${URL}${BLOG_ROUTES.BLOGS}/${id}`, payload));
