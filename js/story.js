'use strict';
let data;
let labels=new Array();
let index;
let pageCount;
let word;
let myInterval;
let winClick;
let clickSolved=false;
let records="";
let gameStory;
function solveLabel(i){
	if(gameStory[i].length==2){
			if(gameStory[i][1].length==2){
				gameStory[i][1][2]=i+1;
			}else{
				gameStory[i][1][2]=labels[gameStory[i][1][2]];
			}
	}else{
		for(let j=1;j<gameStory[i].length;j++){
			if(gameStory[i][j].length==1){
				gameStory[i][j][1]=i+1;
			}else{
				gameStory[i][j][1]=labels[gameStory[i][j][1]];
			}
		}
	}
}
function jumpLabel(v){
	pageCount=labels[v]-1;
}
function display(v){
	let nowPageCount=pageCount;
	pageCount=gameStory.length-1;
	gameStory.push(v);
	solveLabel(gameStory.length-1);
	gameStory.push(function(){
		console.log(pageCount,nowPageCount);
		pageCount=nowPageCount;
	});
}
gameStory=[
	[
		['img/background.jpg','','',''],
			['白寒','欢迎来到我们的世界，我将是你的领路人']
	],
	[
		['img/background.jpg','','',''],
			['白寒','首先，你会被系统随机设定一个属性值——**魅力**']
	],
	[
		['img/background.jpg','','',''],
			['白寒','你最好祈祷一下再尝试，**魅力**可是很重要的']
	],
	
	function(){
		data['魅力']=Math.round(Math.random()*100);
	},
	function(){
		if(data['魅力']>=95){
			jumpLabel('欧皇的魅力');
		}else if(data['魅力']>=45){
			jumpLabel('一般的魅力');
		}else if(data['魅力']>=5){
			jumpLabel('很差的魅力');
		}else{
			jumpLabel('非酋的魅力');
		}
	},
	function(){
		jumpLabel('待续');
	},
	
	'欧皇的魅力',[
		['img/background.jpg','','',''],
			['白寒','##卧槽##']
	],
	[
		['img/background.jpg','','',''],
			['白寒','##又一个欧皇附体的神仙##']
	],
	[
		['img/background.jpg','','',''],
			['白寒','##地球已经不能阻挡你的脚步##']
	],
	[
		['img/background.jpg','','',''],
			['白寒','##**女装**才是你的归宿##','待续']
	],
	
	'一般的魅力',[
		['img/background.jpg','','',''],
			['白寒','看起来**还行**']
	],
	[
		['img/background.jpg','','',''],
			['白寒','不过为了让游戏体验更加真实，我**不能**把具体的数据告诉你','待续']
	],
	
	'很差的魅力',[
		['img/background.jpg','','',''],
			['白寒','友情提醒一下，你的魅力有点**低**了']
	],
	[
		['img/background.jpg','','',''],
			['白寒','不过为了让游戏体验更加真实，我**不能**把具体的数据告诉你','待续']
	],
	
	
	'非酋的魅力',[
		['img/background.jpg','','',''],
			['白寒','既然你是**非酋**我也不瞒着你了']
	],
	function(){
		display([
			['img/background.jpg','','',''],
				['白寒','依照系统随机设定，你的**魅力**属性值只有**'+data['魅力']+'**点(总100点)']
		]);
	},
	[
		['img/background.jpg','','',''],
			['白寒','##你等死吧##','待续']
	],
	
	
	'待续',[
		['img/background.jpg','','',''],
			['作者','我还在写，**请自觉读档**','待续']
	],
];
for(let i=0;i<gameStory.length;i++){
	if(typeof(gameStory[i])=='string'){
		labels[gameStory[i]]=i+1;
	}
}
for(let i=0;i<gameStory.length;i++){
	if(typeof(gameStory[i])=='string')continue;
	if(typeof(gameStory[i])=='function')continue;
	solveLabel(i);
}