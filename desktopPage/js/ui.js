// JavaScript Document

/*
1.获取非行间样式，增加行间样式 css(obj,attr,val)

2.通过类名获取元素           getByClass(oParent,sClass)

	增加类名、移除类名       addClass(obj, sClassName)
	
						   removeClass(obj, sClassName)

3.运动框架                  startMove(obj, json, fn)

4.拖拽函数                  DragSingle(clickarea,obj,Xmax,Ymax)

5.拖拽改变层的大小           DragChangeBigSmall(oParent,clickArea)

6.碰撞检测                  getClose(obj,target)

7.获取两元素间距             getDis(obj1,obj2)

8.Cookie操作                setCookie(key,val,times)
						   
						   getCookie(key,val)
						   
						   delCookie(key)

9.获取到最顶层定位级的L T 方向距离   getOffsetL(obj)
								 getOffsetT(obj)
								 
10.在一个数组集合中找最大值				  getMax(arr)				 
                         
11.补0函数                  toDou(n)

12.绑定事件、取消绑定事件     bindEvent(obj,events,fn)
						  
						   delEvent(obj,events,fn)

13.自定义滚动条    		   addMyScroll(scrollBtn,scrollBtnBox,contentWindow,contentOffsetH,fn)

14.面向对象选项卡            TabSwitch(id,evtMethod,btnParentTag,conParentTag)
*/

function css(obj,attr,val){
	if(!val){
		if(obj.currentStyle){
			return obj.currentStyle[attr];	
		}else{
			return getComputedStyle(obj,false)[attr];	
		}
	}else{
		obj.style[attr] = val;	
	}	
}

function addClass(obj, sClassName){
	var sClass =  obj.className;                  //类名存在变量中
	if (sClass == '') {							  //如果变量为空，那么直接他的类名就是新增的类名了
		obj.className = sClassName;
	} else {									  //如果不为空，那么将他的类名用空格分割，存到数组中去
		var aClass = sClass.split(' ');				
		for (var i=0; i<aClass.length; i++) {	  //循环这个数组看看有没有期中一个类名 为增加的类名，有则说明，就不必再加上了	
			if (aClass[i] == sClassName) {
				return ;                          //跳出函数
			}
		}
		obj.className = sClass + ' ' + sClassName; //循环结束，没跳出函数，就是没找到，那么就用他的类名和新增类名连起来，就算加上了
	}
}

function removeClass(obj, sClassName){
	var aClass =  obj.className.split(' ');
	var arr = [];
	
	for (var i=0; i<aClass.length; i++) {
		if (aClass[i] != sClassName) {
			arr.push(aClass[i]);
		}
	}
	
	obj.className = arr.join(' ');
	
}

function getByClass(oParent,sClass){
	var oParent = oParent || document;
	var aEle = oParent.getElementsByTagName('*');
	var result = [];
	
	var re = new RegExp('\\b'+sClass+'\\b');
	
	for(var i=0; i<aEle.length; i++){
		if(re.test(aEle[i].className)){
			result.push(aEle[i]);	
		}
	}
	return result; 
};

function startMove(obj, json, fn){
	clearInterval(obj.iTimer);
	var iSpeed = 0;
	var iCur = 0;
	obj.iTimer = setInterval(function(){
		var iBtn = true;
		for(var attr in json){
			
			if(attr == 'opacity'){
				iCur = Math.round(parseFloat(css(obj, 'opacity')) * 100);
			}else{
				iCur = parseInt(css(obj, attr));
			}
			
			iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(iCur != json[attr]){
				iBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.opacity = (iCur + iSpeed) / 100;
				obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
			}else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
		}
		if(iBtn){
			clearInterval(obj.iTimer);
			fn && fn();
		}
	}, 30);
}
function getStyle(obj, name){
    return (obj.currentStyle || getComputedStyle(obj, false))[name];
}
function move(obj, json, duration, complete){
    var start={};
    var dis={};

    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            var a=n/count;
            var cur=start[name]+dis[name]*a;

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity='+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            complete && complete();
        }
    }, 30);
}
function DragSingle(clickarea,obj,Xmax,Ymax){  //面向对象 方法继承 对拖拽范围增加新方法
	var Xmax = Xmax || null;
	var Ymax = Ymax || null;
	var disX = 0;
	var disY = 0;
	clickarea.onmousedown = function(ev){
		var ev = ev || event; 
		disX = ev.clientX - obj.offsetLeft;	
		disY = ev.clientY - obj.offsetTop;
		if(obj.setCapture){
			obj.setCapture();	
		}
		document.onmousemove = function(ev){
			var ev = ev || event;
			var iX = ev.clientX - disX;
			var iY = ev.clientY - disY;
			if(iX<0){
				iX = 0;	
			}else if(iX>Xmax-obj.offsetWidth){
				iX = Xmax-obj.offsetWidth;	
			}
			if(iY<0){
				iY = 0;	
			}else if(iY>Ymax - obj.offsetHeight){
				iY = Ymax - obj.offsetHeight;
			}
			obj.style.left = iX + "px";
			obj.style.top  = iY + "px";
		}
		document.onmouseup = function(){			
			document.onmousemove = null;
			document.onmouseup = null;
			if(obj.releaseCapture){
				obj.releaseCapture();	
			}
		}
		return false;
	}	
}

function dragObj(obj,Xmax,Ymax){  
	var Xmax = Xmax || viewW;	//设置拖拽范围默认为可视区
	var Ymax = Ymax || viewH;
	var disX = 0;
	var disY = 0;
	obj.onmousedown = function(ev){
		var ev = ev || event; 
		disX = ev.clientX - obj.offsetLeft;	
		disY = ev.clientY - obj.offsetTop;
		if(obj.setCapture){
			obj.setCapture();	
		}
		document.onmousemove = function(ev){
			var ev = ev || event;
			var iX = ev.clientX - disX;
			var iY = ev.clientY - disY;
			if(iX<0){
				iX = 0;	
			}else if(iX>Xmax-obj.offsetWidth){
				iX = Xmax-obj.offsetWidth;	
			}
			if(iY<0){
				iY = 0;	
			}else if(iY>Ymax - obj.offsetHeight){
				iY = Ymax - obj.offsetHeight;
			}
			obj.style.left = iX + "px";
			obj.style.top  = iY + "px";
		}
		document.onmouseup = function(){			
			document.onmousemove = null;
			document.onmouseup = null;
			if(obj.releaseCapture){
				obj.releaseCapture();	
			}
		}
		return false;
	}	
}

function DragChangeBigSmall(oParent,clickArea){
	var disX = 0;
	var disY = 0;
	var disW = 0;
	var disH = 0;
	clickArea.onmousedown = function(ev){
		var ev = ev || window.event;
		disX = ev.clientX;
		disY = ev.clientY;
		disW = oParent.offsetWidth;
		disH = oParent.offsetHeight;
		if(clickArea.setCapture){
			clickArea.setCapture();	
		}
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			var W = ev.clientX - disX + disW;
			var H = ev.clientY - disY + disH;
			if(W<500){
				W = 500;
			}
			if(H<250){
				H = 250;
			}
			oParent.style.width = W + 'px';
			oParent.style.height = H + 'px';
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			if(clickArea.releaseCapture){
				clickArea.releaseCapture();	
			}
		};
		return false;
	};
};

//碰撞
function getClose(obj,target){
	var L1 = obj.offsetLeft;
	var T1 = obj.offsetTop;
	var W1 = obj.offsetWidth;
	var H1 = obj.offsetHeight;
	
	var L2 = target.offsetLeft;
	var T2 = target.offsetTop;
	var W2 = target.offsetWidth;
	var H2 = target.offsetHeight;

	if( (W1+L1)<L2||L1>(W2+L2)||(H1+T1)<T2||T1>(H2+T2) ){
		return false;
	}else{
		return true;
	}
}

//获取距离 (尺寸相同情况)
function getDis(obj1,obj2){
	var a = obj1.offsetLeft - obj2.offsetLeft;
	var b = obj1.offsetTop - obj2.offsetTop;
	return Math.sqrt(a*a+b*b);	
}

//cookie操作
function setCookie(key,val,times){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+times);
	document.cookie = key+'='+val+'; expires='+oDate;
}

function getCookie(key,val){
	var a = document.cookie.split('; ');
	for(var i=0; i<a.length; i++){
		var b = a[i].split('=');
		if(b[0]==key){
			return b[1];	
		}
	}
}

function delCookie(key){
	setCookie(key,'',-1);	
}

function getOffsetL(obj){
	var result = 0;
	while(obj){
		result+=obj.offsetLeft;	
		obj = obj.offsetParent; 
	}
	return result;	
}
function getOffsetT(obj){
	var result = 0;
	while(obj){
		result+=obj.offsetTop;
		obj = obj.offsetParent;	
	}
	return result;	
}

//找最大值
function getMax(arr){ 
	var iMin = -999999; 	
	for(var i=0; i<arr.length; i++){	
	   if(arr[i]>iMin){		
		  iMin = arr[i];			
	   }			
	}	
	return iMin;	
}

//补0成为两位数
function toDou(n){
	if(n<10){
		return "0" + n;
	}else{
		return "" + n;
	}	
}	

//百度搜索接口
function sug(j) {
	var oSearchResult = document.getElementById('search_result');
	var oSearchResultList = getByClass(oSearchResult,'search_result_list')[0];			
	if (j.s.length) {
		oSearchResultList.style.display = 'block';
		oSearchResultList.innerHTML = '';
		for (var i=0; i<j.s.length; i++) {
			var oDiv = document.createElement('div');
			oDiv.innerHTML = j.s[i];
			var oA = document.createElement('a');
			oA.appendChild(oDiv);
			var oLi = document.createElement('li');
			oLi.appendChild(oA);
			oSearchResultList.appendChild(oLi);
		}
	} else {
		oSearchResultList.style.display = 'none';
	}
	
	if(j.s.length){
		var aSearchListTxt = oSearchResultList.getElementsByTagName('div');
		var oSearchBoxTxt = document.getElementById('search_box').getElementsByTagName('input')[0];
		
		for(var i=0; i<aSearchListTxt.length; i++){
			aSearchListTxt[i].onclick = function(){
				//alert(this.innerHTML);
				oSearchBoxTxt.value = this.innerHTML;	
			}
		}	
	}
}

/*面向对象选项卡*/
function TabSwitch(id,evtMethod,btnParentTag,conParentTag){
	var oBox = document.getElementById(id);
	if(!oBox){return false;}
	this.aBtn = getByClass(oBox,btnParentTag)[0].children;
	this.aDiv = getByClass(oBox,conParentTag)[0].children;
	
	for(var i=0; i<this.aBtn.length; i++){
		this.aBtn[i].index = i;
		this.aDiv[0].style.display = "block";
		this.aDiv[i].style.display = "none";
		var _this = this;
		this.aBtn[i][evtMethod] = function(){
			_this.tab(this);
		}
	}
}

TabSwitch.prototype.tab = function(iBtn){
	for(var i=0; i<this.aBtn.length; i++){
		this.aBtn[i].className = "";	
		this.aDiv[i].style.display = "none";
	}
	iBtn.className = "active";
	this.aDiv[iBtn.index].style.display = "block";	
}


//绑定事件，取消绑定事件
function bindEvent(obj,events,fn){
	if( obj.addEventListener ){
		obj.addEventListener(events,fn,false);
	}
	else{
		obj.attachEvent('on'+events,function(){
			
			fn.call(obj);
			
		});
	}
}

function delEvent(obj,events,fn){
	if( obj.removeEventListener ){
		obj.removeEventListener(events,fn,false);
	}
	else{
		obj.detachEvent('on'+events,fn);
	}
}

//自定义滚动条效果
function addMyScroll(scrollBtn,scrollBtnBox,contentWindow,contentOffsetH,fn){
	scrollBtn.onmousedown = function(ev){
		var ev = ev || event; 
		var disY = ev.clientY - scrollBtn.offsetTop;
		if(scrollBtn.setCapture){
			scrollBtn.setCapture();	
		}
		document.onmousemove = function(ev){
			var ev = ev || event;
			var iT = ev.clientY - disY;
			if(iT<0){
				iT = 0;	
			}else if(iT>(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight)){
				iT = scrollBtnBox.offsetHeight-scrollBtn.offsetHeight;	
			}
			
			var person = iT/(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight);
			
			if(contentOffsetH.offsetHeight > contentWindow.offsetHeight){
				contentOffsetH.style.top = -person*(contentOffsetH.offsetHeight - contentWindow.offsetHeight)+"px";	
			}
			fn && fn();
			scrollBtn.style.top = iT + 'px';	
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			if(scrollBtn.releaseCapture){
				scrollBtn.releaseCapture();	
			}	
		}	
	}
	
		//自定义滚动条--绑定滚动事件
	if(scrollBtnBox.addEventListener){
		scrollBtnBox.addEventListener("DOMMouseScroll",myScroll,false);	
	}
	scrollBtnBox.onmousewheel = myScroll;
	
	var myScrollBtn = '';
	
	function myScroll(ev){
		var ev = ev || event;
		var iT = 0;
		if(ev.detail){
			if(ev.detail>0){
				myScrollBtn = false;
			}else{
				myScrollBtn = true;
			}	
		}
		if(ev.wheelDelta){
			if(ev.wheelDelta>0){
				myScrollBtn = true;
			}else{
				myScrollBtn = false;
			}	
		}	
	
		if(!myScrollBtn){
			iT = scrollBtn.offsetTop + 10;	
		}else{
			iT = scrollBtn.offsetTop - 10;
		}
		if(iT<0){
			iT = 0;	
		}else if(iT>(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight)){
			iT = scrollBtnBox.offsetHeight-scrollBtn.offsetHeight;	
		}
		var person = iT/(scrollBtnBox.offsetHeight-scrollBtn.offsetHeight);
				
		if(contentOffsetH.offsetHeight > contentWindow.offsetHeight){
			contentOffsetH.style.top = -person*(contentOffsetH.offsetHeight - contentWindow.offsetHeight)+"px";	
		}
		fn && fn();
		scrollBtn.style.top = iT + 'px';
		if(ev.preventDefault){
			ev.preventDefault();	
		}else{
			return false;	
		}
	}

}
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}