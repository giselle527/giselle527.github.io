var content=document.getElementsByClassName("content")[0];
var inps=content.getElementsByTagName("input");
var oSp=content.getElementsByTagName("span")[0];

//↓利用可视区宽度和自身宽度让content居中
//定宽的情况下,margin设为0 auto就可以居中
// var winW=document.documentElement.clientWidth;
// content.style.left=(winW-content.clientWidth)/2+"px";

var timer=null;
var differT;
var str;

inps[3].onclick=function(){
	differT=difTime();
	// console.log(differT);
	if(isNaN(differT)){
		alert("请输入正确的时间");
		return;
	}else if(differT<0){
		alert("当前时间已过");
		return;
	}else if(differT==0){
		difTime0(differT);
		return;
	}else{
		timer=setInterval(setTimeEvery1Sec,1000);
		
	}			
}

function setTimeEvery1Sec(){
	differT=difTime();
	changeSectoHourMinSec(differT);
	difTime0(differT);

}

function add0(n){//将10以下的数x转换成0x
	return n<10?n="0"+n:n=""+n;
};	

function difTime(){//获取填入的时间和当下时间的时差（以秒为单位）
	//time in the moment
	var now=new Date();

	//time in future
		
	var h=inps[0].value;
	var m=inps[1].value;
	var s=inps[2].value;
	
	if( h & m ){
	
		var t=new Date();	
		t.setHours(h);
		t.setMinutes(m);
		t.setSeconds(s);

		var differTime=(t-now)/1000;//transfer to seconds
	}	

	return differTime;
}

function difTime0(time){//单独处理当differT为0时的情况
	// console.log("time: "+time);
	if(time==0){
		setTimeout(function(){
			alert("吉时到~");
		},16);

		clearInterval(timer);
		changeSectoHourMinSec(differT);
	}
}
function changeSectoHourMinSec(time){//将以秒为单位的时间换算成时分秒
	var hp=Math.floor(time%86400/3600);			
	var mp=Math.floor(time%86400%3600/60);			
	var sp=time%60;	
	var str=add0(hp)+":"+add0(mp)+":"+add0(sp);
	oSp.innerHTML=str;

}

/*

遇到的小问题

1. 当时间到的时候提示的是  时间已过  ，而不是  已到  ；
2. 当出现提示时，时间停留在00：00：01，点确定后，才会变成00：00：00。

问题的根源 

1. alert是阻塞型代码，不点确定会阻止所有代码执行；
2. 代码的改变和重绘到浏览器页面上是两件事，比如`function fn1(){var str=0; oSp.innerHTML=str;alert(str);}`;代码oSp.innerHTML先于alert执行，但浏览器页面上显示的oSp.innerHTML会在alert之后改变，因为一般情况下，浏览器页面重绘至少要16毫秒。
  
解决办法

用 setTimeout(function(){alert(str);},16) ，让页面有时间重绘后，再执行代码 alert(str);

小知识 

队列
正在执行的代码称作主线程，在主线程执行的过程中响应的其他代码，会放到队列尾部，等主线程执行完了会从前往后执行队列里的代码。即：在队列中，最先进入队列的函数最先被执行。 

栈 stack
stack堆叠，函数累积起来，最上面的（后出现的）先结束执行。即：在栈中，最后开始的函数最先结束。 

函数的调用关系是栈，事件的触发顺序是队列

栈：函数fn先出现，fn1后出现先结束。
function fn(){
    fn1();
};



 */