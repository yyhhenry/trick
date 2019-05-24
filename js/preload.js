let onloaded;
let source=[
	'audio/极致纯电音.mp3',
	'audio/神秘园之歌.mp3',
	'img/background.jpg',
	'img/front.jpg'
];
function preload(ind){
	if(ind==source.length){
		$(document.getElementById('loading')).slideUp(1500);
		setTimeout(onloaded,1500);
		return;
	}
	$.get(source[ind],function(){
		preload(ind+1);
	}).fail(function(){
		preload(ind+1);
	});
	
}
window.onload=function(){
	preload(0);
}