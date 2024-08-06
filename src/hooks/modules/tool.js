//校验数据类型
export const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

//事件戳转换
export const getDateTimeFront = (time = '',type,hengGang='-') => {
	var date = new Date(time);
　　var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var curDate = date.getDate();
	var curHours = date.getHours();
	var curMinutes = date.getMinutes();
	var curSeconds = date.getSeconds();
	var maoHao = ":";
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (curDate >= 0 && curDate <= 9) {
		curDate = "0" + curDate;
	}
	if (curHours >= 0 && curHours <= 9) {
		curHours = "0" + curHours;
	}
	if (curMinutes >= 0 && curMinutes <= 9) {
		curMinutes = "0" + curMinutes;
	}
	if (curSeconds >= 0 && curSeconds <= 9) {
		curSeconds = "0" + curSeconds;
	}
	var currentdate = "";
	if (type == "month") {
		currentdate = year + hengGang + month;
		return currentdate;
	} else {
		currentdate = year + hengGang + month + hengGang + curDate + " " + curHours + maoHao + curMinutes + maoHao + curSeconds
		return currentdate;
	}
}