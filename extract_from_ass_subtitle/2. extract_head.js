const assParser = require('ass-parser');
const fs = require('fs');
const common = require('./common.js');
const path = require('path')

/*
2018-6-8 周五 03:42

1. 是什么：
  从 40 个 .ass 字幕文件中提取片头文字（共2行字幕，字幕样式名统一）
  仅针对 [计算机科学速成课] Crash Course Computer Science

2. 使用方法：
  node 2.\ extract_head.js

3. 备注：
  所有40集 ass 字幕文件，要和这个脚本放到同一个目录下
  文件命名必须类似：1. 计算机早期历史-Early Computing.ass
  1. 开头
  .ass 结尾
  因为我们要按顺序读取

  代码是半夜2点写的，目的是快速 hack 出来，
  所以有些代码不是最“高效”的（比如循环很多次）就不要吐槽啦，管用就好
*/

var result = '' // 存临时结果
var final_result = ''; // 存最终结果

var folder = '/Users/remote_edit/Desktop/ass/'

// 循环当前目录下的 ass 文件，按 1，2，3，4...一直到 40 这样的顺序
function loop_current_folder_ass_file_in_order(){
  fs.readdir(folder, (err, files) => {
    for (var i = 1; i <= 40; i++) {     // 40*40(files)=1600 loop, I know.. I know.. not the most ‘efficient’ code, but it's good enough
      files.forEach(file => {           // file == 1. 计算机早期历史-Early Computing.ass
        var number = file.split('.')[0] // number == 1
        var ext = path.extname(file);   // ext == ass
        if (parseInt(number) === i && ext === '.ass'){
          extract_main_point(file, number);
        }
      });
    }
  })
}

// 抽取重点出来，那两行字幕的样式在全部40集中都是统一的，叫'备注 - 主题'和'这一集的名字'
function extract_main_point(file, number){
  var text = fs.readFileSync(file,'utf8')
  data = assParser(text);
  body = data[3]['body'];

  for (var i = 0; i <= body.length-1; i++) {
    var element = body[i];
    if (element.key == 'Dialogue') {
      if (element.value.Style == '这一集的名字'){
        var text = element.value.Text;
        text = common.remove_curly_brace_keep_text(text);
        // console.log(text);
        result = result + '## ' + text + '\n';
      }
    }
  }

  for (var i = 0; i <= body.length-1; i++) {
    var element = body[i];
    if (element.key == 'Dialogue') {
      if (element.value.Style == '备注 - 主题'){
        var text = element.value.Text;
        text = common.remove_curly_brace_keep_text(text);
        // console.log(text);
        result = result + text.replace(/\\N/g, '\n') + '\n\n\n';
      }
    }
  }


  // 如果到了最后一集
  if (number == 40){
    // 清理两边空格（trim)，然后末尾加俩空格作为 markdown 换行
    var line_array = result.split('\n');
    line_array.forEach(l => {
      final_result = final_result + l.trim() + '  ' + '\n';
    })
    // 处理 HTML entity
    final_result = common.convertHTML(final_result);
    // 写文件
    fs.writeFile("CS_40episode_point.md", final_result, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
  }
}

// =============

loop_current_folder_ass_file_in_order();
