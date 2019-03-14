'use strict';
let saying=0;
function type(){
    let typePanel = document.getElementById('textBox');
	if(index>word.length)index=word.length;
	let ans='';
	let isRed=false;
	let isBig=false;
	let ign=false;
	let bigFontSize=document.documentElement.clientHeight*0.045;
	for(let i=0;i<index;i++){
		if(word[i]=='\t'){
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
        typePanel.className = 'noselect';
    }else{
        typePanel.className = 'noselect saying';
    }
}
function loadCG(){
	let 剧情数据=[];
	for(let i=0;i<剧情[数据.页码].length;i++){
		剧情数据.push([]);
		for(let j=0;j<剧情[数据.页码][i].length;j++){
			剧情数据[i].push(eval('\`'+剧情[数据.页码][i][j]+'\`'));
		}
	}
    let backgroundImage = document.getElementById('backgroundImage');
    let plh = [document.getElementById('plh0'),document.getElementById('plh1'),document.getElementById('plh2')];
	backgroundImage.src=剧情数据[0][0];
	for(let i=0;i<plh.length;i++){
		plh[i].style.display='none';
		plh[i].src='';
	}
	let hasPat=false;
	for(let i=1;i<剧情数据[0].length;i++)if(剧情[数据.页码][0][i]!=''){
		if(剧情数据[0][i][0]=='!')hasPat=true;
	}
	for(let i=1;i<剧情数据[0].length;i++)if(剧情数据[0][i]!=''){
		let graphUrl=剧情数据[0][i];
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
			plh[i-1].style.height=document.documentElement.clientHeight*graphList[graphUrl];
			plh[i-1].style.paddingTop=document.documentElement.clientHeight*(1-graphList[graphUrl]);
		}
	}
}
function loadPage(){
	if(myInterval!=null){
		clearInterval(myInterval);
		myInterval=null;
	}
	if(typeof(剧情[数据.页码])=='function'){
		剧情[数据.页码]();
		数据.页码++;
		loadPage();
		return;
	}
	let 剧情数据=[];
	for(let i=0;i<剧情[数据.页码].length;i++){
		剧情数据.push([]);
		for(let j=0;j<剧情[数据.页码][i].length;j++){
			剧情数据[i].push(eval('\`'+剧情[数据.页码][i][j]+'\`'));
		}
	}
	let options = document.getElementById('options');
	let typePanel = document.getElementById('textBox');
	let speakerBox = document.getElementById('speakerBox');
	let memoryBox = document.getElementById('memoryBox');
	let buttonBox = document.getElementById('buttonBox');
	buttonBox.style.display='block';
	memoryBox.style.display='none';
	options.style.display='none';
	loadCG();
    if(剧情数据.length==2){
		if(剧情数据[1][0]!=''){
			speakerBox.style.display='block';
			speakerBox.innerText=剧情数据[1][0];
		}else{
			speakerBox.style.display='none';
			if(剧情数据[1][1]==''){
				word='';
				typePanel.innerText='';
				typePanel.style.display='none';
				options.innerHTML='';
				return;
			}
		}
		typePanel.innerText='';
		typePanel.style.display='block';
		options.innerHTML='';
		word=剧情数据[1][1];
		index=0;
		myInterval=setInterval(type, 100);
		winClick=true;
	}else{
		speakerBox.style.display='none';
		typePanel.style.display='none';
		options.style.display='inline';
		options.style.height='';
		options.style.overflowX='none';
		options.style.overflowY='auto';
		winClick=false;
		word='';
		options.innerHTML='';
		for(let i=1;i<剧情数据.length;i++){
			let optioni=document.createElement('a');
			optioni.innerText=剧情数据[i][0];
			optioni.style.display='block';
			let 跳转目标=剧情数据[i][1];
			optioni.onclick=function(){
				数据.回想+=this.innerText+'\n\n';
				数据.页码=跳转目标;
				loadPage();
				clickSolved=true;
			}
			optioni.className='optioni';
			options.appendChild(optioni);
		}
		myInterval=null;
	}
}
let memorying=false;
function memory(){
	let options = document.getElementById('options');
	let typePanel = document.getElementById('textBox');
	let speakerBox = document.getElementById('speakerBox');
	let buttonBox = document.getElementById('buttonBox');
	options.innerHTML='';
	buttonBox.style.display='none';
	typePanel.style.display='none';
	speakerBox.style.display='none';
	let memoryBox = document.getElementById('memoryBox');
	memoryBox.style.display='block';
	memoryBox.innerHTML='';
	let memoryVal=document.createElement('div');
	memoryVal.innerText=数据.回想;
	let memoryEnd=document.createElement('a');
	memoryVal.appendChild(memoryEnd);
	memoryBox.appendChild(memoryVal);
	memoryEnd.scrollIntoView();
	winClick=false;
	clickSolved=true;
	memorying=true;
}
function replay(){
	clickSolved=true;
	数据.页码=0;
	数据.回想='';
	loadPage();
}
let save;
function savei(i){
	let options = document.getElementById('options');
	let typePanel = document.getElementById('textBox');
	let speakerBox = document.getElementById('speakerBox');
	let buttonBox = document.getElementById('buttonBox');
	let memoryBox = document.getElementById('memoryBox');
	buttonBox.style.display='none';
	memoryBox.style.display='none';
	
	speakerBox.style.display='none';
	typePanel.style.display='none';
	options.style.display='inline';
	options.style.height='';
	options.style.overflowX='none';
	options.style.overflowY='auto';
	winClick=false;
	options.innerHTML='';
	{
		let optioni=document.createElement('a');
		optioni.innerText='取消';
		optioni.style.display='block';
		optioni.onclick=function(){
			save();
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	{
		let optioni=document.createElement('a');
		if(window.localStorage['存档点'+i]!=null){
			optioni.innerText='覆盖 存档点'+i;
		}else{
			optioni.innerText='建立 存档点'+i;
		}
		optioni.style.display='block';
		optioni.onclick=function(){
			window.localStorage['存档点'+i]=JSON.stringify(数据);
			save();
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	if(window.localStorage['存档点'+i]!=null){
		let optioni=document.createElement('a');
		optioni.innerText='载入 存档点'+i;
		optioni.style.display='block';
		optioni.onclick=function(){
			数据=JSON.parse(window.localStorage['存档点'+i]);
			loadPage();
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	if(window.localStorage['存档点'+i]!=null){
		let optioni=document.createElement('a');
		optioni.innerText='删除 存档点'+i;
		optioni.style.display='block';
		optioni.onclick=function(){
			window.localStorage.removeItem('存档点'+i);
			save();
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	winClick=false;
	clickSolved=true;
}
save=function(){
	let options = document.getElementById('options');
	let typePanel = document.getElementById('textBox');
	let speakerBox = document.getElementById('speakerBox');
	let buttonBox = document.getElementById('buttonBox');
	let memoryBox = document.getElementById('memoryBox');
	buttonBox.style.display='none';
	memoryBox.style.display='none';
	
	speakerBox.style.display='none';
	typePanel.style.display='none';
	options.style.display='inline';
	options.style.height='';
	options.style.overflowX='none';
	options.style.overflowY='auto';
	winClick=false;
	options.innerHTML='';
	{
		let optioni=document.createElement('a');
		optioni.innerText='取消';
		optioni.style.display='block';
		optioni.onclick=function(){
			loadPage();
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	for(let i=1;i<=20;i++){
		let optioni=document.createElement('a');
		if(window.localStorage['存档点'+i]!=null){
			optioni.innerText='存档点'+i;
		}else{
			optioni.innerText='存档点'+i+'【空】';
		}
		optioni.style.display='block';
		optioni.onclick=function(){
			savei(i);
			clickSolved=true;
		}
		optioni.className='optioni';
		options.appendChild(optioni);
	}
	winClick=false;
	clickSolved=true;
}
function resize(){
	document.body.style.fontSize=document.documentElement.clientHeight*0.03+'px';
	loadCG();
	let replayButton = document.getElementById('replayButton');
	replayButton.style.marginTop=document.documentElement.clientHeight*0.015+'px';
	replayButton.style.marginLeft=document.documentElement.clientWidth*0.01+'px';
	let memoryButton = document.getElementById('memoryButton');
	memoryButton.style.marginTop=document.documentElement.clientHeight*0.015+'px';
	memoryButton.style.marginLeft=document.documentElement.clientWidth*0.01+'px';
	let saveButton = document.getElementById('saveButton');
	saveButton.style.marginTop=document.documentElement.clientHeight*0.015+'px';
	saveButton.style.marginLeft=document.documentElement.clientWidth*0.01+'px';
}
window.onresize=function(){
	resize();
}
window.onload=function(){
	if(window.localStorage.默认存档!=null){
		数据=JSON.parse(window.localStorage.默认存档);
	}else{
		数据={页码:0,回想:''};
	}
	loadPage();
	resize();
	window.onclick=function () {
		if(clickSolved){
			clickSolved=false;
			return;
		}
		if(memorying){
			memorying=false;
			loadPage();
			return;
		}
		if(winClick){
			if(index<word.length-1){
				index=word.length;
			}else{
				let ans='';
				let ign=false;
				for(let i=0;i<word.length;i++){
					if(word[i]=='\t'){
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
				if(ans!=''){
					数据.回想+=ans+'\n\n';
				}
				数据.页码=剧情[数据.页码][1][2];
				loadPage();
			}
		}
	}
}
window.onbeforeunload=function(){
	window.localStorage.默认存档=JSON.stringify(数据);
}