window.onload = function(){
	window.o = new Obj();
	window.o.init();
}

function Obj(){
	this.data = [
		{ "img": 1,"h2": "Creative","h3": "DUET"},
		{ "img": 2,"h2": "Friendly","h3": "DEVIL"},
		{ "img": 3,"h2": "Tranquilent","h3": "COMPATRIOT"},
		{ "img": 4,"h2": "Insecure","h3": "HUSSLER"},
		{ "img": 5,"h2": "Loving","h3": "REBEL"},
		{ "img": 6,"h2": "Passionate","h3": "SEEKER"},
		{ "img": 7,"h2": "Crazy","h3": "FRIEND"}
	];
}

Obj.prototype.init = function(){
	this.addSliders();
	this.switchSlider(1);
}

Obj.prototype.addSliders = function(){
	var tpl_main = this.gE('template_main').innerHTML
		.replace(/^\s*/,'')
		.replace(/\s*$/,'');

	var tpl_ctrl = this.gE('template_ctrl').innerHTML
		.replace(/^\s*/,'')
		.replace(/\s*$/,'');

	var out_main = [],out_ctrl = [];

	for( var i=0;i<this.data.length;i++ ){
		var html_main = tpl_main
				.replace(/{{index}}/g,this.data[i].img)
				.replace(/{{h2}}/g,this.data[i].h2)
				.replace(/{{h3}}/g,this.data[i].h3)
				.replace(/{{css}}/g,['','main-i_right'][i%2]);

		var html_ctrl = tpl_ctrl
				.replace(/{{index}}/g,this.data[i].img);

		out_main.push(html_main);
		out_ctrl.push(html_ctrl);
	}

	this.gE('template_main').innerHTML = out_main.join('');
	this.gE('template_ctrl').innerHTML = out_ctrl.join('');

	this.gE('template_main').innerHTML += tpl_main
						.replace(/{{index}}/g,'{{index}}')
						.replace(/{{h2}}/g,this.data[0].h2)
						.replace(/{{h3}}/g,this.data[0].h3);

	this.gE('main_{{index}}').id = 'main_background';
}

Obj.prototype.switchSlider = function(num){
	var self = this;

	var clear_main = self.gE('.main-i'),clear_ctrl = self.gE('.ctrl-i');

	for(var i=0;i<clear_ctrl.length;i++){
		// 为什么这里是clear_ctrl.length 而不是clear_main.length
		// 因为添加了背景 两者的长度不同了
		clear_main[i].className = clear_main[i].className
			.replace(' main_active','');

		clear_ctrl[i].className = clear_ctrl[i].className
			.replace(' ctrl_active','');
	}

	var main = self.gE('main_' + num),ctrl = self.gE('ctrl_' + num);

	main.className += ' main_active';
	ctrl.className += ' ctrl_active';

	setTimeout(function(){
		self.gE('main_background').innerHTML = main.innerHTML;
	}, 1000);

	setTimeout(function(){
		self.movePicture();
	}, 100);

}

Obj.prototype.movePicture = function(){
	var pic = this.gE('.picture');
	for(var i=0;i<pic.length;i++){
		pic[i].style.marginTop = -( pic[i].clientHeight/2 ) + 'px';
	}
}

Obj.prototype.gE = function(id){
	if( id.substr(0,1) == '.' ){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}