import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
	baseURL: '',
	timeout: 60 * 1000,
	headers: {
	    // 设置后端需要的传参类型
	    'Content-Type': 'application/json',
	    'X-Requested-With': 'XMLHttpRequest',
	},
})

// 使用axios拦截器，拦截请求
service.interceptors.request.use(
	config => {
		// 设置请求头
		config.headers['Authorization'] = getToken('_token')
		config.headers['X-CSRF-TOKEN'] = getToken('XSRF-TOKEN')
		config.headers['X-XSRF-TOKEN'] = getToken('XSRF-TOKEN')
		return config
	},
	error => {
		// 如果请求出错，返回错误信息
		return Promise.reject(error)
	}
)
// 使用axios拦截器，拦截响应
service.interceptors.response.use(
	response => {
		// 获取响应数据
		// 如果响应状态码不为200，则提示错误信息
		if (response.status !== 200) {
			ElMessage.error(response.data.message || '请求错误')
		} else {
			if(response.data.code == 200){
				return response.data
			}else{
				ElMessage.error(response.data.message || '请求错误')
				return Promise.reject(response)
			}
		}
	},
	error => {
		// 如果响应出错，提示错误信息
		switch (error.message) {
			case 'canceled':
				break;
			case 'Using Caching':
				break;
			default:
				if(error.message.includes('timeout')){
					ElMessage.error('请求超时 !')
				}else{
					ElMessage.error('错误'+error.message)
				}
		}
		// 返回错误信息
		return Promise.reject(error)
	}
)

// 导出service
export default service