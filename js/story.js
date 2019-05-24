'use strict';
let 数据;
let 标签=new Array();
let index;
let word;
let myInterval;
let winClick;
let clickSolved=false;
let 剧情;
function 跳至标签(v){
	数据.页码=标签[v]-1;
}
function 播放音乐(s){
	let audio=document.getElementById('audio');
	if(s==null){
		数据.音乐='';
		audio.src='';
	}else if(数据.音乐!=s){
		audio.src=s;
		数据.音乐=s;
		audio.load();
		audio.oncanplay=function(){
			audio.play();
		}
	}
}
剧情=[
	[
		['img/background.jpg','','img/front.jpg',''],
			['','']
	],
	function(){
		播放音乐('./audio/神秘园之歌.mp3');
	},
	[
		['img/background.jpg','','',''],
			['作者','# 你需要先创建角色']
	],
	[
		['img/background.jpg','','',''],
			['男性角色','角色 男'],
			['女性角色','角色 女']
			
	],
	'角色 男',[
		['img/background.jpg','','',''],
			['作者','男性角色是吗，选个名字，\n# 个人推荐选**白寒**']
	],[
		['img/background.jpg','','',''],
			['白寒','角色 白寒'],
			['林凡','角色 林凡'],
			['Link','角色 Link'],
			
	],
	'角色 女',[
		['img/background.jpg','','',''],
			['作者','你选女性角色……行吧，接下来还需要选名字\n嗯……如果你真是个**妹子**的话，给你个忠告\n# ——别选**Lindsay**']
	],[
		['img/background.jpg','','',''],
			['白依','角色 白依'],
			['林菀','角色 林菀'],
			['Lindsay','角色 Lindsay'],
	],
	'角色 白寒',function(){数据.名字='白寒';跳至标签('角色选择完成');},
	'角色 林凡',function(){数据.名字='林凡';跳至标签('角色选择完成');},
	'角色 Link',function(){数据.名字='Link';跳至标签('角色选择完成');},
	'角色 白依',function(){数据.名字='白依';跳至标签('角色选择完成');},
	'角色 林菀',function(){数据.名字='林菀';跳至标签('角色选择完成');},
	'角色 Lindsay',[
		['img/background.jpg','','',''],
			['作者','既然你还是选择了**Lindsay**，我就默认不把你当做**真·妹子**来看了']
	],function(){数据.名字='Lindsay';跳至标签('角色选择完成');},
	
	'角色选择完成',function(){
		播放音乐();
	},
	[
		['img/background.jpg','','',''],
			['作者','嗯……${数据.名字}，相信你做出了你所认为最好的选择\n废话不多说，你会被系统随机设定一个属性值——**魅力**']
	],
	[
		['img/background.jpg','','',''],
			['作者','你最好祈祷一下再继续，**魅力**可是很重要的']
	],
	
	function(){
		数据.魅力=Math.round(Math.random()*100);
	},
	function(){
		if(数据.魅力>=95){
			跳至标签('欧皇的魅力');
		}else if(数据.魅力>=45){
			跳至标签('一般的魅力');
		}else if(数据.魅力>=5){
			跳至标签('很差的魅力');
		}else{
			跳至标签('非酋的魅力');
		}
	},
	
	'欧皇的魅力',function(){
		播放音乐('./audio/极致纯电音.mp3');
	},
	[
		['img/background.jpg','','',''],
			['作者','# 卧槽']
	],
	[
		['img/background.jpg','','',''],
			['作者','# 又一个欧皇附体的神仙']
	],
	[
		['img/background.jpg','','',''],
			['作者','# 地球已经容不下你突破天际的魅力']
	],
	[
		['img/background.jpg','','',''],
			['作者','# **女装**才是你的归宿','待续']
	],
	
	'一般的魅力',[
		['img/background.jpg','','',''],
			['作者','看起来**还行**']
	],
	[
		['img/background.jpg','','',''],
			['作者','不过为了让游戏体验更加真实，我**不能**把具体的数据告诉你','待续']
	],
	
	'很差的魅力',[
		['img/background.jpg','','',''],
			['作者','友情提醒一下，你的魅力有点**低**了']
	],
	[
		['img/background.jpg','','',''],
			['作者','不过为了让游戏体验更加真实，我**不能**把具体的数据告诉你','待续']
	],
	
	
	'非酋的魅力',[
		['img/background.jpg','','',''],
			['作者','既然你是**非酋**我也不瞒着你了']
	],
	[
		['img/background.jpg','','',''],
			['作者','依照系统随机设定，你的**魅力**属性值只有**${数据.魅力}**点(总100点)']
	],
	[
		['img/background.jpg','','',''],
			['作者','# 你等死吧','待续']
	],
	
	
	'待续',function(){
		播放音乐('./audio/极致纯电音.mp3');
	},
	[
		['img/background.jpg','','',''],
			['作者','我还在写，**请自觉读档**','待续']
	],
];
for(let i=0;i<剧情.length;i++){
	if(typeof(剧情[i])=='string'){
		标签[剧情[i]]=i+1;
	}
}
for(let i=0;i<剧情.length;i++){
	if(typeof(剧情[i])=='string')continue;
	if(typeof(剧情[i])=='function')continue;
	if(剧情[i].length==2){
			if(剧情[i][1].length==2){
				剧情[i][1][2]=i+1;
			}else{
				剧情[i][1][2]=标签[剧情[i][1][2]];
			}
	}else{
		for(let j=1;j<剧情[i].length;j++){
			if(剧情[i][j].length==1){
				剧情[i][j][1]=i+1;
			}else{
				剧情[i][j][1]=标签[剧情[i][j][1]];
			}
		}
	}
}
