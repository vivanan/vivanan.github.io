// by: 有姿态的北漂


function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options){
	// 默认值
	var options = options || {};
	options.duration = options.duration || 500;
	options.easing = options.easing || 'ease-out';
	// 初始值
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration/30);  // 总步数
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-a*a*a);
					break;
			}
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity=' +cur*100+ ')';
			}else{
				obj.style[name] = cur + 'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
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

function toDou(n){
	if(n < 10){
		return '0'+n;
	}else{
		return ''+n;
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

// function collTest(obj1,obj2){
// 	var l1 = obj1.offsetLeft;
// 	var r1 = obj1.offsetWidth + l1;
// 	var t1 = obj1.offsetTop;
// 	var b1 = obj1.offsetHeight + t1;
// 	var l2 = obj2.offsetLeft;
// 	var r2 = obj2.offsetWidth + l2;
// 	var t2 = obj2.offsetTop;
// 	var b2 = obj2.offsetHeight + t2;
// 	if(l2>r1 || l1>r2 || t2>b1 || t1>b2){
// 		return false;
// 	}else{
// 		return true;
// 	}
// }

function collTest(obj1,obj2){
	var l1 = getPos(obj1).left;
	var r1 = obj1.offsetWidth + l1;
	var t1 = getPos(obj1).top;
	var b1 = obj1.offsetHeight + t1;
	var l2 = getPos(obj2).left;
	var r2 = obj2.offsetWidth + l2;
	var t2 = getPos(obj2).top;
	var b2 = obj2.offsetHeight + t2;
	if(l2>r1 || l1>r2 || t2>b1 || t1>b2){
		return false;
	}else{
		return true;
	}
}

function addCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie = name+ '=' +value+ '; path=/; expires=' +oDate.toUTCString();
	}else{
		document.cookie = name+ '=' +value+ '; path=/';
	}
}
function getCookie(name){
	var arr = document.cookie.split('; ');
	for(var i = 0; i < arr.length; i++){
		var arr2 = arr[i].split('=');
		if(arr2[0] == name){
			return arr2[1];
		}
	}
	return '';
}
function removeCookie(name){
	addCookie(name,'1',-1);
}


// 弹性碰撞
function ball(obj){
    var iSpeedX=0;
    var iSpeedY=0;
    var lastX=0;
    var lastY=0;
    var timer;
    obj.onmousedown=function(ev){
        clearInterval(timer);
        var oEvent=ev || event;
        var disX=oEvent.clientX-obj.offsetLeft;
        var disY=oEvent.clientY-obj.offsetTop;

        document.onmousemove=function(ev){
            var oEvent=ev || event;
            obj.style.left=oEvent.clientX-disX+'px';
            obj.style.top=oEvent.clientY-disY+'px';

            // 当前坐标
            // 上一次坐标
            iSpeedX=oEvent.clientX-lastX;
            iSpeedY=oEvent.clientY-lastY;
            // 更新上一次坐标
            lastX=oEvent.clientX;
            lastY=oEvent.clientY;
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
            collision();
        };
        return false;
    };

    function collision(){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeedY+=3;
            var l=obj.offsetLeft+iSpeedX;
            var t=obj.offsetTop+iSpeedY;

            if(t>=document.documentElement.clientHeight-obj.offsetHeight){
                t=document.documentElement.clientHeight-obj.offsetHeight;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            if(l>document.documentElement.clientWidth-obj.offsetWidth){
                l=document.documentElement.clientWidth-obj.offsetWidth;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }
            if(t<0){
                t=0;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            if(l<0){
                l=0;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }

            obj.style.left=l+'px';
            obj.style.top=t+'px';

            // 速度小于1
            if(Math.abs(iSpeedX)<1){
                iSpeedX=0;
            }
            if(Math.abs(iSpeedY)<1){
                iSpeedY=0;
            }
            if(iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-obj.offsetHeight){
                clearInterval(timer);
            }
        }, 30);
    }
}

function addEvent(obj, sEv, fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv, fn, false);
    }else{
        obj.attachEvent('on'+sEv, fn);
    }
}

function addWheel(obj, fn){
    function wheel(ev){
        var oEvent=ev || event;

        var bDown=true;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta>0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(oEvent.detail<0){
                bDown=false;
            }else{
                bDown=true;
            }
        }

        fn && fn(bDown);
        // 阻止默认事件
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }

    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll', wheel, false);
    }else{
        addEvent(obj, 'mousewheel', wheel);
    }
}
