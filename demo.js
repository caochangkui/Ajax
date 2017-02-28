function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != 'undefined') {
		var version = [
									'MSXML2.XMLHttp.6.0',
									'MSXML2.XMLHttp.3.0',
									'MSXML2.XMLHttp'
		];
		for (var i = 0; version.length; i ++) {
			try {
				return new ActiveXObject(version[i]);
			} catch (e) {
				//跳过
			}	
		}
	} else {
		throw new Error('您的系统或浏览器不支持XHR对象！');
	}
}

//名值对转换为字符串
function params(data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
}

//封装ajax
function ajax(obj) {
	var xhr = createXHR();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;    //如果get方法
	if (obj.async === true) {                          //如果异步调用
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method === 'post') {                    //如果post方法
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);	
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {                       //如果同步调用
		callback();
	}
	function callback() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}

//调用ajax


window.onload = function () {
	var aaa = document.getElementById("aaa");
	addEvent(aaa, 'click', function () {
		ajax({
		method : 'post',
		url : 'text.html',
		data : {
			'name' : 'cck',
			'age' : 27
		},
		success : function (text) {
			document.getElementById("mydiv").innerHTML=text;
 		},
		async : true
	});
	});
	
};


