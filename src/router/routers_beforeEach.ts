import routers_add from '@/router/routers_add.js';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({
    easing: 'ease', // 动画方式
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 1, // 更改启动时使用的最小百分比
})

let _state = false

export default (to, from, next) => {
	NProgress.start()
	if(!getToken('_token')){
		if(!to.meta.power){
			next();
		}else{
			next('/login');
		}
	}else{
		if (!_state) {
			routers_add().then((res)=>{
				_state = true;
				if(to.path == '/login'){
					next();
				}else{
					next({ ...to, replace: true });
				}
			})
		} else {
			if(!to.meta.power){
				next();
			}else{
				next(false);
			}
		}
	}
	NProgress.done()
	document.title = (to.meta.title) + ' | 壹壹权益中控平台'
}

