const btn = document.getElementById("btn");
const imgArr = document.getElementsByTagName("img");
const pArr = document.getElementsByTagName("p");
const spanArr = document.getElementsByTagName("span");
const iArr = document.getElementsByTagName("i");
const div0 = document.getElementById("div0");
const div1 = document.getElementById("div1");
const div2 = document.getElementById("div2");
const div3 = document.getElementById("div3");
const div4 = document.getElementById("div4");
const div5 = document.getElementById("div5");
const div6 = document.getElementById("div6");
const div7 = document.getElementById("div7");
const div8 = document.getElementById("div8");
const div9 = document.getElementById("div9");
const span0 = document.getElementById("span0");
const span1 = document.getElementById("span1");
const span2 = document.getElementById("span2");
const span3 = document.getElementById("span3");
const span4 = document.getElementById("span4");
const span5 = document.getElementById("span5");
const span6 = document.getElementById("span6");
const span7 = document.getElementById("span7");
const span8 = document.getElementById("span8");
const span9 = document.getElementById("span9");
const i0 = document.getElementById("i0");
const lyric = document.getElementById("lyric");
let songArr = [];
let idArr = [];
let divArr = [div0, div1, div2, div3, div4, div5, div6, div7, div8, div9];
let url2Arr = [];
let spArr = [
  span0,
  span1,
  span2,
  span3,
  span4,
  span5,
  span6,
  span7,
  span8,
  span9,
];
let url1Arr = [];
function Ajax(method,url){
  return new Promise((resolve,reject)=>{
    //实例化XMLHttpRequest对象
const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open(method,url,true);
//接收返回值
xhr.onreadystatechange = () => {
 if (xhr.readyState === 4) {
   if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
     const res = JSON.parse(xhr.responseText);
     console.log(res);
     console.log('请求成功');
     resolve(res)
   } else {
     console.log('请求失败');
     reject("请求失败")
   }
 }
};
//发送请求
xhr.send();
  })
 }

btn.onclick = function () {
  
  var l = 0;
  for (l = 0; l < divArr.length; l++) {
    divArr[l].style.height = "280" + "px";
  }
  const promise = new Promise((resolve, reject) => {
   resolve(Ajax("get","http://music.eleuu.com/personalized?limit=10"))
  })
    .then(
      (res) => {
        var i = 0;
        for (i = 0; i < 10; i++) {
          imgArr[i].style.width = "230" + "px";
          imgArr[i].style.height = "230" + "px";
          pArr[i].innerHTML = res.result[i].name;
          imgArr[i].src = res.result[i].picUrl;
          idArr[i] = res.result[i].id;
          url1Arr[i] = "http://music.eleuu.com/playlist/detail?id=" + idArr[i];
          //获取链接
        }
      },
      (rej) => {
        console.log("第一个then方法失败");
      }
    )
    .then(
      (res) => {
        //为每个div绑定点击响应函数
        for (let k = 0; k < divArr.length; k++) {
          divArr[k].onclick = function () {
         Ajax("get",url1Arr[k]).then((res)=>{
          for (let m = 0; m < url1Arr.length; m++) {
            iArr[m].innerHTML = res.playlist.tracks[m].name;
            songArr[m] = res.playlist.tracks[m].id;
            url2Arr[m] =
              "http://music.eleuu.com/lyric?id=" + songArr[m];
          }
         },(rej)=>{
           console.log("失败");
         })
         
          };
        }
      },
      (rej) => {
        console.log("第二个then方法失败");
      }
    )
    .then(
      (res) => {
        for (let k = 0,n=0; k < url1Arr.length; k++,n++) {
          spanArr[k].onclick = function () {
          Ajax("get",url2Arr[k]).then((res)=>{
            let rep = res.lrc.lyric;
            let then0 = rep.replace(/\n/g, "<br>");
            let rep0 = then0.replace(
              /\[[0-9]{2}[:punct:][0-9]{2}.[0-9]{2}]/g,
              ""
            );
            let rep1 = rep0.replace(
              /\[[0-9]{2}[:punct:][0-9]{2}.[0-9]{3}]/g,
              ""
            );
            lyric.innerHTML = rep1;
          },(rej)=>{
            console.log("失败咯");
          })
          };
        }
      },
      (rej) => {
        console.log("第三个then方法失败");
      }
    );
};