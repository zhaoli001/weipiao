;(function($){
	var city=null;
	$("#pick-area").on("tap",function(){
		console.log(0)
		$(".city").css({
			"-webkit-transform":"translate3d(0,0,0)",
			"-webkit-transition":"transform 1s"
		})
	})
	$("#fan").on("tap",function(){
		$(".city").css({
			"-webkit-transform":"translate3d(100%,0,0)",
			"-webkit-transition":"transform 1s"
		})
	})
	var tempList=[{
		letter:"A",
		list:[]
	},{
		letter:"B",
		list:[]
	}];
	for(var i=0;i<26;i++){//循环生成26位字母表
		var L=String.fromCharCode(65+i);
		tempList[i]={letter:L,list:[]}
	}

	console.log(tempList);
	for(var j=0;j<cityList.length;j++){//根据字母表进行分类
		var firstLetter=cityList[j][1].charAt(0).toUpperCase();
		tempList[firstLetter.charCodeAt()-65].list.push(cityList[j]);
	}

	var finalList=[];
	tempList.forEach(function(i){
		if(i.list.length!=0){
			finalList.push(i);
		}

	})	

	var allList={

	}
	//提取出每个对象的首字母
	cityList.forEach(function(i){
		//console.log(i[1].charAt(0).toUpperCase());
		if(allList[i[1].charAt(0).toUpperCase()]==null){
			allList[i[1].charAt(0).toUpperCase()]=[];
		}
	})

	//根据首字母，进行分类，得到相应的数据
	for(var i in allList){
		cityList.forEach(function(j){
			//判断如果allList里面有值得话就匹配对应不，对应的话就追加，没有的话就追加键值
			if(i==j[1].charAt(0).toUpperCase()){
				allList[i].push(j);
			}
		})
	}

	/* <div class="serBig">
		<p class="ser">热门</p>
		<ul>
			<li>北京</li>
		</ul>
	</div> */
	//渲染城市
	var render=function(data){
		var str="";
		for(var k=0;k<data.length;k++){
			str+='<div class="serBig"><p class="ser">'+data[k].letter+'</p><ul>';
				data[k].list.forEach(function(j){
					str+='<li data="'+j[1]+'">'+j[0]+'</li>';
				})	
			str+='</ul></div>';
		}
		return str;
	}
	//渲染热门城市
	var renderHot=function(data){
		var str='<div class="serBig"><p class="ser">热门</p><ul>';
		data.forEach(function(j){
			str+='<li data="'+j[1]+'">'+j[0]+'</li>';
		})
		str+='</ul></div>';
		return str;
	}
	 city=renderHot(hotList)+render(finalList);
	 renderCity='<div class="current"><span id="select">北京</span>当前定位城市</div><div class="big">'+city+'</div>'
	$(".div").html(renderCity);

	

	//搜索相关城市
	var Sval="";
	$("#search").on("input propertychange",function(){
		 Sval=$(this).val();
		var str='';
		var reg=new RegExp("^"+Sval,"i")
		if(Sval!=""){
			for(var i=0;i<tempList.length;i++){
				tempList[i].list.forEach(function(j){						
					if(j[2].substr(0,Sval.length).search(reg)!=-1){
						str+='<li class="Scity" data="'+j[1]+'">'+j[0]+'</li>';
					}else if(Sval==j[0].substr(0,Sval.length)){
						str+='<li class="Scity" data="'+j[1]+'">'+j[0]+'</li>';
					}						
				})
			}
			$('.div').html(str);
		}else{
			$(".div").html(renderCity)
		}
	})



	//点击选中城市
	$(".div").on("tap","li",function(){
		var txt=$(this).text();
		$("#select").text(txt);
		$("#pick-area").text(txt);
		$(this).addClass("selected").siblings("li").removeClass();
		$(".city").css({
			"-webkit-transform":"translate3d(100%,0,0)",
			"-webkit-transition":"transform 1s"
		})
		$("#search").val("");
		$(".div").html(renderCity)
	})

})(Zepto)