var index;
var pageCount;
var word;
var myInterval;
var winClick;
var clickSolved=false;
var records="";
function type(){
    var typePanel = document.getElementById("textBox");
    if(index<=word.length)typePanel.innerText = word.substring(0,index);
	index++;
    if(index % 6 == 0){
        typePanel.className = "noselect";
    }else{
        typePanel.className = "noselect saying";
    }
}
function loadPage(){
	if(pageCount==3){
		location.href='./../demo/others/今日GAL法/';
	}else if(pageCount==4){
		location.href='./../demo/others/sxd版滑稽官网/';
	}
	if(myInterval!=null){
		clearInterval(myInterval);
		myInterval=null;
	}
    var backgroundImage = document.getElementById("backgroundImage");
    var plh = [document.getElementById("plh0"),document.getElementById("plh1"),document.getElementById("plh2")];
	var options = document.getElementById('options');
	var typePanel = document.getElementById("textBox");
	backgroundImage.src=gameStory[pageCount][0][0];
	for(var i=0;i<plh.length;i++){
		plh[i].style.display='none';
	}
	for(var i=1;i<gameStory[pageCount][0].length;i++){
		plh[i-1].style.display='inline';
		plh[i-1].src=gameStory[pageCount][0][i];
	}
    if(gameStory[pageCount].length==2){
		typePanel.innerText="";
		typePanel.style.display='block';
		options.innerHTML='';
		word=gameStory[pageCount][1][0];
		index=0;
		myInterval=setInterval(type, 100);
		winClick=true;
	}else{
		typePanel.style.display='none';
		winClick=false;
		word="";
		for(var i=1;i<gameStory[pageCount].length;i++){
			var optioni=document.createElement('a');
			optioni.innerText=gameStory[pageCount][i][0];
			optioni.style.display='block';
			optioni.setAttribute("data-p",gameStory[pageCount][i][1]);
			optioni.onclick=function(){
				records+=this.innerText+'\n\n';
				pageCount=this.getAttribute("data-p");
				loadPage();
				clickSolved=true;
			}
			optioni.className='optioni';
			options.appendChild(optioni);
		}
		myInterval=null;
	}
}
var seeing=false;
function see(){
	var typePanel = document.getElementById("textBox");
	typePanel.style.display='none';
	var options = document.getElementById('options');
	options.innerHTML='';
	var optioni=document.createElement('div');
	optioni.innerText=records;
	optioni.innerHTML+='<a id=\'recordsEnd\'>&nbsp;</a>'
	optioni.style.display='block';
	optioni.style.height='600px';
	optioni.style.overflow='auto';
	optioni.className='optioni';
	options.appendChild(optioni);
	var recordsEnd=document.getElementById('recordsEnd');
	recordsEnd.scrollIntoView();
	clickSolved=true;
	seeing=true;
}
function replay(){
	clickSolved=true;
	pageCount=0;
	records="";
	loadPage();
}
window.onload=function(){
	window.onclick=function () {
		if(clickSolved){
			clickSolved=false;
			return;
		}
		if(seeing){
			seeing=false;
			var options = document.getElementById('options');
			options.innerHTML="";
			loadPage();
			return;
		}
		if(winClick){
			if(index<word.length-1){
				index=word.length;
			}else{
				records+=gameStory[pageCount][1][0]+'\n\n';
				pageCount=gameStory[pageCount][1][1];
				loadPage();
			}
		}
	}
	replay();
}
 