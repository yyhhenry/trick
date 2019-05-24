let onloaded;
let source=[
	'audio/极致纯电音.mp3',
	'audio/神秘园之歌.mp3',
	'img/background.jpg',
	'img/front.jpg'
];
function preload(ind){
	let loadingFile=document.getElementById('loadingFile');
	if(ind==source.length){
		$(loadingFile).html('预加载结束');
		$(document.getElementById('loading')).slideUp(2000);
		setTimeout(onloaded,0);
		return;
	}
	$(loadingFile).html('正在加载资源'+source[ind]+'（'+ind+'/'+source.length+'）');
	$.get(source[ind],function(){
		preload(ind+1);
	}).fail(function(){
		preload(ind+1);
	});
	
}
window.onload=function(){
	preload(0);
}