document.body.onmousemove=function(event){
    var clientWidth=document.body.clientWidth;
    var clientHeight=document.body.clientHeight;
	var x=event.clientX;
	var y=event.clientY;
	var offWidth=clientWidth/5;
	var offHeight=clientHeight/5;
	var image=document.getElementById("backgroundImagePlace");
	image.style.left=-x*offWidth/clientWidth;
	image.style.right=-(clientWidth-x)*offWidth/clientWidth;
	image.style.top=-y*offHeight/clientHeight;
	image.style.bottom=-(clientHeight-y)*offHeight/clientHeight;
}