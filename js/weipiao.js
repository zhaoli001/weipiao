;(function($){
	//构造函数
	var Download=function(options,inner){
		//默认参数
		var _default={
			refreshdom:{//下拉刷新
				cName:'list',
				updom:'<div class="updom">下拉刷新</div>',
				freedom:'<div class="freedom">释放刷新</div>',
				loaddom:'<div class="loading">正在更新……</div>'
			},
			loadDom:{//上拉刷新
				loadName:'rdom',
				updom:'<div class="updom">上拉刷新</div>',
				freedom:'<div class="freedom">释放刷新</div>',
				loaddom:'<div class="loading">正在加载……</div>'
			},
			distance:50,//拖拽的默认距离
			downFn:null,
			upFn:null
		}
		//扩展
		this.settings=$.extend({},_default,options);
		this.inner=inner;//inner
		this.insert=false;
		//初始化方法
		this.init();
	}

	//
	Download.prototype={
		init:function(){
			var _this=this;
			//给调用插件绑定事件
			this.inner
			.on("touchstart",function(e){
				//获取touches
				getTouches(e);
				//获取坐标
				startFn(e,_this);
				
			})
			.on("touchmove",function(e){
				getTouches(e);
				touchmoves(e,_this);
				
			})
			.on("touchend",function(e){
				touchends(_this);
			})
		}
	};

	//获取
	function getTouches(e){
		if(!e.touches){//e.originalEventTouches;兼容IE的touches
			e.touches=e.originalEventTouches;
		}
	}
	//执行函数
	function startFn(e,fn){
		//获取坐标
		fn.clientY=e.touches[0].clientY;
		//获取滚动条的位置
		
		fn.sbom=$(".list2").height();
		fn.sinner=$(".list").height();
		fn.sTop=fn.inner.scrollTop();

	}
	function touchmoves(e,fn){
		fn.moveY=e.touches[0].clientY-fn.clientY;
		if(fn.moveY>0){
			fn.direction="down";
		}else{
			fn.direction="up";
		};
		//向下刷新
		if(fn.settings.downFn && fn.direction=="down" && fn.sTop==0){
			//往inner中前面添加下拉刷新
			var updom=fn.settings.distance;
			if(!fn.insert){
				fn.$downdom=$("<div class='"+fn.settings.refreshdom.cName+"'></div>");
				fn.inner.prepend(fn.$downdom);
				fn.insert=true;
			}

			//根据移动的距离来添加不同的     Math.abs求绝对值
			var absY=Math.abs(fn.moveY)
			console.log(absY)
			if(absY<updom){
				fn.$downdom.html(fn.settings.refreshdom.updom);
				fn.offsetY=absY;
			}else if(absY>updom && absY<updom*2){
				fn.$downdom.html(fn.settings.refreshdom.freedom);
				fn.offsetY=updom-(absY-updom)*0.5;
			}else{
				fn.$downdom.html(fn.settings.refreshdom.loaddom);
				fn.offsetY=updom+updom*0.5+(absY-updom*2)*0.2;
			}
			fn.$downdom.css({
				"height":fn.offsetY+"px"
			})
		}

		//向上加载

		if(fn.settings.upFn && fn.direction=="up" && fn.sinner<=fn.sbom+fn.sTop){
			var loaddom=fn.settings.distance;
			if(!fn.insert){
				fn.$loaddom=$("<div class='"+fn.settings.loadDom.loadName+"'></div>");
				fn.inner.append(fn.$loaddom);
				fn.insert=true;
			}
			var absYY=Math.abs(fn.moveY)
			if(absYY<loaddom){
				fn.$loaddom.html(fn.settings.loadDom.updom);
				fn.offsetY=absYY;
			}else if(absYY>loaddom && absYY<loaddom*2){
				fn.$loaddom.html(fn.settings.loadDom.freedom);
				fn.offsetY=loaddom-(absYY-loaddom)*0.5;
			}else{
				fn.$loaddom.html(fn.settings.loadDom.loaddom);
				fn.offsetY=loaddom+loaddom*0.5+(absYY-loaddom*2)*0.2;
			}
				fn.$loaddom.css({
					"height":fn.offsetY+"px"
				})
		}

		
	}


	//touchend事件
	function touchends(e){
		if(e.direction=="down"){
			e.$downdom.css({
				"height":0,
				"-webkit-transition":"all 1s"
			}).on("webkitTransitionEnd",function(){
				$(this).remove();
				e.insert=false;
			})
		}else if(e.direction=="up"){
			console.log(e)
			e.$loaddom.css({
				"height":0,
				"-webkit-transition":"all 1s"
			}).on("webkitTransitionEnd",function(){
				$(this).remove();
				e.insert=false;
			})
		}
		
	}






	//插件
	$.fn.download=function(opt,inner){
		new Download(opt,$(this));
	}
})(Zepto)