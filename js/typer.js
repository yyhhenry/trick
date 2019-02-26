'use strict';
let saying=0;
function type(){
    let typePanel = document.getElementById("textBox");
	if(index>word.length)index=word.length;
	let ans="";
	let isRed=false;
	let isBig=false;
	let ign=false;
	let bigFontSize=document.body.clientHeight*0.045;
	for(let i=0;i<index;i++){
		if(word[i]=='`'){
		    ign=!ign;
			if(i==index-1&&index<word.length)index++;
			continue;
		}
		if(!ign&&word[i]=='*'&&i+1<word.length&&word[i+1]=='*'){
			if(i==index-1&&index+1<word.length)index+=2;
			i++;
			isRed=!isRed;
			continue;
		}
		if(!ign&&word[i]=='#'&&i+1<word.length&&word[i+1]=='#'){
			if(i==index-1&&index+1<word.length)index+=2;
			i++;
			isBig=!isBig;
			continue;
		}
		if(isRed){
			ans+='<strong><font color=\'red\'>';
		}
		if(isBig){
			ans+='<font style=\'font-size:'+bigFontSize+'px\'>';
		}
		if(word[i]=='\n'){
			ans+='<br>';
		}else{
			ans+=word[i];
			
		}
		if(isBig){
			ans+='</font>';
		}
		if(isRed){
			ans+='</font></strong>';
		}
	}
	typePanel.innerHTML = ans;
	index++;
    saying=(saying+1)%6;
    if(saying == 0){
        typePanel.className = "noselect";
    }else{
        typePanel.className = "noselect saying";
    }
}
function loadCG(){
    let backgroundImage = document.getElementById("backgroundImage");
    let plh = [document.getElementById("plh0"),document.getElementById("plh1"),document.getElementById("plh2")];
	backgroundImage.src=gameStory[pageCount][0][0];
	for(let i=0;i<plh.length;i++){
		plh[i].style.display='none';
		plh[i].src='';
	}
	let hasPat=false;
	for(let i=1;i<gameStory[pageCount][0].length;i++)if(gameStory[pageCount][0][i]!=''){
		if(gameStory[pageCount][0][i][0]=='!')hasPat=true;
	}
	for(let i=1;i<gameStory[pageCount][0].length;i++)if(gameStory[pageCount][0][i]!=''){
		let graphUrl=gameStory[pageCount][0][i];
		if(graphUrl[0]=='!'){
			plh[i-1].style.filter='brightness(1.4)';
			plh[i-1].parentNode.style.zIndex=1;
			graphUrl=graphUrl.substring(1,graphUrl.length);
		}else{
			if(hasPat)plh[i-1].style.filter='brightness(0.7)';
			else plh[i-1].style.filter='brightness(1.0)';
			plh[i-1].parentNode.style.zIndex=0;
		}
		plh[i-1].style.display='inline';
		plh[i-1].src=graphUrl;
		if(graphList[graphUrl]==null){
			plh[i-1].style.height='100%';
			plh[i-1].style.paddingTop=0;
		}else{
			plh[i-1].style.height=document.body.clientHeight*graphList[graphUrl];
			plh[i-1].style.paddingTop=document.body.clientHeight*(1-graphList[graphUrl]);
		}
	}
}
function loadPage(){
	data["lastPageCount"]=pageCount;
	data["lastRecords"]=records;
	if(myInterval!=null){
		clearInterval(myInterval);
		myInterval=null;
	}
	if(typeof(gameStory[pageCount])=='function'){
		gameStory[pageCount]();
		pageCount++;
		loadPage();
		return;
	}
	let options = document.getElementById('options');
	let typePanel = document.getElementById("textBox");
	let speakerBox = document.getElementById("speakerBox");
	let recordBox = document.getElementById('recordBox');
	let buttonBox = document.getElementById("buttonBox");
	buttonBox.style.display='block';
	recordBox.style.display='none';
	options.style.display='none';
	loadCG();
    if(gameStory[pageCount].length==2){
		if(gameStory[pageCount][1][0]!=''){
			speakerBox.style.display='block';
			speakerBox.innerText=gameStory[pageCount][1][0];
		}else{
			speakerBox.style.display='none';
			if(gameStory[pageCount][1][1]==''){
				word='';
				typePanel.innerText="";
				typePanel.style.display='none';
				options.innerHTML='';
				return;
			}
		}
		typePanel.innerText="";
		typePanel.style.display='block';
		options.innerHTML='';
		word=gameStory[pageCount][1][1];
		index=0;
		myInterval=setInterval(type, 100);
		winClick=true;
	}else{
		speakerBox.style.display='none';
		typePanel.style.display='none';
		options.style.display='inline';
		winClick=false;
		word="";
		options.innerHTML="";
		for(let i=1;i<gameStory[pageCount].length;i++){
			let optioni=document.createElement('a');
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
let seeing=false;
function see(){
	let options = document.getElementById('options');
	let typePanel = document.getElementById("textBox");
	let speakerBox = document.getElementById("speakerBox");
	let buttonBox = document.getElementById("buttonBox");
	options.innerHTML="";
	buttonBox.style.display='none';
	typePanel.style.display='none';
	speakerBox.style.display='none';
	let recordBox = document.getElementById('recordBox');
	recordBox.style.display='block';
	let recordVal=document.createElement('div');
	recordVal.innerText=records;
	let recordsEnd=document.createElement('a');
	recordVal.appendChild(recordsEnd);
	recordBox.appendChild(recordVal);
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
function resize(){
	document.body.style.fontSize=document.body.clientHeight*0.03;
	loadCG();
	let replayButton = document.getElementById("replayButton");
	replayButton.style.marginTop=document.body.clientHeight*0.015;
	replayButton.style.marginLeft=document.body.clientHeight*0.01;
	let seeButton = document.getElementById("seeButton");
	seeButton.style.marginTop=document.body.clientHeight*0.015;
	seeButton.style.marginLeft=document.body.clientHeight*0.01;
}
window.onresize=function(){
	resize();
}  
window.onload=function(){
	window.onclick=function () {
		if(clickSolved){
			clickSolved=false;
			return;
		}
		if(seeing){
			seeing=false;
			let options = document.getElementById('recordBox');
			options.innerHTML="";
			loadPage();
			return;
		}
		if(winClick){
			if(index<word.length-1){
				index=word.length;
			}else{
				let ans="";
				let ign=false;
				for(let i=0;i<word.length;i++){
					if(word[i]=='`'){
						ign=!ign;
						continue;
					}
					if(!ign&&word[i]=='*'&&i+1<word.length&&word[i+1]=='*'){
						i++;
						continue;
					}
					if(!ign&&word[i]=='#'&&i+1<word.length&&word[i+1]=='#'){
						i++;
						continue;
					}
					ans+=word[i];
				}
				if(ans!='')records+=ans+'\n\n';
				pageCount=gameStory[pageCount][1][2];
				loadPage();
			}
		}
	}
	data=window.localStorage;
	if(data["lastPageCount"]!=null){
		pageCount=data["lastPageCount"];
		records=data["lastRecords"];
		loadPage();
	}else{
		replay();
	}
	resize();
}
 