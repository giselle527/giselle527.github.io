    //ps:加入日期是2017.02.18，十位数
    var data=[{
                "index":1,
                "origin":"59.4",
                "target":"49.5",
                "date":"2016.11.17",
                "id":"drinkjch"
             },{
                "index":2,
                "origin":"56.8",
                "target":"50",
                "date":"2016.11.20",
                "id":"真的学无止境吗"
            },{
                "index":3,
                "origin":"61",
                "target":"49",
                "date":"2016.11.20",
                "id":"yang1993xiao"
            },{
                "index":4,
                "origin":"54",
                "target":"45",
                "date":"2016.11.21",
                "id":"99小杰子"
            },{
                "index":5,
                "origin":"58",
                "target":"50",
                "date":"2017.02.18",
                "id":"凌晨五点五十5"
            },{
                "index":6,
                "origin":"60.8",
                "target":"50.8",
                "date":"2017.02.21",
                "id":"Zac_Karen"
            },{
                "index":7,
                "origin":"62",
                "target":"48",
                "date":"2017.02.21",
                "id":"雅儿爱花儿"
            },{
                "index":8,
                "origin":"58.5",
                "target":"48.5",
                "date":"2017.03.02",
                "id":"光是可以绚烂的"
            }];

    var tab=document.getElementById("tab").tBodies[0];
    var sp=document.getElementById("sp");
    var p_sp=document.getElementsByClassName("sp")[0];

    var inp=document.getElementById("inp");
    var yesterday=new Date(new Date()-24*60*60*1000);//24*60*60*1000=86400000为一天的毫秒数
    var inp_d=yesterday.getDate();
    var inp_m=yesterday.getMonth()+1;
    var inp_y=yesterday.getFullYear();
    inp.value=inp_y+"."+inp_m+"."+inp_d;

    //获取焦点
    document.onclick=function(ev){
        ev.target.focus();
    };
    //选中文本
    p_sp.onmouseover=function(ev){
        p_sp.select();
        ev.cancelBubble=true;
    };

    p_sp.onmouseout=function(ev){
        p_sp.blur();
    };
    
    var num=data.length+1;

    for(var i=0;i<data.length;i++){
        newdata(data[i]);
    } 
    sp.innerHTML="("+tab.rows.length+")"; //第一行第一列内的span

    function add0(num){return num<10?num="0"+num:""+num;};
    //↑将第一列的序号变成两位数
    function newdata(obj){
        var tr=document.createElement("tr");
        var td0=document.createElement("td");
        td0.innerHTML=add0(obj.index)+".";   
        var inp3=document.createElement("input");//checkbox
        inp3.type="checkbox";
        td0.appendChild(inp3); //序号&checkbox  
        var td1=document.createElement("td");
        td1.innerHTML=obj.id;//贴吧ID
        var td2=document.createElement("td");
        td2.innerHTML=obj.origin;//原重
        var td3=document.createElement("td");
        td3.innerHTML=obj.target;//目标

        var td4=document.createElement("td");
        var inp0=document.createElement("input");//现重下的input
        inp0.type="text";
        inp0.value=obj.origin;
        td4.appendChild(inp0);//现重

        var td5=document.createElement("td");
        td5.innerHTML=td2.innerHTML-inp0.value;//减掉
        //原始体重-当前体重，减号会做运算，初始的inp0.value就是原始体重，所以不用考虑小数点的问题

        var td6=document.createElement("td");//剩下
        td6.innerHTML=Math.round((inp0.value-td3.innerHTML)*10)/10;
        //当前体重-目标体重，都可能有浮点数，要处理        

        var td8=document.createElement("td");//更新
        var inp1=document.createElement("input");//new按钮
        inp1.type="button";
        inp1.value="new";
        inp1.onclick=function(){
            //点击new按钮，更新td5减掉、td6剩下
            td5.innerHTML=Math.round((td2.innerHTML-inp0.value)*10)/10;
            //点击的时候当前体重inp0.value发生变化()，会做浮点数的运算
            td6.innerHTML=Math.round((inp0.value-td3.innerHTML)*10)/10;
        };
        var inp2=document.createElement("input");//del按钮
        inp2.type="button";
        inp2.value="del";
        inp2.onclick=function(){//点击del按钮
            tab.removeChild(tr);//删除此行
            sp.innerHTML="("+tab.rows.length+")";//改变更新序号后的括号里的值
            memeber();//改变艾特的成员
        };
        td8.appendChild(inp1);
        td8.appendChild(inp2);

        var td9=document.createElement("td");//入表日期
        td9.innerHTML=obj.date;

//已坚持 取到了td10的innerHTML，所以要放在后面，要不然取不到值，会报错
        var td7=document.createElement("td");//已坚持
        td7.innerHTML=countT(td9.innerHTML);

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tab.appendChild(tr);

    }

    function countT(str){
    //统计坚持天数，str1是加入日期("2016.11.17"格式的10位数string)
        var joinT=str;
        var joinTime=new Date();
        joinTime.setDate(joinT.substr(8,2));
        joinTime.setMonth(joinT.substr(5,2)-1);
        //减号会做运算，所以不用写parseInt();
        joinTime.setFullYear(joinT.substr(0,4));
        return Math.floor((new Date()-joinTime)/1000/86400)-1;
        //↑商(整数部分)才是几天，余数是可以转成小时的秒数
    }

    //艾特成员的函数
    function memeber(){
        var val="";
        for(var i=0;i<tab.rows.length;i++){
            val+="@"+tab.rows[i].cells[1].innerHTML+"  ";
        }
        p_sp.value=val;
    }
    memeber();
 