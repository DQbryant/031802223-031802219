function analyse() {
    try {
        $(".graph-wrapper").empty()
        // throw new Error('error');
        var text = $(".input-area").val();
        var trees = text.split('\n\n\n');
        console.log(trees.length)
        trees.forEach((treeText) => {
            let lines = treeText.split('\n');
            let data = new Object();
            let map = new Map();
            data.name = lines[0];
            if (lines[0].slice(0, 2) !== '导师') {
                throw new Error('ERROR: 导师行不正确,请注意每组数据之间有两行空行');
            }
            data.children = new Array();
            console.log(lines.length);
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '') continue;
                if (!isNaN(lines[i].slice(0, 4))) {
                    var children = new Object();
                    children.name = lines[i].split('：')[0];
                    children.children = new Array();
                    lines[i].split('：')[1].split('、').forEach(item => {
                        var t = new Object();
                        t.name = item;
                        t.value = '暂无';
                        children.children.push(t);
                        map.set(item, t);
                    })
                    data.children.push(children);
                } else {
                    let [name, skill] = lines[i].split('：')
                    if (!skill) {
                        throw new Error('ERROR: 技能轨迹输入不正确');
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
            var texs = jQuery.parseJSON(JSON.stringify(data));

            console.log(texs);
            let graphlist = document.getElementsByClassName("graph");
            let graphDom = graphlist[graphlist.length - 1];
            var myChart = echarts.init(graphDom);
            // this.chartssize(document.getElementById(chartPid),myChartId);
            myChart.clear();
            myChart.setOption(option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    formatter: (item) => {
                        return item.value;
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                series: [{
                    type: 'tree',

                    data: [texs],

                    // top: '1%',
                    // left: '7%',
                    // bottom: '1%',
                    // right: '5%',

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
        const errorDom = '<div class="graph" style="width: 100%;height:350px;margin-top: 20px;color: red">' + error
            .message + '</div>';
        $(".graph-wrapper").append(errorDom);
        return;
    }

}