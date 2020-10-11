/**
 * 绘图用的入口函数
 */
function analyse() {
    try {
        //清空画布
        $(".graph-wrapper").empty()
        // throw new Error('error');
        let text = $(".input-area").val();
        if (text === '') return;
        text = text.trim();
        // 每组数据之间通过两个空行隔开
        let trees = text.split('\n\n\n');
        // console.log(trees.length)
        trees.forEach((treeText) => {
            // 调用解析函数将输入数据转化为需要的js对象
            let texs = parse(treeText);
            // console.log(texs);
            let graphlist = document.getElementsByClassName("graph");
            let graphDom = graphlist[graphlist.length - 1];
            var myChart = echarts.init(graphDom);
            myChart.clear();
            myChart.setOption(option = {
                // 点击叶子节点触发事件
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'click',
                    formatter: (item) => {
                        return item.value;
                    }
                },
                // 保存为图片功能
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                // 树形图绘制配置
                series: [{
                    type: 'tree',
                    data: [texs],
                    symbolSize: 8,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            });
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        })
    } catch (error) {
        //统一异常处理
        const errorDom = '<div class="graph" style="width: 100%;height:350px;margin-top: 20px;color: red">' +
            error
            .message + '</div>';
        $(".graph-wrapper").append(errorDom);
        return;
    }

}


/**
 * 将输入的文本转为需要的js对象
 * @param {*} treeText 输入的文本
 */
function parse(treeText) {
    let lines = treeText.split('\n');
    let data = new Object();
    let map = new Map();
    data.name = lines[0];
    if (lines[0].slice(0, 2) !== '导师') {
        throw new Error('ERROR: 导师行不正确,请注意每组数据之间有两行空行');
    }
    data.children = new Array();
    // console.log(lines.length);
    // 对每一行进行解析
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '') continue;
        // 当前行是学生列表
        if (!isNaN(lines[i].slice(0, 4))) {
            var children = new Object();
            console.log(lines[i].search('级博士生|级硕士生|级本科生'))
            if (lines[i].split('：').length <= 1 || (lines[i].search('级博士生|级硕士生|级本科生')) == -1) {
                throw new Error('ERROR: 学生信息解析不正确');
            }
            children.name = lines[i].split('：')[0];
            children.children = new Array();
            // 对于每一个学生
            lines[i].split('：')[1].split('、').forEach(item => {
                var t = new Object();
                t.name = item;
                t.value = '暂无';
                children.children.push(t);
                // 将当前对象存入map方便后面修改技能信息
                map.set(item, t);
            })
            data.children.push(children);
            // 当前行是技能信息
        } else {
            let [name, skill] = lines[i].split('：')
            // 如果技能文字为空
            if (!skill) {
                throw new Error('ERROR: 节点技能输入不正确');
            }
            if (!map.get(name)) {
                throw new Error("学生 " + name + "不存在")
            }
            map.get(name).value = skill;
        }

    }
    // console.log(data);
    const domText = '<div class="graph" style="width: 100%;height:350px;"></div>';
    $(".graph-wrapper").append(domText);
    return data;
}

/**
 * 文件上传功能
 */
function fileUpload() {
    let file = document.getElementById('fileinp').files[0];
    let reader = new FileReader();
    reader.readAsText(file, 'utf-8');
    console.log(reader.result);
    reader.onload = function () {
        // document.getElementById('result').innerHTML = reader.result;
        $(".input-area").val(reader.result);
        analyse();
    }
}

/**
 * 清空功能
 */
function clears() {
    $(".graph-wrapper").empty();
    $(".input-area").val('');
    $('#fileinp').val('');
}

/**
 * 文件上传辅助函数
 */
function upload() {
    $('#fileinp').click();
}