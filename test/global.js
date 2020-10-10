
function parse(treeText) {
    // console.log(4235235)
    let lines = treeText.split('\n');
    let data = new Object();
    let map = new Map();
    data.name = lines[0];
    if (lines[0].slice(0, 2) !== '导师') {
        throw new Error('ERROR: 导师行不正确,请注意每组数据之间有两行空行');
    }
    data.children = new Array();
    // console.log(lines.length);
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '') continue;

        if (!isNaN(lines[i].slice(0, 4))) {
            var children = new Object();
            // console.log(lines[i])
            if (lines[i].split('：').length <= 1 || (lines[i].search('级博士生|级硕士生|级本科生')) == -1) {
                throw new Error('ERROR: 学生信息解析不正确');
            }
            children.name = lines[i].split('：')[0];
            children.children = new Array();
            // console.log(lines[i]);
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
                throw new Error('ERROR: 节点技能输入不正确');
            }
            if (!map.get(name)) {
                throw new Error("学生 " + name + "不存在")
            }
            map.get(name).value = skill;
        }

    }
    // console.log(data);

    return data;
}



module.exports = {
    parse
}