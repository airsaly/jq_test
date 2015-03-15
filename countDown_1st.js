 // JavaScript Document
(function($){
	$.fn.extend({
		countDown: function(){
			
			var _refresh,endTime,nowTime,diff,_years,_months,_days,_hours,_minutes,_seconds;
			//缓存dom
			$domY = $(".Y");
			$domm = $(".m");
			$domd = $(".d");
			$domH = $(".H");
			$domi = $(".i");
			$doms = $(".s");
			$countdown = $(".countdown");
			_refresh = $countdown.attr("data-refresh");
			endTime = new Date($countdown.attr("data-endTime"));
			//获取时间
			var _getCount = function(){
				nowTime = new Date();
				diff = endTime.getTime() - nowTime.getTime();
				_years = endTime.getFullYear() - nowTime.getFullYear();
				_months = endTime.getMonth() - nowTime.getMonth()+(_years*12);   //差值 
				_days = parseInt(diff/864e5);
				diff%=864e5;
				_hours = parseInt(diff/36e5);
				diff%=36e5;
				_minutes = parseInt(diff/6e4);
				diff%=6e4;
				_seconds = Math.floor(diff/1000);
			}
			var addTime,_showCount,_countValue,_setCount;
			//占位
			addTime = function(time){
				if(time<10){
					time = "0" + time;
				}
				return time;
			}
		
			_countValue = function(){
				if(diff>0){	
					$domY.text(_years);
					$domm.text(addTime(_months));
					$domd.text(addTime(_days));
					$domH.text(addTime(_hours));
					$domi.text(addTime(_minutes));
					$doms.text(addTime(_seconds));
				}else{
					$countdown.html("计时已结束。");			
					clearInterval(_setCount);
				}	
			}
			//计时
			_setCount = setInterval(function(){
				_getCount();
				_countValue();	
			},1000);			
		}
	});
	
	$(".countdown").countDown();
})($);