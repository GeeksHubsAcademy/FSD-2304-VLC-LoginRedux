import axios from "axios";

// MIS ENDPOINTS

const URL = "https://express-api-basic.vercel.app";

export const loginUser = async (body) => {
  let res = await axios.post(`${URL}/auth/login`, body);
  return res.data.token;

  //   let res = await axios.post(`${URL}/auth/login`, body);
  //   return res.data.token;
};

export const getProfile = async (token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let res = await axios.get(`${URL}/user/profile`, config);

  return res.data;
};

export const updateProfile = async (body, token) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let res = await axios.put(`${URL}/user/profile`, body, config);
  return res;
};

export const getBooks = async () => {
  let res = await axios.get(`${URL}/books/`);
  return res.data.data;
};

export const deleteBook = async (body, token) => {
  await axios.delete(`${URL}/books/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body
  })
}

// ENDPOINTS EXTERNOS

const URL_RM = "https://rickandmortyapi.com/api";

export const getAllCharacters = async (page) => {
  let res = await axios.get(`${URL_RM}/character/?page=${page}`);
  return res.data;
};

export const getOneCharacter = async (id) => {
  let res = await axios.get(`${URL_RM}/character/${id}`);
  return res.data;
};
