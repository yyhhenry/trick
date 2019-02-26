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
function jumpLabel(v){
	pageCount=labels[v]-1;
}
let gameStory=[
	function(){data['好感度']=0;},
	[
		['img/background.jpg','','',''],
			['抱起St格物的心脏','待续'],
			['抱起St格物的大腿','待续'],
			['抱起St格物的眼镜','待续'],
	],
	function(){jumpLabel('待续');},
	'待续',[
		['img/background.jpg','','',''],
			['Z君','我还在写，**请自觉读档**','待续']
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