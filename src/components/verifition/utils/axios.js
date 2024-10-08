import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'?location.origin:'/VerificationCode';	

const service = axios.create({
	timeout: 60 * 1000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json; charset=UTF-8'
	},
})
service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		const res = response.data;
		return res
	},
	error => {}
)
export default service