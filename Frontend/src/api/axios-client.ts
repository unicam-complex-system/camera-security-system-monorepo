"use client";

import axios from "axios";

type RequestHeaderOptions = {
  Authorization?: string;
};

const accessToken = sessionStorage.getItem("access_token");
const headers: RequestHeaderOptions = {};

if (accessToken) {
  headers.Authorization = `Bearer ${sessionStorage.getItem("access_token")}`;
}
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { ...headers },
});

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
