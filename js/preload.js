let onloaded;
let source=[
	'audio/极致纯电音.mp3',
	'audio/神秘园之歌.mp3',
	'img/background.jpg',
	'img/front.jpg'
];
function preload(ind){
	if(ind==source.length){
		onloaded();
		return;
	}
	$.get(source[ind]);
	preload(ind+1);
}
window.onload=function(){
	preload(0);
}