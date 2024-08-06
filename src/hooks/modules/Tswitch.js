import { useAxios } from '@/hooks'

export default function switch_beforeChange(api, form, row, key) {
	row[key] = true
	return new Promise((resolve, reject) => {
		const {
			onSuccess,
			onError
		} = useAxios(api, {
			defaultParams: form
		});
		onSuccess((res) => {
			row[key] = false
			ElNotification({
				type: 'success',
				message: res.message || '操作成功！',
			})
			return resolve(true)
		})
		onError((err) => {
			row[key] = false
			ElNotification({
				type: 'error',
				message: err.message || '操作失败！',
			})
			return reject(new Error('Error'))
		})
	})
}
