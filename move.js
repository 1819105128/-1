/*
 *目前我们定时器的标识由全局变量timer保存
 * 所有的执行正在执行的定时器都在这个变量中保存
 */
//var timer;//乌龟与兔子使用同一个定时器
/*
 *尝试创建一个可以简单动画的函数
 * 参数 obj要执行动画的对象
 * 		target:执行动画的目标位置
 * 	   speed：移动的速度
 * 		attr:要执行动画的样式，比如left,right
 * 		callback:回调函数，在动画执行完毕后执行
 */
 function move(obj, attr, target, speed, callback) {
	//关闭上一次的计时器，否则每按一次button，每开启一个计时器，此时速度不像设置的那样
	clearInterval(obj.timer);
	var current = parseInt(getStyle(obj, attr));
	//判断速度的正负值
	if (current > target) {
		speed = -speed;
	}
	//向执行动画的对象中添加一个timer属性，用来保存自己的定时器的标识
	obj.timer = setInterval(function() {
		// alert(oldValue);
		//在IE中，对于没有给定的值，会返回auto，此时无法计算，所以在#box1样式里设置left:0;
		//开启定时器执行动画效果
		//输出0px，无法计算，应变为0
		var oldValue = parseInt(getStyle(obj, attr));
		//在旧值的基础上增加
		var newValue = oldValue + speed;
		//如果往左移，需要判断newValue是否小于0
		if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//新值设置为obj
		//属性不能传变量，加上[]attr是谁就传谁
		obj.style[attr] = newValue + "px";
		//当元素移动到800px，使其停止动画
		if (newValue == target) {
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			//如果设置回调函数则执行
			callback && callback();
		}
	}, 30);
}


//定义一个函数，用来获取指定元素的当前的样式
//参数： obj 要获取样式的元素    name 要获取的样式名
function getStyle(obj, name) {
	//现实是函数没有，找全局，没有就报错
	//加window后，变成属性，属性没有返回Undefined
	if (window.getComputedStyle) {
		//正常浏览器方式

		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式
		return obj.currentStyle[name];
	}
}


