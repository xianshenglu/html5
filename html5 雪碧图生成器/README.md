
# [雪碧图生成器](https://i-am-luxiansheng.github.io/html5/html5%20%E9%9B%AA%E7%A2%A7%E5%9B%BE%E7%94%9F%E6%88%90%E5%99%A8/index.html)

使用说明：

1、兼容chrome、FF

2、点击 Download Spirit 之前，要先点击 Make Spirit ，左边会显示预览效果

技术面：

canvas、拖放事件、File API

# [预览地址](javascript:let urlArr = window.location.href.split('/');urlArr.push('index.html');urlArr.splice(urlArr.findIndex(v => v === 'tree'), 2);let githubIndex = urlArr.findIndex(v => v === 'github.com');urlArr.splice(githubIndex, 1);urlArr[githubIndex] = urlArr[githubIndex] + '.github.io';window.open(urlArr.join('/'));)
