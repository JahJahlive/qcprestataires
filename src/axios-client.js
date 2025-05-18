import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`
    return config;
  })

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    console.log(response)
    if (response && response.status === 401) {
        localStorage.removeItem('token')
    } 

    if (response.data.errors) {
        console.log('error list', Object.values(response.data.errors))

        Object.values(response.data.errors).map((msg) =>  toastr.error(msg[0]))
       
      }
    throw error;
})


export default axiosClient;