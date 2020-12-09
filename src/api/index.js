import axios from "axios";
import { getToken, storeToken } from "./manageToken";

const user_Url = "https://localhost:44369/api/User";
const college_Url = "https://localhost:44369/api/College";

export const handle_Login = async (data) => {
  let result = 400;
  await axios
    .post(`${user_Url}/login`, data)
    .then((response) => {
      storeToken(response.data.token);
      result = response;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error);
        result = error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        result = error.request;
        // result = null;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        result = error.message;
      }
    });
  // console.log(result);
  return result;
};

export const add_course = async (data) => {
  let result = await axios.post(`${college_Url}/AddCourses`, data);
  return result;
};

export const get_departments = async () => {
  let result = await axios.get(`${college_Url}/GetDepartments`);
  console.log("get department running");
  return result;
};

export const get_courses = async () => {
  let result = await axios.get(`${college_Url}/GetAllCourses`);
  console.log("get all course running");
  return result;
};

export const get_teacher_by_department = async (department_Id) => {
  let result = await axios.get(
    `${college_Url}/GetTeacherByDepartment/${department_Id}`
  );
  console.log("get teacher by department running");
  return result;
};

export const get_students = async () => {
  let result = await axios.get(`${college_Url}/GetAllStudent`);
  console.log("get all student running");
  return result;
};

export const get_teachers = async () => {
  let result = await axios.get(`${college_Url}/GetAllTeacher`);
  console.log("get all teacher running");
  return result;
};

export const get_courses_by_id = async (id) => {
  let result = await axios.get(`${college_Url}/getcoursesbyid/${id}`);
  console.log("get student by id running");
  return result;
};

export const delete_courses = async (listId) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  let result = await axios.delete(
    `${college_Url}/DeleteCourse`,
    { data: listId },
    axiosConfig
  );
  console.log("delete courses running");
  return result;
};

export const apply_course = async (listId) => {
  console.log(listId);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  let result = await axios.post(`${user_Url}/ApplyCourse`, listId, axiosConfig);
  console.log("apply course running");
  return result;
};

export const update_courses = async (data) => {
  let result = await axios.put(`${college_Url}/UpdateCourses`, data);
  console.log("get student by id running");
  return result;
};

export const register = async (data) => {
  let result = await axios.post(`${user_Url}/Register`, data);
  console.log("create new account running", data.Role);
  return result;
};

export const get_user_infor = async () => {
  let axiosConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  let result = await axios.get(`${user_Url}/GetUserInfo`, axiosConfig);
  console.log("get user infor running");
  return result;
};
