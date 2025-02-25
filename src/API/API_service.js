import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";
import { RAZORPAY_PAYMENT_KEY } from "../components/General/secrets";

export const serverAddress = `http://13.201.37.173:3000/premind/api`;
// export const serverAddress = `https://117d-2400-80c0-200e-527-00-1.ngrok-free.app/premind/api`;

export const SIGNUP_USER = async (data) => {
  const url = `${serverAddress}/signup`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const LOGIN_USER = async (data) => {
  const url = `${serverAddress}/signin`;

  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_ALL_CATEGORIES = async () => {
  const url = `${serverAddress}/category/all`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_ALL_PRODUCTS = async () => {
  const url = `${serverAddress}/product/all`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const GET_SINGLE_PRODUCT = async (id) => {
  const url = `${serverAddress}/product/get/id/${id}`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const SEND_OTP_ON_EMAIL = async (data) => {
  console.log(data, "Line 57 ");
  const url = `${serverAddress}/reset/password/otp`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const VERIFY_SIGN_UP_USER_EMAIL = async (data) => {
  console.log(data, "Line 67");
  const url = `${serverAddress}/verify/email`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const VERIFY_OTP = async (data) => {
  const url = `${serverAddress}/reset/password/verify/otp`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const CHANGE_PASSWORD = async (data) => {
  const url = `${serverAddress}/reset/password/update`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};
export const GET_CART_PRODUCTS = async (id) => {
  const url = `${serverAddress}/cart/${id}`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const ADD_TO_CART = async (data) => {
  console.log("Item:", data);
  const url = `${serverAddress}/AddtoCart`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const REMOVE_FROM_CART = async (data) => {
  const url = `${serverAddress}/removefromcart`;
  console.log("API Url", url);
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const PLACE_ORDER = async (data) => {
  const url = `${serverAddress}/order/create`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const EMPTY_CART = async (id) => {
  const url = `${serverAddress}/emptyCart`;
  const response = await axios
    .post(url, id)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const UPDATE_PROFILE = async (data) => {
  const url = `${serverAddress}/edituser`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const SEARCH_PRODUCT = async (data) => {
  const url = `${serverAddress}/product/search`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const GET_ALL_ORDERS = async (email) => {
  const url = `${serverAddress}/my/orders/by/userId/${email}`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const OPEN_PAYMENT_GATEWAY = async (orderId) => {
  var options = {
    description: "Credits towards consultation",
    image: "https://i.imgur.com/3g7nmJC.jpg",
    currency: "INR",
    key: RAZORPAY_PAYMENT_KEY,
    amount: "5000",
    name: "Acme Corp",
    order_id: orderId, //Replace this with an order_id created using Orders API.
    prefill: {
      email: "gaurav.kumar@example.com",
      contact: "9191919191",
      name: "Gaurav Kumar",
    },
    theme: { color: "#53a20e" },
  };
  RazorpayCheckout.open(options)
    .then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    })
    .catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
};

export const GET_PRODUCT_BY_SLUG = async (name) => {
  console.log("brandname:", name);
  const url = `${serverAddress}product/get/:${name}`;
  const response = await axios
    .get(url)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);

  return response;
};

export const GET_SPECIFIC_USER_DETAILS = async (id) => {
  const url = `${serverAddress}/getuser/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const GET_SINGLE_PRODUCT_DETAILS = async (id) => {
  const url = `${serverAddress}/product/single/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const GET_ALL_COUPON = async () => {
  const url = `${serverAddress}/coupon/get/all`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const GET_COUPON_BY_COUPON_CODE = async (id) => {
  const url = `${serverAddress}/coupon/get/code/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const GET_RELATED_PRODUCT_DETAILS_BY_ID = async (id) => {
  const url = `${serverAddress}/product/get/id/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const HOME_PRODUCTS_SEARCH = async (data) => {
  const url = `${serverAddress}/product/main/search`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const GET_TOTAL_CART_COUNT = async (id) => {
  const url = `${serverAddress}/cart/count/${id}`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const ADD_ADDRESS = async (data) => {
  const url = `${serverAddress}/add/address`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const EDIT_ADDRESS = async (data) => {
  const url = `${serverAddress}/update/address`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};

export const REMOVE_ADDRESS = async (data) => {
  const url = `${serverAddress}/delete/address`;
  const response = await axios
    .post(url, data)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data);
  return response;
};
export const GET_CATEGORIES_IMAGES = async () => {
  const url = `${serverAddress}/get/category/images`;
  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
