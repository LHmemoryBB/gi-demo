import axios from 'axios'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
	baseURL: '',
	timeout: 60 * 1000
})

// 使用axios拦截器，拦截请求
service.interceptors.request.use(
	config => {
		// 设置请求头
		config.headers['Authorization'] = getToken('_token')
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
		return response
	},
	error => {
		// 返回错误信息
		return Promise.reject(error)
	}
)

export const onExport = (url, data) => {
	return new Promise((resolve, reject) => {
		service.post(url, data, {
			responseType: 'blob'
		}).then((res) => {
			try {
				const parsedObject = JSON.parse(textContent);
				//解析成功，该变量是一个对象
				console.log(parsedObject)
				if(parsedObject.code !== 2001){
					ElMessage.error(parsedObject.message || '导出错误')
				}
				reject()
			} catch (error) {
				//解析失败，该变量不是一个对象
				let blob = new Blob([res.data], {
					type: 'application/vnd.ms-excel',
				});
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.href = url;
				let decodedFilename = null
				const contentDisposition = res.headers['content-disposition'];
				if (contentDisposition && contentDisposition.includes('attachment')) {
					// 提取filename参数
					const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
					const matches = filenameRegex.exec(contentDisposition);
					if (matches != null && matches[1]) {
						// 解码文件名
						const encodedFilename = matches[1].replace(/['"]/g, '');
						decodedFilename = decodeURIComponent(encodedFilename);
					}
				}
				a.download = decodedFilename || '导出文件的名称.xlsx';
				a.click();
				window.URL.revokeObjectURL(url);
				ElNotification.success({
					title: '提示',
					message: '导出成功!',
					duration: 3000
				})
				resolve()
			}
			
		}).catch(err => {
			ElNotification.error({
				title: '提示',
				message: '导出失败！',
				duration: 3000
			})
			reject()
		})
	})
}

export const openExport = (api, form) => {
	ElMessageBox.confirm(
			'导出全部？', {
				title: '提示',
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				beforeClose: (action, instance, done) => {
					if (action === 'confirm') {
						instance.confirmButtonLoading = true
						instance.confirmButtonText = 'Loading...'
						onExport(api(), form).then(res => {
							done()
							setTimeout(() => {
								instance.confirmButtonLoading = false
							}, 300)
						}).catch(error => {
							setTimeout(() => {
								instance.confirmButtonLoading = false
								instance.confirmButtonText = '重试'
							}, 300)
						})
					} else {
						done()
					}
				}
			}
		)
		.catch(() => {
	
		})
}