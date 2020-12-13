import axios from "axios";

// for .catch
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

// for .then
function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

// creates a basic url for every request in this file
const productService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/product`,
});

export function addNewProduct(product) {
  // const accessToken = localStorage.getItem("accessToken")
  return productService
    .post("/new", product, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function getAllProducts() {
  return productService.get("/all-products").then((res) => res.data);
}
