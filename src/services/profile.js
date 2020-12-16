import axios from "axios";

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  console.log("err:", err.response.data);
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

// creates a basic url for every request in this file
const profileService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/profile`,
});

export function updateUser(id, info) {
  return profileService
    .put(`/update/${id}`, info, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return {
        status: true,
        data: response.data,
      };
    })
    .catch(internalServerError);
}
export function getUser(id) {
  return profileService.get(`/${id}`).then((res) => res.data);
}
