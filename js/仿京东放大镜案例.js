window.addEventListener('load', function() { //当页面都加载完成后，再执行我们的js代码，这句话千万别忘了
    // 整个案例可以分成三个模块
    // 1.鼠标经过小图片盒子，黄色的遮挡层和大图片盒子显示，离开隐藏2个盒子功能
    // 2.黄色遮挡层随鼠标移动功能
    // 3.移动黄色遮挡层，大图片跟随移动功能
    // 2.1 把鼠标坐标给遮盖层不合适， 因为遮挡层坐标以父盒子为准
    // 2.2首先获得鼠标在盒子的坐标，然后把数值给遮挡层作为left和top值，此时用到鼠标移动事件，但还是在小图片盒子内移动
    //     3.1 求大图片移动距离公式
    //     遮挡层移动距离            大图片移动距离
    //    ----------------   =     -----------------
    //     遮挡层最大移动距离       大图片最大移动距离
    var box = document.querySelector('.box');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 鼠标进入事件
    box.addEventListener('mouseover', function(e) {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    // 鼠标移出事件
    box.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 鼠标移动事件
    box.addEventListener('mousemove', function(e) {
        // 确认mask 的位置
        var x = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
        var y = e.pageY - this.offsetTop - mask.offsetHeight / 2;
        // 最大偏移值，即大盒子-放大镜层
        var maskMax = box.offsetWidth - mask.offsetWidth;

        // 超出偏移量，强制修改
        if (x <= 0) x = 0;
        if (x >= maskMax) x = maskMax;
        if (y <= 0) y = 0;
        if (y >= maskMax) y = maskMax;

        // 修改放大镜层的位置
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';

        // 计算大图的最大距离
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 两最大距离的商，即放大的倍数
        var boom = bigMax / maskMax;
        var bigX = x * boom;
        var bigY = y * boom;
        // 修改大图在盒子中的定位
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
});