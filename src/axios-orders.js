import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8b914-default-rtdb.firebaseio.com/'
})

export default instance;