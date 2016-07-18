// JavaScript Document

function viewW(){
	return document.documentElement.clientWidth;	
}

function viewH(){
	return document.documentElement.clientHeight;	
}

function scrollH(){
	return document.body.scrollHeight;	
}

function offsetH(){
	return document.body.offsetHeight;	
}

function scrollT(){
	return document.documentElement.scrollTop || document.body.scrollTop;	
} 

function first(oParent){
	return oParent.firstElementChild || oParent.firstChild;	
}

function last(oParent){
	return oParent.lastElementChild || oParent.lastChild;	
}

function prev(obj){
	return obj.previousElementSibling || obj.previousSibling;
}

function next(obj){
	return obj.nextElementSibling || obj.nextSibling;
}

//获取系统时间
function getSysTime(){
	var UpdateTime = {};
	var oDate=new Date();
	var iYear=oDate.getFullYear();
	var iMonth=oDate.getMonth()+1;
	var iDay=oDate.getDate();
	var iWeek=oDate.getDay();
	var iHour=oDate.getHours();
	var iMin=oDate.getMinutes();
	var iSec=oDate.getSeconds();
	UpdateTime = {"Year":iYear,"Month":iMonth,"Day":iDay,"Week":iWeek,"Hour":iHour,"Min":iMin,"Sec":iSec}
	return UpdateTime;
}