var data = [
	{ "img": 1,"h2": "Creative","h3": "DUET"},
	{ "img": 2,"h2": "Friendly","h3": "DEVIL"},
	{ "img": 3,"h2": "Tranquilent","h3": "COMPATRIOT"},
	{ "img": 4,"h2": "Insecure","h3": "HUSSLER"},
	{ "img": 5,"h2": "Loving","h3": "REBEL"},
	{ "img": 6,"h2": "Passionate","h3": "SEEKER"},
	{ "img": 7,"h2": "Crazy","h3": "FRIEND"}
];

var g = function(id){
	if( id.substr(0,1) == '.' ){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

function addSliders(){
	var tpl_main = g('template_main').innerHTML
		.replace(/^\s*/,'')
		.replace(/\s*$/,'');

	var tpl_ctrl = g('template_ctrl').innerHTML
		.replace(/^\s*/,'')
		.replace(/\s*$/,'');

	var out_main = [],out_ctrl = [];

	for( var i=0;i<data.length;i++ ){
		var html_main = tpl_main
				.replace(/{{index}}/g,data[i].img)
				.replace(/{{h2}}/g,data[i].h2)
				.replace(/{{h3}}/g,data[i].h3)
				.replace(/{{css}}/g,['','main-i_right'][i%2]);

		var html_ctrl = tpl_ctrl
				.replace(/{{index}}/g,data[i].img);

		out_main.push(html_main);
		out_ctrl.push(html_ctrl);
	}

	g('template_main').innerHTML = out_main.join('');
	g('template_ctrl').innerHTML = out_ctrl.join('');

	g('template_main').innerHTML += tpl_main
						.replace(/{{index}}/g,'{{index}}')
						.replace(/{{h2}}/g,data[0].h2)
						.replace(/{{h3}}/g,data[0].h3);

	g('main_{{index}}').id = 'main_background';
}

function switchSlider(num){
	var clear_main = g('.main-i'),clear_ctrl = g('.ctrl-i');

	for(var i=0;i<clear_ctrl.length;i++){
		// 为什么这里是clear_ctrl.length 而不是clear_main.length
		// 因为添加了背景 两者的长度不同了
		clear_main[i].className = clear_main[i].className
			.replace(' main_active','');

		clear_ctrl[i].className = clear_ctrl[i].className
			.replace(' ctrl_active','');
	}

	var main = g('main_' + num),ctrl = g('ctrl_' + num);

	main.className += ' main_active';
	ctrl.className += ' ctrl_active';

	setTimeout(function(){
		g('main_background').innerHTML = main.innerHTML;
	}, 1000);

}

function movePicture(){
	var pic = g('.picture');
	for(var i=0;i<pic.length;i++){
		pic[i].style.marginTop = -( pic[i].clientHeight/2 ) + 'px';
	}
}

window.onload = function(){
	addSliders();
	switchSlider(1);
	setTimeout(function(){
		movePicture();
	}, 100);
}