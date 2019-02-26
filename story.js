var data;
var labels=new Array();
var index;
var pageCount;
var word;
var myInterval;
var winClick;
var clickSolved=false;
var records="";
function jumpLabel(v){
	pageCount=labels[v]-1;
}
var gameStory=[
	function(){data['好感度']=0;},
	function(){jumpLabel('待续');},
	'待续',[
		['BGImage/poject.jpg','','',''],
		['Z君','我还在写，**请自觉读档**','待续']
	],
];
for(var i=0;i<gameStory.length;i++){
	if(typeof(gameStory[i])=='string'){
		labels[gameStory[i]]=i+1;
	}
}
for(var i=0;i<gameStory.length;i++){
	if(typeof(gameStory[i])=='string')continue;
	if(typeof(gameStory[i])=='function')continue;
	if(gameStory[i].length==2){
			if(gameStory[i][1].length==2){
				gameStory[i][1][2]=i+1;
			}else{
				gameStory[i][1][2]=labels[gameStory[i][1][2]];
			}
	}else{
		for(var j=1;j<gameStory[i].length;j++){
			if(gameStory[i][j].length==1){
				gameStory[i][j][1]=i+1;
			}else{
				gameStory[i][j][1]=labels[gameStory[i][j][1]];
			}
		}
	}
}