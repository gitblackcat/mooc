CSS Sprite(雪碧图)适用情况

1.静态图片，不随用户信息的变化而变化
2.小图片，图片容量比较小
3.加载量比较大

用CSS Sprite的优点

1.减少HTTP请求数，降低页面加载的时间(每请求一次，就是和服务器建立一次链接，建立链接会消耗更多时间)
2.加速内容显示

制作CSS Sprite的方式

1.手动PS
2.下载Sprite自动工具，推荐使用CssGaga(http://www.99css.com/cssgaga/)