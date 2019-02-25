var gameStory=[
	[
		['sky.jpg'],
		['今日GAL法',1],
		['sxd版滑稽官网',2],
	],
	[
		['sky.jpg',''],
		['《今日GAL法》GALGAME模板By Z君 \n点击前往',2],
	],
	[
		['sky.jpg','sxd.png'],
		['《sxd滑稽官网》制作：pfy\n点击前往',2],
	],
	[
		[''],
		['',0],
	],
	[
		[''],
		['',0],
	],
];

for(var i=0;i<gameStory.length;i++){
	for(var j=1;j<gameStory[i].length;j++){
		gameStory[i][j][1]+=i;
	}
}