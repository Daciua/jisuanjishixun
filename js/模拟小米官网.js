window.addEventListener('load', function() {
    var lis = document.querySelector('.box3').querySelector('.subnav').querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            this.className = 'current';
        }
        lis[i].onmouseout = function() {
            this.className = '';
        }

    }
    var hour = document.querySelector('.zbox1');
    var minute = document.querySelector('.zbox2');
    var second = document.querySelector('.zbox3');
    var inputTime = +new Date('2021-10-1');
    countDown();
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date(); //返回的是当前时间的总的毫秒数
        var times = (inputTime - nowTime) / 1000; // times是剩余时间的总的毫秒数
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h; //判断数值小于10的情况 如 0-9改为 00-09
        hour.innerHTML = h; //更改div里面的内容 把h给获取元素hour的内容
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? "0" + m : m;
        minute.innerHTML = m; //同上
        var s = parseInt(times % 60);
        s = s < 10 ? "0" + s : s;
        second.innerHTML = s; //同上
    }
    var navspan = document.querySelector('.navspan');
    var lis2 = navspan.children;
    for (var i = 0; i < lis.length; i++) {
        lis2[i].onmouseover = function() {
            this.children[1].style.display = 'block';
        }
        lis2[i].onmouseout = function() {
            this.children[1].style.display = 'none';
        }
    }
    var time2 = 0; //2秒后自动换图
    var timeId = -1; //自动函数的ID值，默认-1
    var banner = document.querySelector(".banner"); //获取banner
    var bannerImg = document.querySelectorAll(".bannerImg li"); //获取所有的li(图片)
    var dian = document.querySelectorAll(".dian li"); //获取所有的小按钮
    var right55 = document.getElementsByClassName("right55")[0]; //获取点击下一张
    var left55 = document.getElementsByClassName("left55")[0]; //获取点击上一张
    index = 0; //图片索引

    // 点击下一张
    right55.onclick = function() {
        changeImg(true);
    }

    // 点击上一张
    left55.onclick = function() {
        changeImg(false);
    }

    // 自动轮播
    function autoPlay() {
        timeId = setInterval(function() {
            time2++;
            if (time2 == 20) {
                time2 = 0;
                changeImg(true);
            }
        }, 100);
    }

    autoPlay();

    // 当鼠标移上banner空间时，停止自动轮播
    banner.onmouseover = function() {
            clearTimeout(timeId);
        }
        // 当鼠标移开banner空间时，继续自动轮播
    banner.onmouseout = function() {
        autoPlay();
    }


    // 清除样式
    function clearStyle(index) {
        // 清除上一个样式
        bannerImg[index].className = "";
        dian[index].className = "items";
    }

    // 添加样式
    function addStyle(index) {
        // 添加样式
        bannerImg[index].className = "on";
        dian[index].className = "items on";
    }


    /* 
    	更改图片和小按钮样式
    	flag:
    		true:下一张
    		false:上一张
    */
    function changeImg(flag) {
        time2 = 0; //用来阻止2秒后自动换图的bug
        clearStyle(index);
        // 判断是上一张还是下一张
        if (flag) {
            // 下一张
            index++;
            index %= 5;
        } else {
            // 上一张
            index--;
            if (index < 0) index = 0;
        }
        addStyle(index);
    }

    /* 
    	点击小按钮切换到对应图片
    */
    function buttonClick(num) {
        time2 = 0; //用来阻止2秒后自动换图所产生的小bug
        clearStyle(index);
        index = num;
        addStyle(index);
    }


})