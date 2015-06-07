/**************************************************
 * babyzone.js beta1
 * 作者：橡树小屋 09.1.2010
 * http://www.cnblogs.com/babyzone2004/
 * 用法：//count:图片数量，wrapId:包裹图片的DIV,ulId:按
        钮DIV,infoId：信息栏 babyzone.scroll(count,wrapId,ulId,infoId);
 **************************************************/
var picscroll = function() {
	function id(name) {return document.getElementById(name);}
	//遍历函数

	function each(arr, callback, thisp) {
		if (arr.forEach) {
			arr.forEach(callback, thisp);
		}
		else {
			for (var i = 0, len = arr.length; i < len; i++) callback.call(thisp, arr[i], i, arr);
		}
	}
	//渐入
	function fadeIn(elem) {
		setOpacity(elem, 0)
		for ( var i = 0; i <= 20; i++) {
			(function() {
				var pos = i * 5;
				setTimeout(function() {
					setOpacity(elem, pos)
				}, i * 25);//调节渐变的效果
			})(i);
		}
	}
	//渐出
	function fadeOut(elem) {
		for ( var i = 0; i <= 20; i++) {
			(function() {
				var pos = 100 - i * 5;
				setTimeout(function() {
					setOpacity(elem, pos)
				}, i * 25);
			})(i);
		}
	}
	// 设置透明度
	function setOpacity(elem, level) {
		if (elem.filters) {//for IE
			elem.style.filter = "alpha(opacity=" + level + ")";
		} else {
			elem.style.opacity = level / 100;
		}
	}
	return {
		//count:图片数量，wrapId:包裹图片的DIV,ulId:按钮DIV,infoId：信息栏
		scroll : function(count,wrapId,ulId,infoId) {
			var self=this;//指代这个对象babyzone,包括里面的所有方法和属性，有num,info,img,scroll,fade
			//console.log(self);
			var targetIdx=0;      //目标图片序号
			var curIndex=0;       //现在图片序号
			//添加Li按钮
			var frag=document.createDocumentFragment();
			this.num=[];    //存储各个li的应用，为下面的添加事件做准备
			this.info=id(infoId);//获取信息的div
			for(var i=0;i<count;i++){
				this.num[i]=frag.appendChild(document.createElement("li"));
			}
			id(ulId).appendChild(frag);//将小圆点按钮加到ul中
			
			//初始化信息,第一张图片，第一个信息，第一个小圆点
			this.img = id(wrapId).getElementsByTagName("a");
			this.info.innerHTML=self.img[0].firstChild.title;
			this.num[0].className="on";//给第一个小圆点设上选中的样式
			//将除了第一张外的所有图片设置为透明
			each(this.img,function(elem,idx,arr){
				if (idx!=0) setOpacity(elem,0);
			});
			
			//为所有的li添加点击事件
			each(this.num,function(elem,idx,arr){
				elem.onclick=function(){
					self.fade(idx,curIndex);
					curIndex=idx;
					targetIdx=idx;
				}
			});
			
			//自动轮播效果
			var itv=setInterval(function(){
				if(targetIdx<self.num.length-1){
					targetIdx++;
				}else{
					targetIdx=0;
					}
				self.fade(targetIdx,curIndex);
				curIndex=targetIdx;
				},3000);
			id(ulId).onmouseover=function(){ clearInterval(itv)};
			id(ulId).onmouseout=function(){
				itv=setInterval(function(){
					if(targetIdx<self.num.length-1){
						targetIdx++;
					}else{
						targetIdx=0;
						}
					self.fade(targetIdx,curIndex);
					curIndex=targetIdx;
				},3000);
			}
		},
		fade:function(idx,lastIdx){//idx是目标序号
			if(idx==lastIdx) return;
			var self=this;
			fadeOut(self.img[lastIdx]);//当前的pic淡出
			fadeIn(self.img[idx]);//目标pic淡入
			each(self.num,function(elem,elemidx,arr){
				if (elemidx!=idx) {
					self.num[elemidx].className='';
				}else{
					//id("list").style.background="";
					self.num[elemidx].className='on';
					}
			});
			this.info.innerHTML=self.img[idx].firstChild.title;
		}
	}
}();
