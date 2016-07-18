// JavaScript Document

	window.onload = function(){
		
		/*---------------------网页背景自适应--------------------------------*/
		var oBgApp = (function(){
			
			var oBg = document.getElementById('bg');	
			var oBgImg = oBg.getElementsByTagName('img')[0];		
			
			function resizeBg(bgWindow,oBgImg){
				/*WEB背景*/
				if(!bgWindow){return false;}
				if(!oBgImg){return false;}
				bgWindow.style.width = viewW() + 'px';
				bgWindow.style.height = viewH() + 'px';	
				
				oBgImg.style.width = viewW() + 'px';
				oBgImg.style.height = 'auto';	
				if(oBgImg.offsetHeight>viewH()){
					oBgImg.style.top = -(oBgImg.offsetHeight-viewH())/2 + 'px';	
				}else{
					oBgImg.style.height = viewH() + 'px';
					oBgImg.style.width = 'auto';
					oBgImg.style.left = -(oBgImg.offsetWidth-viewW())/2 + 'px';
				}
			}
			
			resizeBg(oBg,oBgImg);
			
			//函数返回值
			return {
				Bg : oBg,
				BgName : oBgImg,
				oBgAppBgAppSkill : resizeBg	
			}
			
		})()
		
		/*左侧导航定位*/
		var oSidebar = document.getElementById('sidebar');	
		oSidebar.style.left = '0px';
		oSidebar.style.top = (viewH() - oSidebar.offsetHeight)/2 + 'px';	
			
		/*-----------------------桌面APP分页-------------------------*/
				
				/*桌面APP可视区域*/
		var oContentArea = document.getElementById('content_window');
		oContentArea.style.width = viewW() + 'px';
		oContentArea.style.height = viewH() + 'px';
						
						/*页面顶部导航定位*/
		var oTopMenu = document.getElementById('top_menu');
		var aPagesBtn = getByClass(oTopMenu,'pages')[0].getElementsByTagName('li');
		oTopMenu.style.left = (viewW() - oTopMenu.offsetWidth)/2 + 'px';
		oTopMenu.style.top = '15px';
		
						/*桌面承装容器*/ 
		var oContentBox = getByClass(oContentArea,'content_box')[0];
		var aContentBoxPag = getByClass(oContentBox,'paging_window');
		var cur = 0;
		
		desktopRize();
		
		var aAppBtn = '';
		var iH = 88 + 25;  //按钮宽+间距
		var iW = 88 + 55;  //按钮高+间距
		var iContentBoxH = viewH()- 60 - 60;
		
		/*------------------------桌面区域 功能按钮布局----------------------------*/
		for(var i=0; i<aPagesBtn.length; i++){
			//桌面APP切换
			aContentBoxPag[cur].style.display = 'block';
			aPagesBtn[i].index = i;
			aPagesBtn[i].onclick = tab;
		}
		
		aAppBtn = getByClass(aContentBoxPag[cur],'app_btn');
		var aPos = [];
		appBtnRize(iW,iH,iContentBoxH);
		//桌面区域 功能按钮布局
		function appBtnRize(iW,iH,iContentBoxH){
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
		
		function Drag(obj,Xmax,Ymax){  //面向对象 方法继承 对拖拽范围增加新方法
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
		
		//桌面APP容器尺寸
		function desktopRize(){
			var aAppList = getByClass(oContentBox,'app_list');
			for(var i=0; i<aPagesBtn.length; i++){
				oContentBox.style.width = viewW()*aContentBoxPag.length + 'px';
				oContentBox.style.height = viewH() + 'px';
				aContentBoxPag[i].style.width = viewW() + 'px';
				aContentBoxPag[i].style.height = viewH() + 'px';
				aAppList[i].style.width = viewW()- 130 + 'px';
				aAppList[i].style.height = viewH()- 60 - 60 + 'px'; //上下间隙各60px	
			}
		}
		
		//桌面分页
		function tab(){	
			for(var i=0; i<aPagesBtn.length; i++){
				aPagesBtn[i].className = "";	
			}
			this.className = "active";
			if(this.index == cur){
				return false;
			}else{
				if(this.index > cur){
					cur = this.index;
					aContentBoxPag[this.index].style.display = 'block';
					aAppBtn = getByClass(aContentBoxPag[cur],'app_btn');
					appBtnRize(iW,iH,iContentBoxH);
					for(var i=0; i<aContentBoxPag.length; i++){
						aContentBoxPag[i].style.opacity = '0';
						aContentBoxPag[i].style.filter = 'alpha(opacity=0)';
					}
					startMove(aContentBoxPag[cur],{opacity:100});
					startMove(oContentBox,{marginLeft:-viewW()},function(){
						for(var i=0; i<aContentBoxPag.length; i++){
							if( i!= cur ){
								aContentBoxPag[i].style.display = 'none';
							}
						}
						oContentBox.style.marginLeft = '0px';	
					});	
				}else{
					cur = this.index;
					aContentBoxPag[this.index].style.display = 'block';
					aAppBtn = getByClass(aContentBoxPag[cur],'app_btn');
					appBtnRize(iW,iH,iContentBoxH);
					for(var i=0; i<aContentBoxPag.length; i++){
						aContentBoxPag[i].style.opacity = '0';
						aContentBoxPag[i].style.filter = 'alpha(opacity=0)';
					}
					startMove(aContentBoxPag[cur],{opacity:100});
					oContentBox.style.marginLeft = -viewW() + 'px';
					startMove(oContentBox,{marginLeft:0},function(){
						for(var i=0; i<aContentBoxPag.length; i++){
							if( i!= cur ){
								aContentBoxPag[i].style.display = 'none';
							}
						}
						oContentBox.style.marginLeft = '0px';	
					});		
				}
			}	
		}
		
		
		
		/*--------------用户应用弹出层-------------------*/
		//模块化处理APP，减少全局函数污染
		
		var oUserApp = document.getElementById('user_app');
		
		/*-----(1)主题设置相关-----*/
			
			//打开主题层的按钮
		var oThemeSkillBtn = getByClass(oSidebar,'theme')[0];
		
			/*主题层相关功能*/
		var oThemeSkillApp = (function(){	
			//主题设置界面层弹出层
			var oThemeApp = getByClass(oUserApp,'theme_app')[0];
			//关闭主题层的按钮
			var oThemeCloseBtn = getByClass(oThemeApp,'close_btn')[0];
			var oThemeAppTitle = getByClass(oThemeApp,'theme_app_title')[0];
			//绑定拖拽
			DragSingle(oThemeAppTitle,oThemeApp,viewW(),viewH());
			//更换背景
			var oThemeAppContent = getByClass(oThemeApp,'theme_app_content')[0];
			var aThemeAppBtns = oThemeAppContent.getElementsByTagName('a');
			 
			for(var i=0; i<aThemeAppBtns.length; i++){
				aThemeAppBtns[i].onclick = function(){
					oBgApp.BgName.src = this.getAttribute('_src');		
					oBgApp.BgName.style.opacity = '0';
					oBgApp.BgName.style.filter = 'alpha(opacity=0)';
					startMove(oBgApp.BgName,{opacity:100});
				}	
			}
			//关闭界面
			oThemeCloseBtn.onclick = function(){
				oThemeApp.style.display = 'none';	
			}
			//函数返回值
			return {
				BoxName : oThemeApp
			}
			
		})();
		
		//打开主题层的界面
		oThemeSkillBtn.onclick = function(){
			oThemeSkillApp.BoxName.style.display = 'block';
			
			//进行图片预加载
			var oImg = new Image();
			var oImg2 = new Image();
			var oImg3 = new Image();
			var oImg4 = new Image();
			var oImg5 = new Image();
			
			oImg.src = 'images/theme_app_pic/blue_glow.jpg';
			oImg2.src = 'images/theme_app_pic/wood1.jpg';
			oImg3.src = 'images/theme_app_pic/sc2.jpg';
			oImg4.src = 'images/theme_app_pic/wow.jpg';
			oImg5.src = 'images/theme_app_pic/transformers.jpg';
				
		}
		
		/*-----(2)开始菜单-----*/
			/*开始菜单功能*/
		var oStartMenuApp = (function(){
			var oSidebar = document.getElementById('sidebar');	
			var oStartMenu = document.getElementById('start_menu');
			var ostartMenuBtn = getByClass(oSidebar,'sidebar_bottom')[0].getElementsByTagName('a')[0];
			ostartMenuBtn.onclick = function(ev){
				var ev = ev || event;
				ev.cancelBubble = true;
				startMenuOpen();	
			}
			//组织冒泡			
			oStartMenu.onclick = function(ev){
				var ev = ev || event;
				ev.cancelBubble = true;	
			}
			
			//alert(ostartMenuBtn.innerHTML);
			//函数返回值
			return {
				BoxName : oStartMenu
			}
		})();
		
		//弹出开始菜单
		function startMenuOpen(){
			oStartMenuApp.BoxName.style.left = oSidebar.offsetLeft + oSidebar.offsetWidth + 6 + 'px'; 
			oStartMenuApp.BoxName.style.top = oSidebar.offsetTop + oSidebar.offsetHeight - 240 - 6 + 'px';
			oStartMenuApp.BoxName.style.display = 'block';	
		}
		
		//开始菜单呼出界面
		last(getByClass(oStartMenuApp.BoxName,'start_menu_list')[0]).onclick = function(){
			oNewHandHelpApp.BoxName.style.display = 'block';
			oNewHandHelpApp.BoxName.style.left = viewW() - oNewHandHelpApp.BoxName.offsetWidth - 20 + 'px';
			oNewHandHelpApp.BoxName.style.top = viewH() - oNewHandHelpApp.BoxName.offsetHeight - 20 + 'px';
		};
		
		
		/*-----(3)搜索框-----*/
			/*搜索框功能*/
		var oSearchBoxApp = (function(){
			var oSearchBox = document.getElementById('search_box');
			var oSearchBtn = getByClass(oTopMenu,'search')[0];
			var oSearchResult = document.getElementById('search_result');
			var oSearchResultList = getByClass(oSearchResult,'search_result_list')[0];
			
			oSearchBtn.onclick = function(ev){
				var ev = ev || event;
				ev.cancelBubble = true; 
				oSearchBox.style.left = oTopMenu.offsetLeft + 18 + 'px';
				oSearchBox.style.top =  oTopMenu.offsetTop + oTopMenu.offsetHeight + 6 + 'px';
				oSearchBox.style.display = 'block';
			}
			
			var oSearchBoxTxt = getByClass(oSearchBox,'search_box_txt')[0];
			var oSearchBoxBtn = getByClass(oSearchBox,'search_box_btn')[0];
			oSearchBox.onclick = function(ev){
				var ev = ev || event;
				ev.cancelBubble = true;
			}
			oSearchBoxTxt.onfocus = function(){
				if(this.value == '搜索网页和应用...'){
					this.value = '';	
				}	
			}
			oSearchBoxTxt.onblur = function(){
				if(this.value == ''){
					this.value = '搜索网页和应用...';	
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
				
		
		/*-----(4)新手指引-----*/
			/*搜索框功能*/
		var oNewHandHelpApp = (function(){
			//新手指引层
			var oNewHandHelp = document.getElementById('new_hand_help');
			var oNewHandBtns = getByClass(oNewHandHelp,'new_hand_btns')[0];
			var oNewHandHelpCloseBtn = getByClass(oNewHandHelp,'new_hand_close')[0];
			
			oNewHandHelp.onclick = function(ev){ 
				var ev = ev || event;
				ev.cancelBubble = true; 
			}
			oNewHandBtns.children[0].onclick = startMenuOpen;
			oNewHandBtns.children[2].onclick = function(){
				oThemeSkillApp.BoxName.style.display = 'block';
			}
			
			DragSingle(oNewHandHelp,oNewHandHelp,viewW(),viewH());
			oNewHandHelpCloseBtn.onclick = function(){
				oNewHandHelp.style.display = 'none';	
			}
			//函数返回值
			return {
				BoxName : oNewHandHelp
			}
		})();
		
		
		/*-----(5)系统设置层-----*/
			/*系统设置功能层*/
		var oSystemSetingApp = (function(){
			
			var oSystemSeting = getByClass(oUserApp,'system_seting')[0];
			var oSystemSetingHead = getByClass(oSystemSeting,'theme_app_title')[0];
			var oSystemSetingDrag = getByClass(oSystemSeting,'system_seting_drag')[0];
			var oSystemSetingBtn = getByClass(oSidebar,'set')[0];
			var oCloseBtn = getByClass(oSystemSeting,'close_btn')[0];
			oSystemSetingBtn.onclick = function(){
				oSystemSeting.style.display = 'block';	
			}
			oCloseBtn.onclick = function(){
				oSystemSeting.style.display = 'none';	
			}
			DragSingle(oSystemSetingHead,oSystemSeting,viewW(),viewH());
			DragChangeBigSmall(oSystemSeting,oSystemSetingDrag);
			//函数返回值
			return{
				BoxName : oSystemSeting	
			}
			
		})();
		
		/*-----(6)遮罩层-----*/
			/*遮罩层*/
		var oMarkApp = (function(){ 
			var oMark = document.getElementById('mark');
			function markResize(){
				oMark.style.width = viewW() + 'px';
				oMark.style.height = getMax([viewH(),scrollH(),offsetH()]) + 'px';
				oMark.style.display = 'block';
			}
			//函数返回值
			return {
				BoxName : oMark,
				markAuto: markResize
			}
		})();
		
		/*-----(7)QQ登陆框-----*/
		var oQQLoginingApp = (function(){
			var oQQLogining = getByClass(oSidebar,'QQ_logining')[0];
			var oQQLoginBox = document.getElementById('QQ_login');
			var oQQLoginClose = getByClass(oQQLoginBox,'QQ_login_closebtn')[0];
			var oQQLoginMove = getByClass(oQQLoginBox,'QQ_login_ico')[0];
			
			oQQLogining.onclick = QQLoginShow;
			
			function QQLoginShow(){
				oQQLoginBox.style.display = 'block';
				oQQLoginBox.style.left = (viewW() - oQQLoginBox.offsetWidth)/2 + 'px';
				oQQLoginBox.style.top = (viewH() - oQQLoginBox.offsetHeight)/2 + 'px';	
				oMarkApp.markAuto();
			}
			
			oQQLoginClose.onclick = function(){
				oQQLoginBox.style.display = 'none';
				oMarkApp.BoxName.style.display = 'none';
			}
			
			DragSingle(oQQLoginMove,oQQLoginBox,viewW(),viewH());
			
			//函数返回值
			return {
				BoxName : oQQLoginBox,
				QQLoginAuto : QQLoginShow
			}
		
		})()
		
		/*-----(8)阅读天下-----*/
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
			
			DragSingle(oReadBookMove,oReadBook,viewW(),viewH());
			
			//关闭界面
			oReadBookClose.onclick = function(){
				oReadBook.style.display = 'none';	
			}
			
			//函数返回值
			return {
				BoxName : oReadBook,
				sizeAuto : readBookSize
			}
			
		})()
		
		var oReadWord = getByClass(oContentArea,'read_word')[0];
		if(oReadWord){
			oReadWord.ondblclick = function(){
				oReadBookApp.BoxName.style.display = 'block';
				oReadBookApp.sizeAuto();	
			}	
		}
		
		
		/*-----(9)关键字查找、自定义滚动条、操作-----*/
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
				oStringCtl.style.display = 'none';	
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
		var oStringControlBtn = getByClass(oContentArea,'string_control')[0];
		//窗口开，关
		oStringControlBtn.ondblclick = function(){
			oStringCtlApp.BoxName.style.display = 'block';	
		}
		
		
		/*-----(10)表格操作-----*/
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
				oTableControl.style.display = 'none';	
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
			
			//模糊搜索
			oTableControlSearch.onclick = function(){
				for(var i=0; i<aRows.length; i++){
					aRows[i].style.background = '';
				}
				if(oTableControlTxt.value==''||oTableControlTxt.value==null){
					return false;	
				}else{
					var tempSearch = oTableControlTxt.value.toLowerCase().split(''); //忽略大小写
					for(var i=0; i<aRows.length; i++){
						for(var j=0; j<tempSearch.length; j++){
							if(tempSearch[j]=='')continue; //提高效果，减少无用循环次数
							if(aRows[i].cells[1].innerHTML.toLowerCase().indexOf(tempSearch[j])!=-1){
								aRows[i].style.background = 'yellow';
								break; //提高效果，找到一次就OK了，不要再循环了		
							}
						}
					}
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
			oTableControlApp.BoxName.style.display = 'block';
			oTableControlApp.BoxName.style.left = (viewW()-oTableControlApp.BoxName.offsetWidth)/2 + 'px';
			oTableControlApp.BoxName.style.top = (viewH()-oTableControlApp.BoxName.offsetHeight)/2 + 'px';	
		}
		
		/*-----(11)事件日期钟-----*/
			//时钟层
		var oDateClockApp = (function(){
			
			var oDateClock = document.getElementById('Date_clock');
				//按钮层
			var oDateClockBtns = getByClass(oDateClock,'Date_clock_btns')[0];
				//关闭层按钮
			var oDateClockClose = getByClass(oDateClock,'close_btn')[0];
				//拖拽区域
			var oDateClockMove = getByClass(oDateClock,'Date_clock_body')[0];
				//显示时间层
			var oDateClockTimes = getByClass(oDateClock,'Date_clock_time')[0]
				//操作图片
			var aDateClockImg = oDateClockTimes.getElementsByTagName('img');
				//显示日期层
			var oDateClockDate = getByClass(oDateClock,'Date_clock_date')[0];
				//日期操作对象
			var aDateClockDateSpan = oDateClockDate.getElementsByTagName('span');
			
			//时钟拖拽
			DragSingle(oDateClockMove,oDateClock,viewW(),viewH());
			
			//时钟按钮显示消失效果
			oDateClockMove.onmousemove = oDateClock.onmousemove = oDateClockBtns.onmousemove = function(){
				oDateClockBtns.style.display = 'block';	
			}
			
			//关闭时钟层
			oDateClockClose.onclick = function(){
				oDateClock.style.display = 'none';	
			}
			
			oDateClockMove.onmouseout = function(){
				oDateClockBtns.style.display = 'none';	
			}
			
				//更新我的时钟时间		
			myDate();
				//开始运行
			myWebClockGo();
			
			function myDate(){
				var oDate = new Date();
				var iYear=oDate.getFullYear();
				var iMonth=oDate.getMonth()+1;
				var iDay=oDate.getDate();
				var iWeek=oDate.getDay();
				var iHour=oDate.getHours();
				var iMin=oDate.getMinutes();
				var iSec=oDate.getSeconds();
				var weekArr = ['日','一','二','三','四','五','六'];
				
				var timeStr=AddZero(iHour)+AddZero(iMin)+AddZero(iSec);
				//更新时间
				var j= 0;
				for(var i=0; i<aDateClockImg.length; i++){
					if(i==2||i==5){
						continue;	
					}
					aDateClockImg[i].src="images/Date_clock_ico/"+timeStr.charAt(j)+".png";
					j++;	
				}
				//更新日期
				aDateClockDateSpan[0].innerHTML = iYear;
				aDateClockDateSpan[1].innerHTML = iMonth;
				aDateClockDateSpan[2].innerHTML = iDay;
				aDateClockDateSpan[3].innerHTML = weekArr[iWeek];					
			}
		
			function myWebClockGo(){
				setInterval(function(){
					myDate();	
				},1000)	
			}
			
			//函数返回值
			return {
				BoxName : oDateClock	
			}
		
		})();
		
		//打开时钟层
		var oDateClockOpen = getByClass(content_window,'dateClock')[0];
		oDateClockOpen.ondblclick = function(){
			oDateClockApp.BoxName.style.display = 'block';	
		}
		
		/*-----(12)布局转换-----*/
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
				oLayoutChange.style.display = 'none';	
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
			oLayoutChangeApp.BoxName.style.display = 'block';
			oLayoutChangeApp.BoxName.style.left = (viewW() - oLayoutChangeApp.BoxName.offsetWidth)/2 + 'px';
			oLayoutChangeApp.BoxName.style.top = (viewH() - oLayoutChangeApp.BoxName.offsetHeight)/2 + 'px';
			oLayoutChangeApp.LayoutChangeSkill();
		}
		
		
		/*-----(13)图片预加载-----*/
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
				oImgOnload.style.display = 'none';	
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
			oImgOnloadApp.BoxName.style.display = 'block';	
			oImgOnloadApp.BoxName.style.left = (viewW() - oImgOnloadApp.BoxName.offsetWidth)/2 + 'px';
			oImgOnloadApp.BoxName.style.top = (viewH() - oImgOnloadApp.BoxName.offsetHeight)/2 + 'px';
			oImgOnloadApp.ImgloadSkill();
		}
		
		
		
		/*-----(14)新浪留言-----*/
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
				oSinaTxt.style.display = 'none';	
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
			oSinaTxtApp.BoxName.style.display = 'block';	
			oSinaTxtApp.BoxName.style.left = (viewW() - oSinaTxtApp.BoxName.offsetWidth)/2 + 'px';
			oSinaTxtApp.BoxName.style.top = (viewH() - oSinaTxtApp.BoxName.offsetHeight)/2 + 'px';
			if(getCookie('sinaWord')){
				oSinaTxtApp.lastTxt.innerHTML = getCookie('sinaWord');
				alert('获取 最新留言Cookie');
			}
		}
		
		/*-----(15)苹果菜单-----*/
			/*功能*/
		var oAppleMenuApp = (function(){
		
			var oAppleMenu = document.getElementById('apple_menu');
			var aAppleMenuBtn = oAppleMenu.getElementsByTagName('a');
			var oAppleMenu_TelMe = getByClass(oAppleMenu,'appleMenu_telMe')[0];
			var oAppleMenu_AboutWeb = getByClass(oAppleMenu,'appleMenu_aboutWeb')[0];
			var oAppleMenu_systemBtn = getByClass(oAppleMenu,'appleMenu_sysSet')[0];
			var oAppleMenu_HelpBtn = getByClass(oAppleMenu,'appleMenu_Help')[0];
			
			oAppleMenu_AboutWeb.onclick = function(){
				oAboutWebPageAPP.BoxName.style.display = 'block';
				oAboutWebPageAPP.BoxName.style.left = (viewW() - oAboutWebPageAPP.BoxName.offsetWidth)/2 + 'px';
				oAboutWebPageAPP.BoxName.style.top = (viewH() - oAboutWebPageAPP.BoxName.offsetHeight)/2 + 'px';	
			}
			oAppleMenu_HelpBtn.onclick = function(){
				oNewHandHelpApp.BoxName.style.display = 'block';	
				oNewHandHelpApp.BoxName.style.left = viewW() - oNewHandHelpApp.BoxName.offsetWidth - 20 + 'px';
				oNewHandHelpApp.BoxName.style.top = viewH() - oNewHandHelpApp.BoxName.offsetHeight - 20 + 'px';
			}
			oAppleMenu_systemBtn.onclick = function(){
				oSystemSetingApp.BoxName.style.display = 'block';	
			}
			oAppleMenu_TelMe.onclick = function(){
				CallMeApp.BoxName.style.display = CallMeApp.BoxName.style.display = 'block';
				CallMeApp.BoxName.style.left = (viewW() - CallMeApp.BoxName.offsetWidth)/2 + 'px';
				CallMeApp.BoxName.style.top = (viewH() - CallMeApp.BoxName.offsetHeight)/2 + 'px';
				oMarkApp.markAuto();
			}
			
			oAppleMenu.onmousemove = function(ev){
				var ev = ev||event;
				for(i=0;i<aAppleMenuBtn.length;i++){
					var x = aAppleMenuBtn[i].offsetLeft + aAppleMenuBtn[i].offsetWidth/2;
					var y = aAppleMenuBtn[i].offsetTop + oAppleMenu.offsetTop + aAppleMenuBtn[i].offsetHeight/2;
					var a = x-ev.clientX;
					var b = y-ev.clientY;
					
					var appleMenuDis=Math.sqrt(a*a+b*b);
					
					var appleMenuScale=1-appleMenuDis/300;
					if(appleMenuScale < 0.5)
					{
						appleMenuScale = 0.5;
					}
					
					aAppleMenuBtn[i].style.width = aAppleMenuBtn[i].style.height = appleMenuScale*80 + 'px';
				}	
			}
		})();
		
		
		/*-----(16)面向对象 选项卡-----*/
			/*功能*/
		var oMyTabBoxApp = (function(){
		
			var oMyTabBox = document.getElementById('MyTabBox');
			var oMyTabBoxMove = getByClass(oMyTabBox,'MyTabBox_title')[0];
			var oMyTabBoxClose = getByClass(oMyTabBox,'MyTabBox_closeBtn')[0];
			
			oMyTabBoxClose.onclick = function(){
				oMyTabBox.style.display = 'none';	
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
			oMyTabBoxApp.BoxName.style.display = 'block';
			oMyTabBoxApp.BoxName.style.left = (viewW()- oMyTabBoxApp.BoxName.offsetWidth)/2 + 'px';
			oMyTabBoxApp.BoxName.style.top = (viewH()- oMyTabBoxApp.BoxName.offsetHeight)/2 + 'px';
		}
		
		/*-----(18)灵魂回响网站-----*/
		var oAudiWebApp = (function(){
			
			var oAudiWebOpen = getByClass(content_window,'Audi_ico')[0];
			oAudiWebOpen.ondblclick = function(){
				window.open('../../linghunhuixiang/linghunhuixiang.html');
			}
			
		})()
		
		/*-----图片展示网站-----*/
		var oPicWebApp = (function(){
			
			var oPicWebOpen = getByClass(content_window,'picWeb_ico')[0];
			oPicWebOpen.ondblclick = function(){
				window.open('http://www.divandcss.com/picshow_web/index.html');
			}
			
		})()
		
		/*-----农信社网站-----*/
		var oNxsWebApp = (function(){
			
			var oNxsWebOpen = getByClass(content_window,'Nxs_ico')[0];
			oNxsWebOpen.ondblclick = function(){
				window.open('http://www.divandcss.com/nxs/index.html');
			}
			
		})()
		
		/*开发文档*/
		var oAboutWebPageAPP = (function(){ 
		
			var oAboutWebPage = document.getElementById('about_webpage');
			var oAboutWebPageMove = getByClass(oAboutWebPage,'about_webpage_title')[0];
			var oAboutWebPageClose = getByClass(oAboutWebPage,'about_webpage_closeBtn')[0];
			oAboutWebPageClose.onclick = function(){
				oAboutWebPage.style.display = 'none';	
			}
			DragSingle(oAboutWebPageMove,oAboutWebPage,viewW(),viewH());
			//函数返回值
			return {
				BoxName : oAboutWebPage	
			}
		
		})();
		
		/*联系我*/
		var CallMeApp = (function(){
		
			var CallMe = document.getElementById('call_me');
			var CallMeClose = getByClass(CallMe,'call_me_closebtn')[0];
			CallMeClose.onclick = function(){
				CallMe.style.display = oMarkApp.BoxName.style.display = 'none';	
			}
			//函数返回值
			return {
				BoxName : CallMe	
			}
			
		})();
		
				
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
		
		/*--------------------文档点击触发-------------------------*/
		
		document.onclick = function(){
			startMove(oMyMenuApp.BoxName,{opacity:0},function(){
				oMyMenuApp.BoxName.style.display = 'none';	
			})
			oStartMenuApp.BoxName.style.display = 'none';
			oSearchBoxApp.BoxName.style.display = 'none';	
		}
		
		/*---------------------BOM-----------------------------*/
		
		window.onresize = function(){
			//网页背景调整
			oBgApp.oBgAppBgAppSkill(oBgApp.Bg,oBgApp.BgName);	
			/*sidebar*/
			oSidebar.style.left = '0px';
			oSidebar.style.top = (viewH() - oSidebar.offsetHeight)/2 + 'px';
			/*topmenu*/
			oTopMenu.style.top = '15px'; 
			oTopMenu.style.left = (viewW() - oTopMenu.offsetWidth)/2 + 'px';
			/*桌面APP容器尺寸*/
			desktopRize();
			/*功能按钮布局*/
			var iContentBoxH = viewH()-120;
			appBtnRize(iW,iH,iContentBoxH);
			/*修改QQ登陆框位置*/
			if(oQQLoginingApp.BoxName.style.display == 'block'){
				oQQLoginingApp.QQLoginAuto();	
			}
		}
		
		/*谢谢光临*/
		//window.onbeforeunload = function(){return "感谢您观看我的页面。";}
	}
