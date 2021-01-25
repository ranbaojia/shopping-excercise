$(function() {
    //    增加warn
    function addWarn() {
        var $span = `<span class="warn">亲！您还没有添加商品，再看看吧！</span>`;
        var $wrap_list = $('.wrap_list');
        $wrap_list.append($span);
    };

    // 更新本地存储函数封装,给arg设置默认参数
    function changeStroge(arg = null, del = "b") {
        // 遍历本地存储数据
        var goodsArr = JSON.parse(localStorage.getItem("goods"));
        if (arg !== null) {
            $(this).parent().children().eq(1).val(arg);
            // 找到此条点击的id
            var $id = $(this).parent().children().eq(1).attr("data-id");
            $.each(goodsArr, function(index, item) {
                // 当id相同时，更新此条num
                // 小于1移除li
                if (item.id == $id && arg < 1) {
                    // 并且在本地缓存里也移除这条数据
                    goodsArr.splice(index, 1);
                }
                if (item.id == $id) {
                    item.num = arg;
                    // 找到就截断
                    return false;
                }
            })
        }
        // 点击删除按钮，数据库里的对象消失
        if (del !== "b") {
            var $id = $(this).parent().children().eq(4).children().eq(1).attr("data-id");
            console.log($(this).parent().children().eq(4).children().eq(1));
            $.each(goodsArr, function(index, item) {
                // 当id相同时，更新此条num
                // 小于1移除li
                if (item.id == $id) {
                    // 并且在本地缓存里也移除这条数据
                    goodsArr.splice(index, 1);
                    return false;
                }
            })
        }

        if (goodsArr.length == 0) {
            // 增加提示语
            addWarn();
        }
        localStorage.setItem('goods', JSON.stringify(goodsArr))
    };
    // 求单条购物车总价的封装函数
    function allPrice(num) {
        // 总价随着数量改变
        var $sin_prcie = $('.sin_price');
        var prcie = parseInt($sin_prcie.text());
        $(this).parent().parent().children().eq(5).text(prcie * num);
        console.log($(this));
    }
    //购物车页面动态渲染
    $.ajax({
        url: "./data/goods.json",
        dataType: "json",
        type: 'get'
    }).then((val) => {
        var wrap_list = '';
        // 取出数组

        // 再遍历数组,第一层循环为了遍历数组里的对象
        if (!localStorage.getItem("goods")) {
            localStorage.setItem('goods', '[]')

        }
        var arr = JSON.parse(localStorage.getItem("goods"));
        arr.forEach((obj, i) => {
            // 拿到数组的obj后再和动态渲染的json数组对比id值，符合要求的加入wrap_list；
            // 第二层循环为了遍历ajax返回的数据
            $(val).each(function(index, item) {
                if (obj["id"] == item.id) {
                    wrap_list += ` <li class="clearfix">
                <input type="checkbox">
                <a href=""><img src="${item.imgurl}" alt=""></a>
                <span class="title">${item.title}</span>
                <span class="sin_price" >${item.price}</span>
                <div class="num_wrap"> <span class="iconfont plus">&#xe6aa;</span>
                <input type="text" class="num" data-id="${item.id}" value="${obj.num}"><span class="iconfont minus">&#xe6a9;</span>
                </div>
                <span class="all_price">${item.price*obj.num}</span>
                <span class="del" >删除</span>
                </li>`
                }
            });
        });
        $('wrap_list').empty();
        // jq要用jq的方法
        $('.wrap_list').append(wrap_list);

        //点击增加 ，表单++；并且将总价改变
        var $wrap_list = $('.wrap_list')
        $wrap_list.on('click', '.plus', function() {
            var num = $(this).parent().children().eq(1).val();
            num++;
            allPrice.call($(this), num);
            changeStroge.call($(this), num);
            return false;
        });


        // 点击减少，数值--；数量为0时，购物车记录移除
        $wrap_list.on('click', '.minus', function() {
            var num = $(this).parent().children().eq(1).val();
            num--;
            allPrice.call($(this), num);
            changeStroge.call($(this), num);
            if (num < 1) {
                $(this).parent().parent().remove();
            }
            // 默认事件移除
            return false;
        });
    });

    // 更新本地存储
    if (localStorage.getItem("goods") == "[]") {
        addWarn();
    }
    // 点击删除按钮
    var $wrap_list = $('.wrap_list');
    $wrap_list.on('click', ".del", function() {
        // 当前父级移出
        $(this).parent().remove();
        // 更新本地存储数据
        changeStroge.call($(this), null, true)
    });
    //  阻止选中文本默认事件
    $wrap_list.on('mousemove', function() {
        return false;
    });
})