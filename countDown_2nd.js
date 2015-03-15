//countDown_jq2  2015.3.12

(function(){
	$.fn.extend({
		countDown:function(countDown){
		//判断
		if(typeof countDown == "object" && countDown.endTime == undefined){
			throw new Error("this endTime must have value");
		}
		
		var _years,_months,_days,_hours,_minutes,_seconds,nowTime,endTime,diff;
		var _this = this;
		
		countDown.endtTime = countDown.endTime.split("/");
		
		_seconds = parseInt(countDown.endTime[0],10);
		_minutes = parseInt(countDown.endTime[1],10);
		_hours = parseInt(countDown.endTime[2],10);
		_days = parseInt(countDown.endTime[3],10);
		_months = parseInt(countDown.endTime[4],10);
		_years = parseInt(countDown.endTime[5],10);
		
		
		//缓存initial
		nowTime = new Date();
		endTime = new Date(countDown.endTime);
		diff = endTime.getTime() - nowTime.getTime();alert(diff);
		_years = endTime.getFullYear() - nowTime.getFullYear(); 
		_months = endTime.getMonth() - nowTime.getMonth() + _years*12; 
		_days = parseInt(diff/864e5);
		diff%=864e5;
		_hours = parseInt(diff/36e5);
		diff%=36e5;
		_minutes = parseInt(diff/6e4);
		diff%=6e4;
		_seconds = parseInt(diff/1000);
		
		var _addTime,_countValue,_setCount;
		
		addTime = function(time){
			if(time<10){
				time = "0" + time;
			}
			return time;
		}
		
		 _countValue = function(){
			if(_seconds == 0 && _minutes != 0){
				 _minutes = parseInt(_minutes,10)-1;   //string-->number
				 _seconds = 59;
			 }
			 if(_minutes == 0 && _hours != 0){
				 _hours = parseInt(_hours,10)-1;
				_minutes = 59; 
			 }
			 if(_hours == 0 && _days != 0){
				 _days = parseInt(_days,10)-1;
				 _hours = 23;
			 }
			 if(_days == 0 && _months != 0){
				 _months = parseInt(_months,10)-1;
				 _days = 29;
			 }
			 if(_months == 0 && _years != 0){
				 _years = parseInt(_years,10)-1;
				 _months = 12;
			 }
			 if(_years == 0 && _months == 0 && _days == 0 && _hours == 0 && _minutes == 0 && _seconds == 0){
				 clearInterval(_setCount);
				 countDown.finish && countDown.finish();
			 }
		 }
			
		 _setCount = setInterval(function(){
			 _countValue();
			 _seconds--;
			 _this.text(addTime(_years)+"年"+addTime(_months)+"月"+addTime(_days)+"天"+addTime(_hours)+"小时"+addTime(_minutes)+"分"+addTime(_seconds)+"秒");
		 },1000);
	
		$(".countd").countDown({
			endTime: "6/20/2015",
			finish: function(){
				$(".countd").text("倒计时结束")
			}
		});

		}
	});
})($);

