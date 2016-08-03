//////////////////////////////////////////
//***************************************//										
//*	create by xiaoNan on 2016.6.29	   	*//			
//*	wechat:77786158						*//
//*	qq:77786158							*//
//*	tel:18335933992						*//
//*										*//
//*										*//
//*	i want to join your!				*//
//*	and i want to join a great team		*//
//*	just tel me !						*//
//*	thanks!								*//					
//////////////////////////////////////////


~$(function(){
	/*--------------------------前置背景动画--------------------------*/
	// setTimeout(function(){
	// 	$('#beforeBg').hide(1500);
	// },1000)
	/*--------------------------网页背景自适应--------------------------*/
	var oBgApp=(function(){
		var oBg=$('#bg');
		var oBgImg=$('#bg img');

		function resizeBg(bgWindow,oBgImg){
			// 网页背景
			if(!bgWindow)return;
			if(!oBgImg)return;
			bgWindow.css({
				width:viewW(),
				height:viewH()
			});
			oBgImg.css({
				width:viewW(),
				height:'auto'
			})
			if (oBgImg.outerHeight()>viewH()) {
				oBgImg.css('top',-(oBgImg.outerHeight()-viewH())/2);
			}else{

				oBgImg.css({
					height:viewH(),
					width:viewW(),
					left:-(oBgImg.outerWidth()-viewW())/2
				});
			}
		}
		resizeBg(oBg,oBgImg);
		//返回值
		return {
			Bg : oBg,
			BgName : oBgImg,
			oBgAppBgAppSkill : resizeBg	
		}
	})();

	/*左侧导航定位*/
	var oLeftBar=$('#sidebar');
	oLeftBar.css({
		left:-57,
		top:(viewH()-oLeftBar.outerHeight())/2
	});
	oLeftBar.bind('mouseenter',function(){
		oLeftBar.stop().animate({left:0},{duration:1000});
	})
	oLeftBar.bind('mouseleave',function(){
		setTimeout(function(){
			oLeftBar.stop().animate({left:-57},{duration:1000});
		},1000)		
	});
	/*-----------------------桌面APP分页-------------------------*/

						/*桌面APP区域*/
	var oContent=$('#content_window');
	oContent.css({
		width:viewW(),
		height:viewH()
	});
					/*页面顶部导航定位*/
	var oTopMenu=$('#top_menu');				
	var aPagesBtn=$('.pages li');			
	oTopMenu.css({
		left:(viewW()-oTopMenu.outerWidth())/2,
		top:15
	})
					/*桌面按钮区域*/ 	
	var oContentBox=$('.content_box');
	var aContentBox=$('.paging_window');	//分页几页
	var cur=0;	
	
	desktopSize();

	//桌面APP容器尺寸				
	function desktopSize(){
		var aAppList=$('.app_list');
		oContentBox.css({
			width:viewW()*aContentBox.length,
			height:viewH()
		});
		aContentBox.css({
			width:viewW(),
			height:viewH()
		});
		aAppList.css({
			width:viewW()-130,
			height:viewH()-120		//上下各60px
		})
	}

	var aAppBtn = '';
	var iH = 88 + 25;  //按钮宽+间距
	var iW = 88 + 55;  //按钮高+间距
	var iContentBoxH = viewH()- 60 - 60;
	
	/*------------------------桌面区域 功能按钮布局----------------------------*/
	for(var i=0; i<aPagesBtn.length; i++){
		//桌面APP切换
		aContentBox[cur].style.display = 'block';
		aPagesBtn[i].index = i;
		aPagesBtn[i].onclick = tab;
	}
	
	aAppBtn = $('.app_btn');
	var aPos = [];
	appBtnSize(iW,iH,iContentBoxH);
	//桌面区域 功能按钮布局
	function appBtnSize(iW,iH,iContentBoxH){
		iW = 88 + 55;
		for(var j=0; j<aAppBtn.length; j++){
			aAppBtn[j].index = j;
			//cols_num: 一列放的个数
			var cols_num = Math.floor(iContentBoxH/iH);  
			
			aAppBtn[j].style.left = Math.floor(j/cols_num) * iW + "px";
			
			//alert(Math.floor(j/cols_num));
			
			aAppBtn[j].style.top = (j%cols_num) * iH + "px";
			
			//列表所有功能按钮的划入划出效果	
			aAppBtn[j].onmouseover = function(){
				this.style.background = "url(images/css_sprite.png) no-repeat -412px 0";	
				//addClass(this,'active');
			}
			aAppBtn[j].onmouseout = function(){
				this.style.background = "";
				//removeClass(this,'active');	
			}
			
			//记录按钮坐标
			aPos.push({left:aAppBtn[j].offsetLeft , top:aAppBtn[j].offsetTop});
			
			//拖拽
			Drag(aAppBtn[j],viewW(),viewH());
		}
	}
	
	function findNearest(obj){
		var iMinIndex=-1;
		var iMin=999999999;
		for(i=0;i<aAppBtn.length;i++)
		{
			if(obj==aAppBtn[i])continue;
			
			if(getClose(obj, aAppBtn[i]))
			{
				var dis=getDis(obj, aAppBtn[i]);
				
				if(iMin>dis)
				{
					iMin=dis;
					iMinIndex=i;
				}
			}
		}
		if(iMinIndex==-1)
		{
			return null;
		}
		else
		{
			return aAppBtn[iMinIndex];
		}
	}
	
	function Drag(obj,Xmax,Ymax){  //照片墙效果控制桌面图标
		var Xmax = Xmax || null;
		var Ymax = Ymax || null;
		var disX = 0;
		var disY = 0;
		var iMinZindex = 2;
		obj.onmousedown = function(ev){
			var ev = ev || event; 
			disX = ev.clientX - obj.offsetLeft;	
			disY = ev.clientY - obj.offsetTop;
			if(obj.setCapture){
				obj.setCapture();	
			}
			obj.style.zIndex=iMinZindex++;
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
				
				for(var i=0; i<aAppBtn.length; i++){
					aAppBtn[i].style.border = "none";	
				}
				
				var oNear=findNearest(obj);
				
				if(oNear)
				{
					oNear.style.border='1px white dashed';
				}
			}
			document.onmouseup = function(){			
				document.onmousemove = null;
				document.onmouseup = null;
				if(document.releaseCapture){
					document.releaseCapture();	
				}
				var oNear=findNearest(obj);
				if(oNear)
				{	
					oNear.style.border='none';
				
					oNear.style.zIndex=iMinZindex++;
					obj.style.zIndex=iMinZindex++;
					
					startMove(obj , aPos[oNear.index]);
					startMove(oNear , aPos[obj.index]);
					 
					var tempIndex = '';
					tempIndex = oNear.index;
					oNear.index = obj.index;
					obj.index = tempIndex;
				}
				else
				{
					startMove(obj, aPos[obj.index]);
				}
			}
			clearInterval(obj.iTimer);
			return false;
		}	
	}

	//桌面分页
	function tab(){	
		for(var i=0; i<aPagesBtn.length; i++){
			aPagesBtn[i].className = "";	
		}
		this.className = "active";
	}
		/*---------------------窗口变动调整-----------------------------*/
		
	window.onresize = function(){
		//网页背景调整
		oBgApp.oBgAppBgAppSkill(oBgApp.Bg,oBgApp.BgName);	
		/*sidebar*/
		oLeftBar.css({
			left:-57,
			top:(viewH()-oLeftBar.outerHeight())/2
		})
		/*topmenu*/
		oTopMenu.css({
			left:(viewW()-oTopMenu.outerWidth())/2,
			top:15
		})
		/*桌面APP容器尺寸*/
		desktopSize();
		/*功能按钮布局*/
		var iContentBoxH = viewH()-120;
		appBtnSize(iW,iH,iContentBoxH);
		
	}
		/*----------------------苹果菜单---------------------------*/
	var oAppleMenu=$('#apple_menu');
	var aImg=$('#apple_menu a');
	(function(){
			//苹果菜单弹出层
		var oPageInBtn=$('.appleMenu_aboutWeb');
		var oPageInCon=$('#about_webpage');
		var oPageCloseBtn=$('.about_webpage_closeBtn');
			
		var oCallMeBox=$('#call_me');
		var oCallMeBtn=$('.appleMenu_telMe');
		var oCallMeCloseBtn=$('.call_me_closebtn');
		//给BOX加拖拽
		dragObj(oPageInCon[0]);
		dragObj(oCallMeBox[0]);
		oPageInCon.css('cursor','pointer');
		oCallMeBox.css('cursor','pointer');
			//网页内容开发简介			
		oPageInBtn.click(function(){				
			oPageInCon.fadeIn(500);		
		});
		oPageCloseBtn.click(function(){
			oPageInCon.hide(500);
		});
			//联系我 	
		oCallMeCloseBtn.click(function(){
			oCallMeBox.hide(500);		
		});
		oCallMeBtn.click(function(){
			oCallMeBox.fadeIn(500);
		});
		$(document).bind('mousemove',function(ev){
			var oEvent=ev || event;
			for (var i = 0; i < aImg.length; i++) {
				var a=getPos(aImg[i]).left+aImg[i].offsetWidth-oEvent.clientX;//left差
				var b=getPos(aImg[i]).top+aImg[i].offsetHeight-oEvent.clientY;//top差
				var c=Math.sqrt(a*a+b*b); //鼠标距离中心点的距离（三角形的斜边）
				var scale=1-c/500;
				scale<0.5 && (scale=0.5);
				aImg[i].style.width=128*scale+'px';
			}
		})
	})()
	
	
	

		/*----------------------图片时钟---------------------------*/
	Date.prototype.getCnDay=function(){
		return '日一二三四五六'.charAt(this.getDay());  //为Date加一个原形日期
	}	
	var myClock=(function(){
		var aClockTimeImg=$('.Date_clock_time img');
		var aClockDate=$('.Date_clock_date span');
		function clock(){
			var oDate=new Date;
			var Y=oDate.getFullYear();
			var M=oDate.getMonth()+1;
			var D=oDate.getDate();
			var W=oDate.getCnDay();

			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			var sTime=toDou(h)+':'+toDou(m)+':'+toDou(s);
			for (var i = 0; i < aClockTimeImg.length; i++) {
				if (sTime.charAt(i)==':')continue;
				aClockTimeImg[i].src='images/Date_clock_ico/'+sTime.charAt(i)+'.png';
			}
			aClockDate[0].innerHTML=Y;
			aClockDate[1].innerHTML=M;
			aClockDate[2].innerHTML=D;
			aClockDate[3].innerHTML=W;
		}
		clock();
		setInterval(clock,1000);				//
	})();	
		//为图片时钟加上拖拽效果
	var oClockBox=$('#Date_clock')[0];	
	dragObj(oClockBox);
	var oClockBtns=$('.Date_clock_btns')[0];
	$(oClockBox).mouseenter(function(){
		$(oClockBtns).css('display','block');
	})
	$(oClockBox).mouseleave(function(){
		$(oClockBtns).css('display','none');
	})
	var oClockCloseBtn=$('.close_btn');
	oClockCloseBtn.click(function(){
		$(oClockBox).hide(500);
	})


		/*------------------------弹出层--------------------------*/
	var oPopBox=$('#user_app');	
						//1)	主题设置相关
	var oTheme=(function(){
			//打开主题层按钮					
		var oThemeBtn=$('.theme');
		//苹果菜单设置按钮
		var oAppleThemeBtn=$('.appleMenu_sysSet');
		//主题层
		var oThemeBox=$('.theme_app');
		//关闭主题层的按钮
		var oThemeCloseBtn=$('.close_btn');
		//拖拽层
		var oThemeAppTitle=$('.theme_app_title');
		//拖拽
		dragObj(oThemeBox[0]);
		// 更换背景
		var aThemeBtns=$('.theme_app_content a');
		for(var i=0; i<aThemeBtns.length; i++){
			aThemeBtns[i].onclick = function(){
				oBgApp.BgName[0].src = this.getAttribute('_src');		
				oBgApp.BgName[0].style.opacity = '0';
				oBgApp.BgName[0].style.filter = 'alpha(opacity=0)';
				startMove(oBgApp.BgName[0],{opacity:100});
			}	
		};
		// 打开
		oAppleThemeBtn.click(function(){
			oThemeBox.fadeIn(1000);
		})
		oThemeBtn.click(function(){
			oThemeBox.fadeIn(1000);
		})
		// 关闭
		oThemeCloseBtn.click(function(){
			oThemeBox.hide(1000);
		})
				//函数返回值
		return {
			BoxName : oThemeBox
		}
	})();
				//顶部搜索框功能
	/*-----(2)搜索框-----*/
		/*搜索框功能*/
	var oSearchBoxApp = (function(){
		var oSearchBox = document.getElementById('search_box');
		var oSearchBtn = getByClass(oTopMenu[0],'search')[0];
		var oSearchResult = document.getElementById('search_result');
		var oSearchResultList = getByClass(oSearchResult,'search_result_list')[0];
		
		oSearchBtn.onclick = function(ev){
			var ev = ev || event;
			ev.cancelBubble = true; 
			oSearchBox.style.left = oTopMenu[0].offsetLeft + 18 + 'px';
			oSearchBox.style.top =  oTopMenu[0].offsetTop + oTopMenu.offsetHeight + 6 + 'px';
			$(oSearchBox).show(500);
		}
		document.onclick=function(){
			$(oSearchBox).hide(500);
		}
		
		var oSearchBoxTxt = getByClass(oSearchBox,'search_box_txt')[0];
		var oSearchBoxBtn = getByClass(oSearchBox,'search_box_btn')[0];
		oSearchBox.onclick = function(ev){
			var ev = ev || event;
			ev.cancelBubble = true;
		}
		oSearchBoxTxt.onfocus = function(){
			if(this.value == '搜索网页...'){
				this.value = '';	
			}	
		}
		oSearchBoxTxt.onblur = function(){
			if(this.value == ''){
				this.value = '搜索网页...';	
			}	
		}
		oSearchBoxTxt.onkeyup = function() {
			var oScript = document.createElement('script');
			oScript.src = 'http://suggestion.baidu.com/su?wd='+this.value+'&p=3&cb=sug&sid=1775_1736_1454_1667_1661_1760_1788&t=1357807626477';
			document.body.appendChild(oScript);			
		}
		//函数返回值
		return {
			BoxName : oSearchBox
		}
	})();
	/*-----(3)遮罩层-----*/
	var oMarkBox=(function(){
		var oMark=$('#mark');

		function markResize(){
			oMark.css({
				width:viewW(),
				height:getMax([viewH(),scrollH(),offsetH()]),
				display:'block'
			})
		}
		return {
			BoxName : oMark,
			markAuto: markResize
		}
	})();
	/*-----(4)手风琴-----*/
	var sfqBox=(function(){
		var oUl=document.getElementById('ul1');
        var aLi=oUl.children;
       
        // 布局
        var W=30;
        // oUl.style.width=aLi[0].offsetWidth+(aLi.length-1)*W+'px';
        // aLi[0].style.left=0;
        // aLi[0].style.top=0;
        for(var i=1; i<aLi.length; i++){
            aLi[i].style.left=aLi[0].offsetWidth+(i-1)*W+'px';
        }

        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                for(var i=1; i<aLi.length; i++){
                    if(i<=this.index){
                        move(aLi[i], {left: i*W}, 500);
                    }else{
                        move(aLi[i], {left: aLi[0].offsetWidth+(i-1)*W}, 500);
                    }
                }
            };
        }
        var osfqClose=$('.sfq_box_closeBtn');
        var oSfqBox=$('#sfq_box');
        var oSfqBoxBtn=$('.dateClock');
        oSfqBoxBtn.dblclick(function(){
        	oSfqBox.fadeIn(500);
        })
        osfqClose.click(function(){
        	oSfqBox.hide(500);
        })
	})()
	/*-----(5)阅读天下-----*/
		/*阅读天下功能*/
	var oReadBookApp = (function(){
		var oReadBook = document.getElementById('read_book');
		var oReadBookClose = getByClass(oReadBook,'close_btn')[0];
		var oReadBookMove = getByClass(oReadBook,'read_book_top')[0];
		var oReadBookPrevBtn = getByClass(oReadBook,'prev_btn')[0];
		var oReadBookNextBtn = getByClass(oReadBook,'next_btn')[0];
		var oPagingTxt = getByClass(oReadBook,'paging_txt')[0]
		var oReadBookContent = getByClass(oReadBook,'read_book_content')[0];
		var aBookContentPaging = getByClass(oReadBookContent,'book_content_paging');
		var iW = oReadBook.offsetWidth;
		var iPaging = 1;
		
		function readBookSize(){
			for(var i=0; i<aBookContentPaging.length; i++){
				aBookContentPaging[i].style.width = oReadBook.offsetWidth + 'px';	
			}
			oReadBookContent.style.width = aBookContentPaging.length * oReadBook.offsetWidth + 'px';	
			iW = oReadBook.offsetWidth;
		}
		
		//分页
		oReadBookPrevBtn.onclick = function(){
			iPaging-=1;
			if(iPaging<1){
				iPaging = 1;
				return false;
			}
			oPagingTxt.value = iPaging;
			startMove(oReadBookContent,{left:-(iPaging-1)*iW})
		}
		
		oReadBookNextBtn.onclick = function(){
			iPaging+=1;
			if(iPaging>aBookContentPaging.length){
				iPaging = aBookContentPaging.length; 
				return false;
			}
			oPagingTxt.value = iPaging;
			startMove(oReadBookContent,{left:-(iPaging-1)*iW});
		}
		
		dragObj(oReadBook,viewW,viewH);
		
		//关闭界面		
		$(oReadBookClose).click(function(){
			$(oReadBook).hide(700);
		})
		
		//函数返回值
		return {
			BoxName : oReadBook,
			sizeAuto : readBookSize
		}
		
	})()	
	var oReadWord = $('.read_word')[0];
	if(oReadWord){
		oReadWord.ondblclick = function(){
			$(oReadBookApp.BoxName).fadeIn(700);
			oReadBookApp.sizeAuto();	
		}	
	}

	/*-----(6)布局转换-----*/
			/*功能*/
	var oLayoutChangeApp = (function(){
		//布局转换窗口
		var oLayoutChange = document.getElementById('layout_change');
		//关闭按钮
		var oLayoutChangeClose = getByClass(oLayoutChange,'layout_change_closeBtn')[0];
		//拖拽区域
		var oLayoutChangeMove = getByClass(oLayoutChange,'layout_change_title')[0];
		//布局转化操作层
		var oLayoutChangeBody = getByClass(oLayoutChange,'layout_change_body')[0];
		//操作的元素
		var aLayoutChangeLi = oLayoutChange.getElementsByTagName('li');
		
		var LayoutChangeZindex = 2;
		//布局转换 脱离文档流
		
		//窗口关闭、拖动	
		oLayoutChangeClose.onclick = function(){
			$(oLayoutChange).hide(500);	
		}
		DragSingle(oLayoutChangeMove,oLayoutChange,viewW(),viewH());
		
		//布局转换
		function DoLayoutChange(){	
			
			for(var i=0; i<aLayoutChangeLi.length; i++){
				aLayoutChangeLi[i].style.left = aLayoutChangeLi[i].offsetLeft + 'px';	
				aLayoutChangeLi[i].style.top = aLayoutChangeLi[i].offsetTop + 'px';	
			}
			for(var i=0; i<aLayoutChangeLi.length; i++){
				aLayoutChangeLi[i].style.position = 'absolute';	
				aLayoutChangeLi[i].style.margin = '0px';	
			}
			//计算高度			
			oLayoutChangeBody.style.height = Math.ceil(aLayoutChangeLi.length/3)*(aLayoutChangeLi[0].offsetHeight + 68) + 'px';
			//添加事件
			for(var i=0; i<aLayoutChangeLi.length; i++){
				aLayoutChangeLi[i].onmouseover = function(){
					this.style.zIndex=LayoutChangeZindex++;
					startMove(this, {width: 140, height: 140, marginLeft: -30, marginTop: -30});		
				}	
			}
			for(var i=0; i<aLayoutChangeLi.length; i++){
				aLayoutChangeLi[i].onmouseout = function(){
					startMove(this, {width: 80, height: 80, marginLeft: 0, marginTop: 0});		
				}	
			}
		}
		
		//函数返回值
		return {
			BoxName : oLayoutChange,
			LayoutChangeSkill : DoLayoutChange
		}
		
	})()
	
	//布局转换 窗口打开
	var oLayoutChangeOpen = getByClass(content_window,'LayoutChange_ico')[0];
	oLayoutChangeOpen.ondblclick = function(){
		$(oLayoutChangeApp.BoxName).fadeIn(500);
		oLayoutChangeApp.BoxName.style.left = (viewW() - oLayoutChangeApp.BoxName.offsetWidth)/2 + 'px';
		oLayoutChangeApp.BoxName.style.top = (viewH() - oLayoutChangeApp.BoxName.offsetHeight)/2 + 'px';
		oLayoutChangeApp.LayoutChangeSkill();
	}
	/*-----(7)图片预加载-----*/
			/*功能*/
	var oImgOnloadApp = (function(){
		
		var oImgOnload = document.getElementById('Img_onload');
		var oImgOnloadMove = getByClass(oImgOnload,'Img_onload_title')[0];	
		var oImgOnloadCloseBtn = getByClass(oImgOnload,'Img_onload_closeBtn')[0]
		//显示区域
		var oImgOnloadWindow = getByClass(oImgOnload,'Img_onload_window')[0];
		//装图片盒子
		var oImgOnloadBody = getByClass(oImgOnload,'Img_onload_body')[0];
		//滚动按钮
		var oImgOnloadSclBtn = getByClass(oImgOnload,'Img_onload_scrollbtn')[0];
		//滚动区域
		var oImgOnloadSclBox = getByClass(oImgOnload,'Img_onload_scrollbox')[0];
		var aImgOnloadImg = oImgOnload.getElementsByTagName('img');
		
		//关闭、拖动
		oImgOnloadCloseBtn.onclick = function(){
			$(oImgOnload).hide(500);	
		}
		DragSingle(oImgOnloadMove,oImgOnload,viewW(),viewH());
		
		//自定义滚动
		addMyScroll(oImgOnloadSclBtn,oImgOnloadSclBox,oImgOnloadWindow,oImgOnloadBody,ImgOnloadGo);
		//图片预加载
		function ImgOnloadGo(){
			for(var i=0; i<aImgOnloadImg.length; i++){
				if(aImgOnloadImg[i].parentNode.offsetTop < (oImgOnloadWindow.offsetHeight - oImgOnloadBody.offsetTop) && !aImgOnloadImg[i].hasShow){
					aImgOnloadImg[i].src = aImgOnloadImg[i].getAttribute("_src");	  //除非是JS写入的，不然在结构里面直接添加的自定义属性有兼容问题 SRC是属性
					aImgOnloadImg[i].style.opacity = 0;
					aImgOnloadImg[i].style.filter = "alpha(opacity=0)";
					startMove(aImgOnloadImg[i],{opacity:100});
					// $(aImgOnloadImg).css({
					// 	opacity:100
					// })
					aImgOnloadImg[i].hasShow = true;	
				}
			}
		}
		
		//函数返回值
		return {
			BoxName : oImgOnload,
			ImgloadSkill : ImgOnloadGo	
		}
		
	})()
	
	//图片预加载打开
	var oImgOnloadOpenBtn = getByClass(content_window,'Img_onload_ico')[0]
	oImgOnloadOpenBtn.ondblclick =function(){

		$(oImgOnloadApp.BoxName).fadeIn(500);	
		oImgOnloadApp.BoxName.style.left = (viewW() - oImgOnloadApp.BoxName.offsetWidth)/2 + 'px';
		oImgOnloadApp.BoxName.style.top = (viewH() - oImgOnloadApp.BoxName.offsetHeight)/2 + 'px';
		oImgOnloadApp.ImgloadSkill();
	}
	/*-----(8)表格操作-----*/
			/*功能*/
	var oTableControlApp = (function(){
			//表格操作层
		var oTableControl = document.getElementById('table_control');
			//表格头部区域
		var oTableControlTitle = getByClass(oTableControl,'table_control_title')[0];
			//关闭按钮
		var oTableControlClose = getByClass(oTableControl,'table_control_closeBtn')[0];
		
			//表格操作区域
		var oTableControlTab = getByClass(oTableControl,'table_control_tab')[0];
			//增加按钮
		var oTableControlAdd = getByClass(oTableControl,'table_control_add')[0];
			//排序按钮
		var oTableControlSort = getByClass(oTableControl,'table_control_sort')[0];
			//模糊搜索按钮
		var oTableControlSearch = getByClass(oTableControl,'table_control_search')[0];
			//输入框
		var oTableControlTxt = getByClass(oTableControl,'table_control_txt')[0];
			//删除行按钮
		var aTableDel = getByClass(oTableControl,'tab_del');
		
			
		
		oTableControl.onclick = function(ev){
			var ev = ev || event;
			ev.cancelBubble = true;
		}
		
		oTableControlTxt.onfocus = function(){
			if(oTableControlTxt.value=='新增内容'){
				oTableControlTxt.value='';
			}
		}
		oTableControlTxt.onblur = function(){
			if(oTableControlTxt.value==''){
				oTableControlTxt.value='新增内容';	
			}
		}
		
		oTableControlClose.onclick = function(){
			$(oTableControl).hide(500);	
		}
		
			//表格拖动
		DragSingle(oTableControlTitle,oTableControl,viewW(),viewH());
		
		var oTabArr = [];
		var aRows = oTableControlTab.tBodies[0].rows;
		var tabLen = aRows.length;
		
		for( var i=0; i<aRows.length; i++){
			oTabArr.push(aRows[i]);	
		}
			//表格排序
		var bBigerSort = true; //正序开关	
		oTableControlSort.onclick = function(){
			oTabArr = [];
			for( var i=0; i<aRows.length; i++){
				oTabArr.push(aRows[i]);	
			}
			if(bBigerSort){
				oTabArr.sort(function(obj1,obj2){
					return obj1.cells[0].innerHTML - obj2.cells[0].innerHTML;
				});
				bBigerSort = false;
			}else{
				oTabArr.sort(function(obj1,obj2){
					return obj2.cells[0].innerHTML - obj1.cells[0].innerHTML;
				});
				bBigerSort = true;
			}
			//进行排序
			for(var i=0; i<oTabArr.length; i++){	
				oTableControlTab.tBodies[0].appendChild(oTabArr[i]);
			}
		}
		
		//添加
		oTableControlAdd.onclick = function(){
			if(oTableControlTxt.value==''||oTableControlTxt.value==null){
				return false;	
			}else{
				var oTr = document.createElement('tr');
				var oTd1 = document.createElement('td');
				var oTd2 = document.createElement('td');
				var oTd3 = document.createElement('td');
				
				oTd1.innerHTML = ++tabLen;
				oTd2.innerHTML = oTableControlTxt.value;
				oTd3.innerHTML = "<a class='tab_del' href='#'>删除</a>";
				
				oTr.appendChild(oTd1);
				oTr.appendChild(oTd2);
				oTr.appendChild(oTd3);
				oTableControlTab.tBodies[0].appendChild(oTr); 
				
				aTableDel = getByClass(oTableControl,'tab_del');
				
				for(var i=0; i<aTableDel.length; i++){
					aTableDel[i].onclick = function(){
						oTableControlTab.tBodies[0].removeChild(this.parentNode.parentNode);
					}
				}					
			}
		}
		
		//删除
		for(var i=0; i<aTableDel.length; i++){
			aTableDel[i].onclick = function(){
				oTableControlTab.tBodies[0].removeChild(this.parentNode.parentNode);
			}
		}
				
		//函数返回值
		return {
			BoxName : oTableControl
		}
		
	})();
	
	//表格操作层 弹出按钮
	var oTabControlIco = getByClass(content_window,'tab_control_ico')[0];
	
	//窗口打开
	oTabControlIco.ondblclick = function(){
		$(oTableControlApp.BoxName).fadeIn(500);
		oTableControlApp.BoxName.style.left = (viewW()-oTableControlApp.BoxName.offsetWidth)/2 + 'px';
		oTableControlApp.BoxName.style.top = (viewH()-oTableControlApp.BoxName.offsetHeight)/2 + 'px';	
	}

/*-----(9)灵魂回响网站-----*/
	var oAudiWebApp = (function(){
		
		var oAudiWebOpen = getByClass(content_window,'Audi_ico')[0];
		oAudiWebOpen.ondblclick = function(){
			$(document.body).animate({
				opacity:0
			},{
				duration:1000,
				complete:function(){
					window.open('https://vivanan.github.io/linghunhuixiang/linghunhuixiang.html');
				}
			})
			
		}
		
	})()
	/*-----(10)JS展示网站-----*/
	var oPicWebApp = (function(){
		
		var oPicWebOpen = getByClass(content_window,'picWeb_ico')[0];
		// var tempwindow=window.open('_blank');
		oPicWebOpen.ondblclick = function(){
			$(document.body).animate({
				opacity:0
			},{
				duration:1000,
				complete:function(){
					window.open('https://vivanan.github.io');
				}
			})
		}
		
	})()
	/*-----(11)css3展示网站-----*/
	var oNxsWebApp = (function(){
		
		var oNxsWebOpen = getByClass(content_window,'Nxs_ico')[0];
		oNxsWebOpen.ondblclick = function(){
			$(document.body).animate({
				opacity:0
			},{
				duration:1000,
				complete:function(){
					window.open('https://vivanan.github.io/CSS3/js/index.htm');
					$(document.body).animate({
						opacity:1
					})
				}
			})
		}
		
	})()
/*-----(12)面向对象 选项卡-----*/
			/*功能*/
	var oMyTabBoxApp = (function(){
	
		var oMyTabBox = document.getElementById('MyTabBox');
		var oMyTabBoxMove = getByClass(oMyTabBox,'MyTabBox_title')[0];
		var oMyTabBoxClose = getByClass(oMyTabBox,'MyTabBox_closeBtn')[0];
		
		oMyTabBoxClose.onclick = function(){
			$(oMyTabBox).hide(500);	
		}
		
		DragSingle(oMyTabBoxMove,oMyTabBox,viewW(),viewH());
		
		var oMyFacetab = new TabSwitch('MyTabBox_One','onclick','MyTabBox_btns','MyTabBox_window');
		var oMyFacetab2 = new TabSwitch('MyTabBox_Two','onmouseover','MyTabBox_btns','MyTabBox_window');
		
		//函数返回值
		return {
			BoxName : oMyTabBox	
		}
		
	})()
	
	//面向对象窗口打开
	var oMyTabBoxOpen = getByClass(content_window,'MyTabBox_ico')[0];
	oMyTabBoxOpen.ondblclick = function(){
		$(oMyTabBoxApp.BoxName).fadeIn(500);
		oMyTabBoxApp.BoxName.style.left = (viewW()- oMyTabBoxApp.BoxName.offsetWidth)/2 + 'px';
		oMyTabBoxApp.BoxName.style.top = (viewH()- oMyTabBoxApp.BoxName.offsetHeight)/2 + 'px';
	} 


	/*-----(13)新浪留言-----*/
		/*功能*/
	var oSinaTxtApp = (function(){
	
		var oSinaTxt = document.getElementById('sina_txt');
		//拖动，关闭按钮
		var oSinaTxtMove = getByClass(oSinaTxt,'sina_txt_title')[0];
		var oSinaTxtClose = getByClass(oSinaTxt,'sina_txt_closeBtn')[0];
		//发布按钮，记录cookie,删除cookie
		var oSinaTxtDelCookie = getByClass(oSinaTxt,'sina_txt_delCookie')[0];
		var oSinaTxtSavCookie = getByClass(oSinaTxt,'sina_txt_saveCookie')[0];
		var oSinaTxtPbl = getByClass(oSinaTxt,'sina_txt_publish')[0];
		//输入，显示区域
		var oSinaTxtInput = getByClass(oSinaTxt,'sina_txt_input')[0];
		var oSinaTxtShow = getByClass(oSinaTxt,'sina_txt_show')[0];
		var oSinaTxtNew = getByClass(oSinaTxt,'sina_new_txt')[0];
		
		//关闭、拖动
		oSinaTxtClose.onclick = function(){
			$(oSinaTxt).hide(500);	
		}
		DragSingle(oSinaTxtMove,oSinaTxt,viewW(),viewH());
		//留言动画	
		oSinaTxtPbl.onclick = function(){
			if(oSinaTxtInput.value=='' || oSinaTxtInput.value==null){
				return false;	
			}else{
				var oDiv = document.createElement('div');
				var aDiv = oSinaTxtShow.getElementsByTagName('div');
				oDiv.innerHTML = oSinaTxtInput.value;
				
				if(aDiv.length){
					oSinaTxtShow.insertBefore(oDiv,aDiv[0]);		
				}else{
					oSinaTxtShow.appendChild(oDiv);
				}
				
				var tempTxtH = oDiv.offsetHeight;
				oDiv.style.height = '0px';
				startMove(oDiv,{height:tempTxtH},function(){
					startMove(oDiv,{opacity:100});	
				})
			}	
		}
		oSinaTxtInput.onfocus=function(){
			if (oSinaTxtInput.value=='（0）再次添加您的留言。（1） 点击记录Cookie后，重刷浏览器，再点开此窗口您的最新一条留言将会被显示出来。 （2） 点击删除Cookie后，重刷浏览器，再点开此窗口，最新留言就不会被显示出来了。') {
				oSinaTxtInput.value='';
			}
		}
		oSinaTxtInput.onblur=function(){
			if (oSinaTxtInput.value=='') {
				oSinaTxtInput.value='（0）再次添加您的留言。（1） 点击记录Cookie后，重刷浏览器，再点开此窗口您的最新一条留言将会被显示出来。 （2） 点击删除Cookie后，重刷浏览器，再点开此窗口，最新留言就不会被显示出来了。';
			}
		}
		//cookie操作
		oSinaTxtSavCookie.onclick = function(){
			if(oSinaTxtShow.children[0]){
				setCookie('sinaWord',oSinaTxtShow.children[0].innerHTML,7);	
				alert('记录 最新留言cookie');
			}else{
				return false;	
			}
		}
		oSinaTxtDelCookie.onclick = function(){
			delCookie('sinaWord','',-1);	
			alert('删除 最新留言cookie');
		}
		
		//函数返回值
		return {
			BoxName : oSinaTxt,
			lastTxt : oSinaTxtNew
		}
	
	})()
	//新浪留言打开
	var oSinaTxtOpen = getByClass(content_window,'sina_txt_ico')[0];
	oSinaTxtOpen.ondblclick =function(){
		$(oSinaTxtApp.BoxName).fadeIn(500);	
		oSinaTxtApp.BoxName.style.left = (viewW() - oSinaTxtApp.BoxName.offsetWidth)/2 + 'px';
		oSinaTxtApp.BoxName.style.top = (viewH() - oSinaTxtApp.BoxName.offsetHeight)/2 + 'px';
		if(getCookie('sinaWord')){
			oSinaTxtApp.lastTxt.innerHTML = getCookie('sinaWord');
			alert('获取 最新留言Cookie');
		}
	}
/*-----(14)关键字查找、自定义滚动条、操作-----*/
			/*功能*/
	var oStringCtlApp = (function(){	
			//窗口
		var oStringCtl = document.getElementById('stringCtl');
			//窗口拖动区域
		var oStringCtlMove = getByClass(oStringCtl,'stringCtl_title')[0]
			//关闭窗口按钮
		var oStringCtlClose = getByClass(oStringCtl,'stringCtl_closeBtn')[0];
			//处理结果显示区域
		var oStringCtlResult = getByClass(oStringCtl,'stringCtl_result')[0];
			//添加文章按钮
		var oAddTxtBtn = getByClass(oStringCtl,'addTxt')[0];
			//添加关键词的输入框
		var oKeyWordInput = getByClass(oStringCtl,'KeyWordInput')[0];
			//查找关键词按钮
		var oKeyWordSearch = getByClass(oStringCtl,'KeyWordSearch')[0];
			//输入内容区域
		var oStringCtlTextInput = getByClass(oStringCtl,'stringCtl_text_input')[0]; 
			//显示内容区域
		var oStringCtlShow = getByClass(oStringCtl,'stringCtl_text_content')[0];
			//显示关键词位置按钮
		var oKeyWordWhere = getByClass(oStringCtl,'KeyWordWhere')[0];

			//自定义滚动条拖拽区域
		var oMouseScrllBox = getByClass(oStringCtl,'mouseScrll_box')[0];
			//自定义滚动条按钮
		var oMouseScrllBoxBtn = getByClass(oStringCtl,'mouseScrll_box_btn')[0];
			//文章显示窗口
		var oStringCtlTextWindow = getByClass(oStringCtl,'stringCtl_text_window')[0];
		
			//关窗口
		oStringCtlClose.onclick = function(){
			$(oStringCtl).hide(500);	
		}
		
			//窗口拖动
		DragSingle(oStringCtlMove,oStringCtl,viewW(),viewH());
		
			//添加文章
		oAddTxtBtn.onclick = function(){
			if(oStringCtlTextInput.value==''||oStringCtlTextInput.value==null){
				return false;	
			}else{ 	
				TxtInput();
			}
		}
		
		function TxtInput(){
			var iTxtInputTime = null;
			clearInterval(iTxtInputTime);
			oStringCtlShow.innerHTML = '';
			var w = 0;
			iTxtInputTime = setInterval(function(){
				oStringCtlShow.innerHTML += oStringCtlTextInput.value.charAt(w);
				w++;
				if(w==oStringCtlTextInput.value.length){
					clearInterval(iTxtInputTime);
				}
				//滑块显示与否
				if(oStringCtlShow.offsetHeight > oStringCtlTextWindow.offsetHeight){
					oMouseScrllBoxBtn.style.display = 'block';
				}else{
					oMouseScrllBoxBtn.style.display = 'none';	
				}	
			},30)	
		}
		
			//高亮显示关键词
		oKeyWordSearch.onclick = function(){
			var oldTxt = oStringCtlTextInput.value;
			var tempArr = [];
			if(oKeyWordInput.value==''||oKeyWordInput.value==null||oStringCtlShow.innerHTML==''||oStringCtlShow.innerHTML==null){	
				oStringCtlResult.innerHTML = '处理结果：关键词或者内容没有添加!';
				return false;
			}else{
				oStringCtlShow.innerHTML = oldTxt; 
				
				tempArr = oStringCtlShow.innerHTML.split(oKeyWordInput.value);
				oStringCtlShow.innerHTML = tempArr.join('<span class="keyWords">'+oKeyWordInput.value+'</span>');
				oStringCtlResult.innerHTML = '处理结果：共有'+(tempArr.length-1)+'个关键字被高亮显示。'
			}		
		}
			//关键词位置显示
		oKeyWordWhere.onclick = function(){
			var tempWhere = [];
			var iTempWhereTime = null;
			var iTemp = 0;
			var iplace = 0;
			var oldTxt = '';
			if(oKeyWordInput.value==''||oKeyWordInput.value==null||oStringCtlShow.innerHTML==''||oStringCtlShow.innerHTML==null){	
				oStringCtlResult.innerHTML = '处理结果：关键词或者内容没有添加!';
				return false;
			}else{
				oldTxt = oStringCtlTextInput.value;
				iTempWhereTime = setInterval(function(){
					if(oldTxt.indexOf(oKeyWordInput.value,iplace)!= -1){
						iTemp = oldTxt.indexOf(oKeyWordInput.value,iplace);
						tempWhere.push(iTemp);
						iplace = iTemp + oKeyWordInput.value.length;
					}else{
						clearInterval(iTempWhereTime);
						oStringCtlResult.innerHTML = '处理结果：他们分别在第'+tempWhere.join("个,第")+'个位置上。';	
					}
				},1)
			}
		}
		
		//添加自定义滚定条，绑定滚动事件
		addMyScroll(oMouseScrllBoxBtn,oMouseScrllBox,oStringCtlTextWindow,oStringCtlShow)
		
		//函数返回值
		return {
			BoxName : oStringCtl
		}
	
	})()
	
	//打开窗口按钮
	var oStringControlBtn = $('.string_control')[0];
	//窗口开，关
	oStringControlBtn.ondblclick = function(){
		$(oStringCtlApp.BoxName).fadeIn(500);	
	}
	/*----------重力弹弹球----------------*/
	var oBallBoxApp=(function(){
		var oBox=document.getElementById('box');
		var oBallBox=document.getElementById('ballBox');
		var iSpeedX=10+Math.random()*100;
		var iSpeedY=10+Math.random()*100;
		var lastX=0;
		var lastY=0;	

		oBox.style.left=Math.random()*1000+'px';
		oBox.style.top=Math.random()*10+'px';

		collision(oBox);
		oBox.onmousedown=function(ev){
			clearInterval(timer);
			var oEvent=ev || event;
			var disX=oEvent.clientX-oBox.offsetLeft;
			var disY=oEvent.clientY-oBox.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				oBox.style.left=oEvent.clientX-disX+'px';
				oBox.style.top=oEvent.clientY-disY+'px';

				iSpeedX=oEvent.clientX-lastX;
				iSpeedY=oEvent.clientY-lastY;

				lastX=oEvent.clientX;
				lastY=oEvent.clientY;
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				collision(oBox);
			}
			return false;
		}
		var timer;
		function collision(obj){
			timer=setInterval(function(){
				iSpeedY+=5;
				var l=obj.offsetLeft+iSpeedX;
				var t=obj.offsetTop+iSpeedY;
				if (l<0) {
					l=0;
					iSpeedX*=-0.8;
					iSpeedY*=0.8;
				}else if(l>document.documentElement.clientWidth-obj.offsetWidth){
					l=document.documentElement.clientWidth-obj.offsetWidth;
					iSpeedX*=-0.8;
					iSpeedY*=0.8;
				}else if(t<0){
					t=0;
					iSpeedY*=-0.8;
					iSpeedX*=0.8;
				}else if(t>document.documentElement.clientHeight-obj.offsetHeight){
					t=document.documentElement.clientHeight-obj.offsetHeight;
					iSpeedY*=-0.8;
					iSpeedX*=0.8;
				}
				// 速度小于1,不动  如果不加 在ie8会滑动
				if (Math.abs(iSpeedX)<1) {
					iSpeedX=0;
				}else if (Math.abs(iSpeedY)<1) {
					iSpeedY=0;
				}
				if (iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-obj.offsetHeight) {
					clearInterval(timer);
				}
				obj.style.left=l+'px';
				obj.style.top=t+'px';
			},30)
		}
		return {
			name:oBallBox
		}
	})();
	var oBallBoxBtn=$('.appleMenu_Help')[0];
	oBallBoxBtn.onclick=function(){
		oBallBoxApp.name.style.display='block';
		
	}
	/*-------------------自定义右键菜单----------------------*/
	var oMyMenuApp = (function(){
		
		var oMyMenu = document.getElementById('myMenu');
		var oSonMenu = getByClass(oMyMenu,'son_menu')[0];
		var aMyMenuBtn = oMyMenu.getElementsByTagName('a');
		document.oncontextmenu = function(ev){
			var ev = ev || event;
			oMyMenu.style.left = ev.clientX + 'px';
			oMyMenu.style.top = ev.clientY + 'px';
			oMyMenu.style.display = 'block';
			startMove(oMyMenu,{opacity:100});
			return false;	
		}
		
		//新建按钮
		var oCreatBtn = getByClass(oMyMenu,'myMenu_creat')[0];
		oCreatBtn.onmouseover = function(){
			this.children[0].className = 'active';
			oSonMenu.style.display = 'block';	
		}
		oCreatBtn.onmouseout = function(){
			this.children[0].className = '';
			oSonMenu.style.display = 'none';	
		}
		//菜单其他按钮
		for(var i=0; i<aMyMenuBtn.length; i++){
			aMyMenuBtn[i].onclick = function(ev){
				var ev = ev || event;
				ev.cancelBubble = true;
			}
		}
		//函数返回值
		return {
			BoxName : oMyMenu	
		}

	})();
	/*-----QQ登陆框-----*/
		var oQQLoginingApp = (function(){
			var oQQLogining = getByClass(oLeftBar[0],'QQ_logining')[0];
			var oQQLoginBox = document.getElementById('QQ_login');
			var oQQLoginClose = getByClass(oQQLoginBox,'QQ_login_closebtn')[0];
			var oQQLoginMove = getByClass(oQQLoginBox,'QQ_login_ico')[0];
			
			oQQLogining.onclick = QQLoginShow;
			
			function QQLoginShow(){
				oQQLoginBox.style.display = 'block';
				oQQLoginBox.style.left = (viewW() - oQQLoginBox.offsetWidth)/2 + 'px';
				oQQLoginBox.style.top = (viewH() - oQQLoginBox.offsetHeight)/2 + 'px';	
				//oMarkApp.markAuto();
			}
			
			oQQLoginClose.onclick = function(){
				oQQLoginBox.style.display = 'none';
				//oMarkApp.BoxName.style.display = 'none';
			}
			
			DragSingle(oQQLoginMove,oQQLoginBox,viewW(),viewH());
			
			//函数返回值
			return {
				BoxName : oQQLoginBox,
				QQLoginAuto : QQLoginShow
			}
		
		})()
	/*--------------------文档点击触发-------------------------*/
		
		document.onclick = function(){
			startMove(oMyMenuApp.BoxName,{opacity:0},function(){
				oMyMenuApp.BoxName.style.display = 'none';	
			})
		}
})