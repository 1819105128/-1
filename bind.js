function bind(obj,evenStr,callback){
  if(obj.addEventListener){
      //大部分浏览器兼容的方式
      obj.addEventListener(evenStr,callback,false);
  }else{
      /* 
      * this是谁由调用方式决定
      */
     //IE8及以下
     obj.attachEvent("on"+evenStr,function(){
         //在匿名函数中调用回调函数
         callback.call(obj);
     })
  }

}