/*!
zepto.tab.js v1.0.0 yanhaijing.com license.txt
*/
/* Build time: July 17, 2014 04:55:43 */
/**
 * zepto.tab.js
 * @author yanxuefeng
 */
(function($){
	"use strict";
	$.fn.tab = function(opt){
		var
			o = $.extend({
				tabHeaderWrap: ".js-tab-header",
				tabHeader: "li",
				tabBodyWrap: ".js-tab-body",
				tabBody: "li",				
				curClass: "cur",
				speed: 500,
				startIndex: 0,
				touchAnimation: false
			}, opt),
			curIndex = o.startIndex,
			$this = $(this),
			$tab = $this,
			$tabHeaderWrap = $(o.tabHeaderWrap, $tab),
			$tabHeaders = $(o.tabHeader, $tabHeaderWrap),
			$tabBodyWrap = $(o.tabBodyWrap, $this),
			$tabBodys = $(o.tabBody, $tabBodyWrap),
			len = $tabHeaders.length,
			width = $tabBodyWrap.width();
			
		function init() {
			function change(index) {
				var
					transition = 0,
					startX = 0;
				
				if (index < 0) {
					index = 0;
				}
				
				if (index >= len) {
					index = len - 1;
				}
				
				curIndex = index;
				transition = -(index * width) +"px";
				$tabHeaders.removeClass(o.curClass).eq(index).addClass(o.curClass);
				
				$tabBodyWrap.css({'-webkit-transform':'translate('+ transition +')','-webkit-transition': o.speed + 'ms linear'} );
			}
			$tab.addClass("js-tab");
			$tabHeaderWrap.addClass("js-tab-header");
			$tabHeaders.addClass("js-tab-header-li");
			$tabBodyWrap.addClass("js-tab-body");
			$tabBodys.addClass("js-tab-body-li");
			//初始化tab项的宽度
			$tabBodyWrap.width(width * len);
			$tabBodys.width(width);				
			//绑定事件
			$tabHeaders.tap(function(){
				change($(this).index());
			});		
			
			$tabBodyWrap.swipeLeft(function (e) {
				change(curIndex + 1);
			});
			$tabBodyWrap.swipeRight(function (e) {
				change(curIndex - 1);
			});
			
			//判断是否有触摸动画效�? 
			if (o.touchAnimation) {
				$tabBodyWrap.on("touchstart", function (e) {
					var touch;
					e.preventDefault();
			        touch= e.touches[0];
			        startX = touch.pageX;
				});
				$tabBodyWrap.on("touchmove", function (e) {
					var touch = e.touches[0],
			             x = touch.pageX - startX,
			             transform = $tabBodyWrap.css("-webkit-transform").match(/translate\((.*)\)/),
			             translateX = (parseInt(transform && transform[1], 10)) || 0,
			             scale = (translateX < -width * (len - 1) || translateX > 0) ? 0.4 : 1,
			             actTranslateX = translateX + x * scale;
			        
			        startX = touch.pageX;    
					event.preventDefault();
		        	$tabBodyWrap.css({'-webkit-transform': 'translate(' + actTranslateX + 'px)', '-webkit-transition': '0ms'} );
				});
			}
						
			$(window).on("resize", function (e) {
				$tabBodyWrap.css("display", "none");
				width = $tab.width();				
				$tabBodyWrap.width(width * len);
				$tabBodys.width(width);	
				$tabBodyWrap.css("display", "block");	
				change(curIndex);		
			});
		}
		
		init();
		return this;
	};
})(Zepto);	
