import { useAxios } from '@/hooks'
import { notification } from 'ant-design-vue';
import { SmileOutlined, MehOutlined } from '@ant-design/icons-vue'
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
			notification.success({
				message: '提示',
				description: res.message,
				duration: 3
			});
			return resolve(true)
		})
		onError((err) => {
			row[key] = false
			notification.success({
				message: '提示',
				description: err.message || '修改失败',
				duration: 3
			});
			return reject(new Error('Error'))
		})
	})
}
