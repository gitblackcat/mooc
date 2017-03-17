;(function($){
	// 这里第一行第一个加一个分号是为了当项目中js过多时，
	// 方式前一个加载的js最后一行没有加分号，导致这个js文件无法运行

	var Carousel = function(poster){
		var self = this;
		// 保存单个木马对象
		this.poster = poster;
		this.posterItemMain = poster.find('ul.poster-list');
		this.nextBtn = poster.find('div.poster-next-btn');
		this.prevBtn = poster.find('div.poster-prev-btn');
		this.posterItems = poster.find('li.poster-item');
		// 兼容帧数是偶数的情况
		if( this.posterItems.size()%2 == 0 ){
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			this.posterItems = this.posterItemMain.children();
		}

		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		this.rotateFlag = true;
		// 配置默认参数
		this.setting = {
			"width": 1000,
			"height": 270,
			"posterWidth": 640,
			"posterHeight": 270,
			"scale": 0.9,
			"speed": 500,
			"autoPlay": false,
			"delay": 500,
			"verticalAlign": "middle"
		};
		$.extend(this.setting,this.getSetting());

		// 设置配置参数
		this.setSettingValue();
		this.setPosterPos();

		// 左旋转按钮
		this.nextBtn.click(function(){
			if( self.rotateFlag ){
				self.rotateFlag = false;
				self.carouseRotate("left");
			}
		});

		// 右旋转按钮
		this.prevBtn.click(function(){
			if( self.rotateFlag ){
				self.rotateFlag = false;
				self.carouseRotate("right");
			}
		})

		// 是否开启自动播放
		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			});	
		}
	};

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		})
	};

	window["Carousel"] = Carousel;

	Carousel.prototype = {

		// 获取人工配置参数
		getSetting: function(){
			var setting = this.poster.attr('data-setting');
			if( setting && setting != '' ){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		},

		// 设置基本宽高以及第一帧图片的具体信息
		setSettingValue: function(){

			// 设置第一层父容器宽
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});

			// 设置第二层父容器宽
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});

			// 计算按钮宽度
			var w = (this.setting.width - this.setting.posterWidth)/2;
			// 设置按钮宽高和层级关系
			this.nextBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.ceil( this.posterItems.size()/2 )
			});
			this.prevBtn.css({
				width: w,
				height: this.setting.height,
				zIndex: Math.ceil( this.posterItems.size()/2 )
			});

			// 设置第一张图片的宽高和位置
			this.posterFirstItem.css({
				width: this.setting.posterWidth,
				height: this.setting.posterHeight,
				top: 0,
				left: w,
				zIndex: Math.floor( this.posterItems.size()/2 )
			})
		},

		// 设置剩余帧数的配置参数
		setPosterPos: function(){

			var self = this;

			var sliceItems = this.posterItems.slice(1),
				sliceSize = this.posterItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor( this.posterItems.size()/2 );

			// 设置右边帧的具体情况
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ( (this.setting.width - rw)/2 )/level;

			var firstLeft = ( this.setting.width - rw )/2;
			var fixOffsetLeft = firstLeft + rw;

			// 设置右边关系
			rightSlice.each(function(i){
				level--;
				rw = rw * self.setting.scale;
				rh = rh * self.setting.scale;
				var j = i;
				$(this).css({
					width: rw,
					height: rh,
					opacity: 1/(++j),
					zIndex: level,
					left: fixOffsetLeft+(++i)*gap-rw,
					top: self.setVerticalAlign(rh)
				});
			});

			// 设置左边关系
			// 注意 这里拿的是rightSlice的最后一帧的规格大小
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor( this.posterItems.size()/2 );

			leftSlice.each(function(i){
				$(this).css({
					zIndex: i,
					width: lw,
					height: lh,
					opacity: 1/oloop,
					left: i*gap,
					top: self.setVerticalAlign(lh)
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});

		},

		//设置垂直排列对齐
		setVerticalAlign:function(height){
			var verticalType  = this.setting.verticalAlign,
				top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{
				top = (this.setting.height-height)/2;
			};
			return top;
		},

		// 左右旋转
		carouseRotate: function(dir){
			var _this_ = this;
			var zIndexArr = [];
			// 左旋转
			if( dir === 'left' ){
				this.posterItems.each(function(){
					var self = $(this),
						prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width: width,
						height: height,
						opacity: opacity,
						left: left,
						top: top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});

				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});

			}else if( dir === 'right' ){ //右旋转
				this.posterItems.each(function(){
					var self = $(this),
						next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width: width,
						height: height,
						opacity: opacity,
						left: left,
						top: top
					},_this_.setting.speed,function(){
						_this_.rotateFlag = true;
					});
				});

				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}
		},

		// 自动播放
		autoPlay: function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			},self.setting.delay);
		}

	};

})(jQuery);