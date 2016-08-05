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
	for(var i=0;i<26;i++){//ѭ������26λ��ĸ��
		var L=String.fromCharCode(65+i);
		tempList[i]={letter:L,list:[]}
	}

	console.log(tempList);
	for(var j=0;j<cityList.length;j++){//������ĸ����з���
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
	//��ȡ��ÿ�����������ĸ
	cityList.forEach(function(i){
		//console.log(i[1].charAt(0).toUpperCase());
		if(allList[i[1].charAt(0).toUpperCase()]==null){
			allList[i[1].charAt(0).toUpperCase()]=[];
		}
	})

	//��������ĸ�����з��࣬�õ���Ӧ������
	for(var i in allList){
		cityList.forEach(function(j){
			//�ж����allList������ֵ�û���ƥ���Ӧ������Ӧ�Ļ���׷�ӣ�û�еĻ���׷�Ӽ�ֵ
			if(i==j[1].charAt(0).toUpperCase()){
				allList[i].push(j);
			}
		})
	}

	/* <div class="serBig">
		<p class="ser">����</p>
		<ul>
			<li>����</li>
		</ul>
	</div> */
	//��Ⱦ����
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
	//��Ⱦ���ų���
	var renderHot=function(data){
		var str='<div class="serBig"><p class="ser">����</p><ul>';
		data.forEach(function(j){
			str+='<li data="'+j[1]+'">'+j[0]+'</li>';
		})
		str+='</ul></div>';
		return str;
	}
	 city=renderHot(hotList)+render(finalList);
	 renderCity='<div class="current"><span id="select">����</span>��ǰ��λ����</div><div class="big">'+city+'</div>'
	$(".div").html(renderCity);

	

	//������س���
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



	//���ѡ�г���
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