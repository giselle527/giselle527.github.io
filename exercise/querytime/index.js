$(document).ready(function(){

// <option zone=8 selected="selected">北京时间</option>
// 根据data数据生成select标签里的option标签

	for(var x = 0; x<data.length; x++ ){
		var opt = $('<option ></option>');
		opt.html(data[x].namez);
		opt.attr("zone", data[x].delta);
		$(".city").append(opt);
	}

	$(".cityl option[zone=8]").attr("selected","selected");
	$(".cityr option[zone=9]").attr("selected","selected");
	$(".time").attr("disabled",true);

	// 初始化
	var time = nowTime();

	var d = time.getDate();
	var m = time.getMonth()+1;
	var y = time.getFullYear();

	var converttime = null;

	// 初始化.convert部分的时间
	$(".min").val("00");
	$(".h").val("00");
	$(".d").val( add0(d) );
	$(".mon").val( add0(m) );
	$(".y").val(y);

	// 初始化.time部分的时间
	var i = del();

	run({
		obj: ".cityl",
		t: time,
		targetClass: ".timenow",
		tzone: i
	});

	run({
		obj: ".cityr",
		t: time,
		targetClass: ".timeto",
		tzone: i
	});

	// 开启定时器
	var tcount = timer();

	//".convert input"的事件：鼠标移入选中文本
	$(".convert").find("input").on("mouseover",function(){
		$(this).select();
	});

	//".convert input"的事件：鼠标移出文本框失去焦点
	$(".convert").find("input").on("mouseout",function(){
		$(this).blur();
	});

	// .btn的点击事件：获取.convert下input内的值，得到时间converttime，写入.time
	$(".btn").on("click",function(){

		var min = parseInt( $(".min").val() );
		var h = parseInt( $(".h").val() );
		var d = parseInt( $(".d").val() );
		var mon = parseInt( $(".mon").val() - 1 );
		var y = parseInt( $(".y").val() );

		converttime = new Date(y,mon,d,h,min,0);

		var i = del();

		run({
			obj: ".cityl",
			t: converttime,
			targetClass: ".timenow",
			tzone: i
		});

		run({
			obj: ".cityr",
			t: converttime,
			targetClass: ".timeto",
			tzone: i
		});	

	})

	//左边城市改变后触发，重写时间
	$(".cityl").on("change", function(){

		clearInterval( tcount );

		var i = del();

		var time = nowTime();

		converttime ? time = converttime : time = time;

		run({
			obj: ".cityl",
			t: time,
			targetClass: ".timenow",
			tzone: i
		});
		run({
			obj: ".cityr",
			t: time,
			targetClass: ".timeto",
			tzone: i
		});
		
	});

	//右边城市改变后触发，重写时间
	$(".cityr").on("change", function(){

		clearInterval( tcount );

		var time = nowTime();

		converttime ? time = converttime : time = time;

		var i = del();

		run({
			obj: ".cityr",
			t: time,
			targetClass: ".timeto",
			tzone: i
		});
		run({
			obj: ".cityl",
			t: time,
			targetClass: ".timenow",
			tzone: i
		});
		
	});

	$(document).on("click",function(){
		clearInterval(tcount);
	});
	
})


// 初始化时启动定时器（定时器只在页面初加载时启动了，要不然电脑容易卡）
function timer(){

	var i = del();

	var t = setInterval( function(){

		var time = nowTime();

		run({
			obj: ".cityr",
			t: time,
			targetClass: ".timeto",
			tzone: i
		});
		run({
			obj: ".cityl",
			t: time,
			targetClass: ".timenow",
			tzone: i
		});
	},1000 );

	return t;
}

// 调用各函数，将结果渲染到页面
// 参数：
// {
// 	obj: ".cityl",  //要获取selectedIndex属性值的元素，".cityl"或".cityr"
// 	t: time, //要渲染的时间
// 	targetClass: ".timenow", //要渲染的元素，".timenow"或".timeto"
// 	tzone: i // 时区，对应data里的delta
// }
function run( json ){
	
	var cityIndex = $(json.obj).prop('selectedIndex');
	var del = data[cityIndex].delta;
	var timeGap = del - json.tzone; //关键一步：算时差
	// console.log('timeGap: '+timeGap);
	var targetT = convert( json.t, timeGap );
	var str = turnTime( targetT );

	renderTime( json.targetClass , str );

}

// 根据selectedIndex获取data里的delta(时区值)，返回delta
function del(){
	var index = $(".cityl").prop('selectedIndex');
	var i = data[index].delta;
	// console.log("i: "+i);
	return i;
}

// 转换时间：参数time要转换的时间，num是时区差值，返回时间秒数
function convert( time, num ){

	var tNow = time;
	var tGap = parseInt(num);

	var timeTo = tNow.getTime() + tGap*3600000;

	return timeTo;

}

//将时间渲染到页面
function renderTime( obj , str ){
	$(obj).attr("value",str);
}


//当下时间：运行一次new Date()获取当下时间并返回该时间
function nowTime(){
	var timeNow = new Date();
	return timeNow;
}

// 转换时间为字符串：输入时间t，返回对应的字符串时间，例：18:01:17 周五 2018年03月09日
function turnTime( t ){

	var time = new Date(t);

	var S = time.getSeconds(); //秒second
	var Ms = time.getMinutes(); //分minutes
	var H = time.getHours(); //时hour
	var W = time.getDay(); //星期week，从0-6
	var D = time.getDate(); //日date
	var M = time.getMonth()+1; //月month，从0开始
	var Y = time.getFullYear(); //年year

	// 18：40：50 周四 2919年3月8日

	str = add0(H) + ':' + add0(Ms) + ':' + add0(S) + ' 周' + weektoHz( W ) +' ' + Y + '年' + add0(M) + '月'+ add0(D) + '日';

	return str;
}

//转换星期：将数字转换成汉字
function weektoHz( num ){

	switch(num){
		case 1:
		return "一";
		break;
		case 2:
		return "二";
		break;
		case 3:
		return "三";
		break;
		case 4:
		return "四";
		break;
		case 5:
		return "五";
		break;
		case 6:
		return "六";
		break;
		case 0:
		return "日";
		break;
	}

}

// 补0
function add0( num ){
	 return num < 10 ? '0' + num : num;
}

var data = [
    {
       name: 'London',
       namez: '伦敦-中时区',
       delta: 0 
    },
    {
       name: 'Berlin',
       namez: '柏林/巴黎/罗马-东1区',
       delta: 1 
    },
    {
       name: 'Cairo',
       namez: '开罗-东2区',
       delta: 2 
    },
    {
       name: 'Moscow',
       namez: '莫斯科-东3区',
       delta: 3 
    },
    {
       name: 'Abu Dhabi',
       namez: '阿联酋阿布扎比-东4区',
       delta: 4 
    },
    {
       name: 'New Delhi',
       namez: '新德里-东5区',
       delta: 5
    },
    {
       name: 'Sinkiang',
       namez: '新疆自治区-东6区',
       delta: 6
    },
    {
       name: 'Singapore',
       namez: '曼谷/吉隆坡/新加坡-东7区',
       delta: 7 
    },
    {
       name: 'Beijing',
       namez: '北京-东8区',
       delta: 8 
    },
    {
       name: 'Tokyo',
       namez: '东京-东9区',
       delta: 9 
    },
    {
       name: 'Sydney',
       namez: '悉尼/墨尔本-东10区',
       delta: 10 
    },
    {
       name: 'Solomon',
       namez: '所罗门群岛-东11区',
       delta: 11 
    },
    {
       name: 'Wellington',
       namez: '新西兰惠灵顿-东12区',
       delta: 12 
    },
    {
       name: 'Eniwetok',
       namez: '艾尼威托克岛-西12区',
       delta: -12 
    },
    {
       name: 'Samoan',
       namez: '东萨摩亚群岛-西11区',
       delta: -11 
    },
    {
       name: 'Hawaii',
       namez: '夏威夷-西10区',
       delta: -10 
    },
    {
       name: 'Alaskan',
       namez: '阿拉斯加-西9区',
       delta: -9 
    },
    {
       name: 'Los Angeles',
       namez: '洛杉矶/温哥华-西8区',
       delta: -8 
    },
    {
       name: 'Arizona',
       namez: '亚利桑那-西7区',
       delta: -7 
    },
    {
       name: 'Chicago',
       namez: '休斯敦/芝加哥-西6区',
       delta: -6 
    },
    {
       name: 'Washington',
       namez: '华盛顿/纽约-西5区',
       delta: -5 
    },
    {
       name: 'Chile',
       namez: '智利圣地亚哥-西4区',
       delta: -4 
    },
    {
       name: 'Buenos',
       namez: '布宜诺斯艾利斯-西3区',
       delta: -3 
    },
    {
       name: 'Atlantic',
       namez: '大西洋中部-西2区',
       delta: -2 
    },
    {
       name: 'Foyer',
       namez: '佛德尔群岛-西1区',
       delta: -1 
    }
]


