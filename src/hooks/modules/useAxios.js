/*
  请求状态hooks
  requestFunction      	Promise 请求体
  options      			any 	请求配置
  loading   			Boolen  请求状态
  data      			Any		数据
  data_deconstruction 	fun		自定义解构res赋值data
  onSuccess() 			fun		成功回调
  onError()   			fun		失败回调
  send()         		fun		手动触发请求
  immediate				Boolen	默认请求
  localCache			Boolen	缓存
  localCache_time 		Number	缓存时间
  localCache_renewal   	Boolen	更新缓存
  defaultParams   		Any		提交参数
*/
import { ref, reactive, watch } from 'vue'
import { debounce } from "@/utils/throttle";

// 创建一个全局的请求缓存
const requestCache = reactive(new Map());

export default function (requestFunction, options = {}) {
	const { data = ref([] || options.data), immediate = true, debounceTime = 0, defaultParams = {}, data_deconstruction = null, total_deconstruction = null, localCache = false, localCache_time = 10, localCache_renewal = true } = options;
	const setOnSuccess = ref(() => { });
	const setOnError = ref(() => { });
	const onSuccess = (func) => setOnSuccess.value = func;
	const onError = (func) => setOnError.value = func;
	const loading = ref(false);
	const loadingDate = {};
	const isloading = (num) => {
		let load = loadingDate[requestFunction]
		if (!load || load < 0) load = 0
		load += num
		loading.value = load > 0 ? true : false
	};

	//分页
	const pages = ref(options.pages || { page: 1, pageSize: 10, total: 0 });
	if (options.isPages) {
		watch([() => pages.value.page, () => pages.value.pageSize], (newValue, oldValue) => {
			send();
		}, {
			deep: true,
			immediate: false
		});
	}
	
	//节流请求
	const requestParams = debounce((finalParams,urlKey) => {
		isloading(1)
		//请求体 requestFunction
		requestFunction(finalParams).then(res => {
			//解构res
			onsuccess(res,urlKey)
		}).catch(error => {
			isloading(-1)
			setOnError.value(error)
		})
	}, debounceTime)
	
	//请求前
	const send = (params = defaultParams) => {
		const finalParams = options.isPages ? { ...params, page: pages.value.page, size: pages.value.pageSize } : params;
		loading.value = true
		if (!localCache) {
			requestParams(finalParams);
		} else {
			//缓存
			const urlKey = JSON.stringify({ requestFunction, finalParams });
			if (requestCache.hasOwnProperty(urlKey) && localCache_renewal) {
				if(requestCache[urlKey].localCache_time > +new Date()){
					onsuccess(requestCache[urlKey].data)
					return
				}else{
					delete requestCache[urlKey]
				}
			}
			requestParams(finalParams,urlKey)
		}
	};
	
	//默认请求
	if (immediate) send()
	
	//成功
	const onsuccess = (res,urlKey)=>{
		const formatData = data_deconstruction?data_deconstruction(res):res;
		//响应data
		data.value = formatData
		//返回 非响应 res
		setOnSuccess.value(res)
		if (options.isPages) pages.value.total = total_deconstruction?total_deconstruction(res):res.data.total
		isloading(-1)
		//添加缓存
		if (urlKey) {
			requestCache[urlKey] = {
				data:res,
				localCache_time: +new Date() + 60000  * localCache_time
			}
		}
	}
	
	return { loading, data, onSuccess, onError, send, pages }
}
