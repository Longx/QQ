//把获取class的方法封装起来
function getByClass(clsName,parent){
   var oparent=parent?document.getElementById(parent):document,
       eles=[],
       elements=oparent.getElementsByTagName('*');
   for(var i=0,l=elements.length;i<l;i++){
        if (elements[i].className==clsName) {
        	eles.push(elements[i]);
        } 
    }
    return eles;
}

window.onload=darg;

function darg(){
	var oTitle=getByClass('logo','loginPanel')[0];
	//拖拽
	oTitle.onmousedown=fnDown;
	//关闭
    var oClose=document.getElementById('close');
    oClose.onclick=function(){
    	document.getElementById('loginPanel').style.display='none';
    }
    var state=document.getElementById('state'),
        loginStatePanel=document.getElementById('loginStatePanel'),
        lits=loginStatePanel.getElementsByTagName('li');
    state.onclick=function(e){ 
        e = e || window.event;
        if(e.stopPropagation){
          e.stopPropagation();
        }else{
          e.cancelBubble=true;
        }
        loginStatePanel.style.display='block';
   }
    document.onclick=function(e){ 
        loginStatePanel.style.display='none';
   }
   for(var i=0,l=lits.length;i<l;i++){
      lits[i].onmouseover=function(){
        this.style.background='#eceeee';
      }
      lits[i].onmouseout=function(){
        this.style.background='#fff';
      }
      lits[i].onclick=function(e){
        e = e || window.event;
        if(e.stopPropagation){
          e.stopPropagation();
        }else{
          e.cancelBubble=true;
        }
        var id=this.id;
        loginStatePanel.style.display='none';
        state.className='';
        state.className=id+' state';
      }
   }
}
function fnDown(event){
  event=event||window.event;
   var oDrag=document.getElementById('loginPanel'),
      //光标按下时光标和面板之间的距离
       disX=event.clientX-oDrag.offsetLeft,
       disY=event.clientY-oDrag.offsetTop;
  //移动
  document.onmousemove=function(event){
    event=event||window.enent;
     fnMove(event,disX,disY);
   }
  //释放鼠标
   document.onmouseup=function(){
   document.onmousemove=null;
   document.onmouseup=null;
  }
}
function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
    l=e.clientX-posX,
    t=e.clientY-posY,
    winW=document.documentElement.clientWidth||document.body.clientWidth,
    winH=document.documentElement.clientHeight||document.body.clientHeight,
    maxW=winW-oDrag.offsetWidth,
    maxH=winH-oDrag.offsetHeight;
  if (l<0) {
     l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if (t<0) {
    t=0;
  }else if (t>maxH) {
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}