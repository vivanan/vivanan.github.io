function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,duration,complete){   // duration是运动过程花费的总时间
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(duration/30);  // 总步数
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			var a = n/count;
			var cur = start[name]+dis[name]*a;
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity=' +cur*100+ ')';
			}else{
				obj.style[name] = cur + 'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			complete && complete();
		}
	},30);
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

function findInArr(n,arr){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == n){
			return true;
		}
	}
	return false;
}

function toDouble(n){
	if(n < 10){
		return '0'+n;
	}else{
		return n;
	}
}

function findMinIndex(arr,start){
	var iMin = arr[start];
	var iMinIndex = start;
	for(var i = start+1; i < arr.length; i++){
		if(arr[i] < iMin){
			iMin = arr[i];
			iMinIndex = i;
		}
	}
	return iMinIndex;
}

function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var arr2 = [];
		for(var i = 0; i < aEle.length; i++){
			var tmp = aEle[i].className.split(' ');
			if(findInArr(sClass,tmp)){
				arr2.push(aEle[i]);
			}
		}
		return arr2;
	}
}

function getPos(obj){
	var l = 0;
	var t = 0;
	while(obj){
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l, top:t};
}

function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn && fn();
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}

function collTest(obj1,obj2){
	var l1 = obj1.offsetLeft;
	var r1 = obj1.offsetWidth + l1;
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetHeight + t1;
	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetWidth + l2;
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetHeight + t2;
	if(l2>r1 || l1>r2 || t2>b1 || t1>b2){
		return false;
	}else{
		return true;
	}
}




