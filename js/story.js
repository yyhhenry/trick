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
		audio.pause();
		audio.play();
	}
}
剧情=[
	function(){
		播放音乐('./audio/神秘园之歌.mp3');
	},
	[
		['img/background.jpg','','',''],
			['作者','进入游戏之前，先填一下你的名字']
	],
	function(){
		function isnull(s){
			for(let i=0;i<s.length;i++){
				if(s[i]!=' '&&s[i]!='\t'){
					return false;
				}
			}
			return true;
		}
		数据.名字='白寒';
		while(true){
			数据.名字=prompt('键入你的名字',数据.名字);
			if(数据.名字==null||isnull(数据.名字)){
				alert('名字不能为空');
				数据.名字='白寒';
			}else if(数据.名字.length>10){
				alert('名字最多10字');
			}else{
				break;
			}
		}
	},
	function(){
		播放音乐();
	},
	[
		['img/background.jpg','','',''],
			['${数据.名字}','填好了']
	],
	[
		['img/background.jpg','','',''],
			['作者','OK，首先，你会被系统随机设定一个属性值——**魅力**']
	],
	[
		['img/background.jpg','','',''],
			['作者','你最好祈祷一下再尝试，**魅力**可是很重要的']
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
			['作者','##卧槽##']
	],
	[
		['img/background.jpg','','',''],
			['作者','##又一个欧皇附体的神仙##']
	],
	[
		['img/background.jpg','','',''],
			['作者','##地球已经容不下你突破天际的魅力##']
	],
	[
		['img/background.jpg','','',''],
			['作者','##**女装**才是你的归宿##','待续']
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
			['作者','##你等死吧##','待续']
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
