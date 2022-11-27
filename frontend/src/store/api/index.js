import axios from "axios";
const baseurl = "http://localhost:8000";
export const login = async (data) => {
  let res = await axios.post(baseurl + "/login", data);
  return res;
};
export const signup = async (data) => {
  let res = await axios.post(baseurl + "/signup", data);
  return res;
};
export const updateuserpassword = async (data) => {
  let res = await axios.post(baseurl + "/updatepassword", data);
  return res;
};
export const addproblem = async (data) => {
  let res = axios.post(baseurl + "/addproblem", data);
  return res;
};
export const addcomment = async (data) => {
  let res = axios.post(baseurl + "/addcomment", data);
  return res;
};
export const fetchproblems = async () => {
  let res = await axios.post(baseurl + "/fetchproblems");
  return res;
};
export const addlike = async (data) => {
  let res = await axios.post(baseurl + "/addlike",data);
  return res;
};
export const modifyStatus=async(data)=>{
  let res = await axios.patch(baseurl + "/updatestatus",data);
  return res;
};