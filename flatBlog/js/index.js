'use strict';
$(function(){
	var o = new Obj();
	o.init();
})

function Obj(){
	this.sidebar = $('.sidebar');
	this.mask = $('.mask');
	this.backTop = $('.back-to-top');
	this.sidebar_trigger = $('#sidebar_trigger');
	this.window = $(window);
}

Obj.prototype.init = function(){
	var self = this;
	self.sidebar_trigger.on('click',$.proxy(self.show,self));
	//这里传入self是让下文的this指向构造函数
	self.mask.on('click',$.proxy(self.hide,self));
	self.backTop.on('click',self.backToTop);
	self.window.on('scroll',$.proxy(self.autoScroll,self));
	self.window.trigger('scroll');
	//网页刷新的时候，自动监听滚动条事件
}

Obj.prototype.show = function(){
	var self = this;
	self.mask.fadeIn();
	self.sidebar.animate({"right": 0},500);
}

Obj.prototype.hide = function(){
	var self = this;
	self.mask.fadeOut();
	self.sidebar.animate({"right": -self.sidebar.width() + "px"},500);
}

Obj.prototype.backToTop = function(){
	$('html body').animate({"scrollTop": 0},800);
}

Obj.prototype.autoScroll = function(){
	var self = this;
	if( self.window.scrollTop() > self.window.height() ){
		self.backTop.fadeIn();
	}else{
		self.backTop.fadeOut();
	}
}