/*
	*************
 	create by Tim
	on 2016-6-21
	*************
 */
window.onload = function(){
	// 动态创建页面高度
	var oBg = document.getElementById('bg');
	var aModule = oBg.children;
	var iNow = 0;
	var bFlag = true;
	
	function getSize(){
		for(var i = 0; i < aModule.length; i++){
			aModule[i].style.height = document.documentElement.clientHeight + 'px';
			oBg.style.height = aModule[0].offsetHeight*4 + 'px';
		}
		oBg.style.top = -document.documentElement.clientHeight*iNow + 'px';
	}
	getSize();
	window.onresize = function(){
		getSize();
	};

	function wheel(bDown){
		if(bDown){
			if(bFlag){
				bFlag = false;
				iNow++;
				if(iNow > 3){
					iNow = 3;
				}
				move(oBg, {top: -iNow*aModule[0].offsetHeight}, {complete: function(){
					bFlag = true;
				}});
			}
        }else{
        	if(bFlag){
				bFlag = false;
				iNow--;
				if(iNow < 0){
					iNow = 0;
				}
				move(oBg, {top: -iNow*aModule[0].offsetHeight}, {complete: function(){
					bFlag = true;
				}});
			}
        }
	}

	// 滚轮切屏
	addWheel(oBg, wheel);


	// 导航
	var oNav = document.getElementById('nav');
	var aLi = oNav.getElementsByTagName('li');
	// 导航栏鼠标移入动态效果
	aLi[0].onclick = function(){	//按钮
		if(parseFloat(oNav.style.height) < 110){
			move(oNav,{height:366},{duration:200,easing:'linear'});
		}else{
			move(oNav,{height:100},{duration:200,easing:'linear'});
		}
	};
	// 导航下面横线运动效果
	var nav_arr = [50, 56, 60, 78];
	for(var i = 1; i < aLi.length; i++){
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			var oB = this.children[0];
			move(oB,{width:nav_arr[this.index-1]},{duration:200,easing:'linear'});
		};
		aLi[i].onmouseleave = function(){
			var oB = this.children[0];
			move(oB,{width:0},{duration:600,easing:'linear'});
		};
		aLi[i].onclick = function(){
			var k = this.index;
			move(oBg, {top: -(this.index-1)*aModule[0].offsetHeight}, {complete: function(){
				iNow = k-1;
			}});
		};
	}
	
	// banner框两道竖线运动
	var oBanner = document.getElementById('banner');
	var oL3 = oBanner.children[3];
	var oL4 = oBanner.children[4];
	var oLet = oBanner.children[6];
	move(oL3, {top: 100});
	move(oL4,{left: 0});
	// 标语闪烁
	function flash(){
		setTimeout(function(){
			move(oLet,{opacity: 0},{duration: 1000, complete: function(){
				move(oLet,{opacity: 1},{duration: 1000, complete: function(){
					flash();
				}})
			}});
		},2000);
	}
	flash();

	// ABOUT
	var oAbout = document.getElementById('about');
	var aBlock = oAbout.children;
	for(var i = 3; i < aBlock.length; i++){
		ball(aBlock[i]);
	}

	// WORKS
	var oWorks = document.getElementById('works');
	var aWorks_s = oWorks.children;
	for(var i = 0; i < aWorks_s.length; i++){
		drag(aWorks_s[i]);
	}

	var oDownLoad = document.getElementById('download');
	oDownLoad.onmouseenter = function(){
		oDownLoad.style.boxShadow = '0px 0px 7px #fff';
		oDownLoad.style.textShadow = '0px 0px 1px #fff';
	};
	oDownLoad.onmouseleave = function(){
		oDownLoad.style.boxShadow = '0px 0px 0px #fff';
		oDownLoad.style.textShadow = '0px 0px 0px #fff';
	};


	function drag(obj){
		obj.onmousedown=function(ev){
            var oEvent=ev || event;
            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev || event;
                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };
	}
};






















