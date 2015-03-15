// JavaScript Document
(function($){
	$.fn.extend({
		countdown: function(){
			//占位
			var addTime = function(time){
				if(time<10){
					time = "0" + time;
				}
				return time;
			}
			$(this).each(function(){
				//每个countdown都要获取以下变量
				var _endTime,_refresh,_diff,_nowTime,_date,_eqi;
				var _getCount,_showCount,_setCount;
				//缓存dom元素
				_this = $(this);
				_eqi = _this.find("i").toArray();  //类数组转换

				if(_this.attr("data-endTime")){
					_endTime = new Date(_this.attr("data-endtime"));
					_refresh = _this.attr("data-refresh");
					_date= new Array();
					//计算差值
					_getCount = function(){
						_nowTime = new Date();
						_diff = _endTime.getTime() - _nowTime.getTime();
						_date[0] = _endTime.getFullYear() - _nowTime.getFullYear();
						_date[1] = _endTime.getMonth() - _nowTime.getMonth() + _date[0]*12;	
						_date[2] = parseInt(_diff/86400000);  
						_diff%=86400000;
						_date[3] = parseInt(_diff/3600000);
						_diff%=3600000;
						_date[4] = parseInt(_diff/60000);
						_diff%=60000;
						_date[5] = parseInt(_diff/1000);
					}
						
					_showCount = function(){
						if(_diff>0){
							for(var i=0;i<_eqi.length-1;i++){
								_eqi[i].innerHTML=addTime(_date[i]);
							}
							//判断_refresh>=1min时，秒位置零
							if(_refresh>=60000){
								_eqi[i].innerHTML = "00";				
							}else{
								_eqi[i].innerHTML = _date[i];		
							}							
						}else{
							_this.text("倒计时结束");
							clearInterval(_setCount);	
						}
					}
					
					_setCount = setInterval(function(){
						_getCount();	
						_showCount();
					},1000);
					
				}
			});
		}	
	});
	$(".countdown").countdown();
})($);
