import {useAxios} from '@/hooks'

export const openDel = (api, form, title = '确定要删除吗？') => {
	const { loading, data, onSuccess, onError, send } = useAxios(api, {
		immediate: false
	});
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(
			title, {
			title: '提示',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = 'Loading...'
					send(form)
					onSuccess((res) => {
						resolve(true)
						setTimeout(() => {
							instance.confirmButtonLoading = false
						}, 300)
						ElNotification.success({
							title: '提示',
							message: '删除成功!',
							duration: 3000
						})
						done()
					})
					onError((res) => {
						setTimeout(() => {
							instance.confirmButtonLoading = false
							instance.confirmButtonText = '重试'
						}, 300)
						ElNotification.error({
							title: '提示',
							message: res.data.message || '删除操作失败！',
							duration: 3000
						})
						reject()
					})
				} else {
					done()
				}
			}
		}
		)
			.catch(() => {

			})
	})
}

export const openToBlack = (api, form, title = '确定要拉黑吗？') => {
	const { loading, data, onSuccess, onError, send } = useAxios(api, {
		immediate: false
	});
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(
			title, {
			title: '提示',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = 'Loading...'
					send(form)
					onSuccess((res) => {
						resolve(true)
						setTimeout(() => {
							instance.confirmButtonLoading = false
						}, 300)
						ElNotification.success({
							title: '提示',
							message: '拉黑成功!',
							duration: 3000
						})
						done()
					})
					onError((res) => {
						setTimeout(() => {
							instance.confirmButtonLoading = false
							instance.confirmButtonText = '重试'
						}, 300)
						ElNotification.error({
							title: '提示',
							message: res.data.message || '拉黑操作失败！',
							duration: 3000
						})
						reject()
					})
				} else {
					done()
				}
			}
		}
		)
			.catch(() => {

			})
	})
}

export const openCallBack = (api, form, title = '确定手动回调吗？') => {
	const { loading, data, onSuccess, onError, send } = useAxios(api, {
		immediate: false
	});
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(
			title, {
			title: '提示',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = 'Loading...'
					send(form)
					onSuccess((res) => {
						resolve(true)
						setTimeout(() => {
							instance.confirmButtonLoading = false
						}, 300)
						ElNotification.success({
							title: '提示',
							message: '回调成功!',
							duration: 3000
						})
						done()
					})
					onError((res) => {
						setTimeout(() => {
							instance.confirmButtonLoading = false
							instance.confirmButtonText = '重试'
						}, 300)
						ElNotification.error({
							title: '提示',
							message: res.data.message || '回调操作失败！',
							duration: 3000
						})
						reject()
					})
				} else {
					done()
				}
			}
		}
		)
			.catch(() => {

			})
	})
}

export const openChangeStatus = (api, form, title = '确定批量操作吗？') => {
	const { loading, data, onSuccess, onError, send } = useAxios(api, {
		immediate: false
	});
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(
			title, {
			title: '提示',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = 'Loading...'
					send(form)
					onSuccess((res) => {
						resolve(true)
						setTimeout(() => {
							instance.confirmButtonLoading = false
						}, 300)
						ElNotification.success({
							title: '提示',
							message: '操作成功!',
							duration: 3000
						})
						done()
					})
					onError((res) => {
						setTimeout(() => {
							instance.confirmButtonLoading = false
							instance.confirmButtonText = '重试'
						}, 300)
						ElNotification.error({
							title: '提示',
							message: res.data.message || '操作失败！',
							duration: 3000
						})
						reject()
					})
				} else {
					done()
				}
			}
		}
		)
			.catch(() => {

			})
	})
}

export const openBuyBack = (api, form, title = '确定返销吗？') => {
	const { loading, data, onSuccess, onError, send } = useAxios(api, {
		immediate: false
	});
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(
			title, {
			title: '提示',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			beforeClose: (action, instance, done) => {
				if (action === 'confirm') {
					instance.confirmButtonLoading = true
					instance.confirmButtonText = 'Loading...'
					send(form)
					onSuccess((res) => {
						resolve(true)
						setTimeout(() => {
							instance.confirmButtonLoading = false
						}, 300)
						ElNotification.success({
							title: '提示',
							message: '操作成功!',
							duration: 3000
						})
						done()
					})
					onError((res) => {
						setTimeout(() => {
							instance.confirmButtonLoading = false
							instance.confirmButtonText = '重试'
						}, 300)
						ElNotification.error({
							title: '提示',
							message: res.data.message || '操作失败！',
							duration: 3000
						})
						reject()
					})
				} else {
					done()
				}
			}
		}
		)
			.catch(() => {

			})
	})
}