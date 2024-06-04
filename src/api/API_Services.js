import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const serverAddress = 'http://localhost:4000/premind/api/';
// export const serverAddress ='https://2e1d-103-255-232-22.ngrok-free.app/rotary';
export const staticImageURL = 'https://picsum.photos/300';


export const VALIDATE_LOGIN = async data => {
    const url = `${serverAddress}/login`;
    const response = await axios
      .post(url, data)
      .then(res => res?.data)
      .catch(error => error?.response?.data);
    return response;
  };