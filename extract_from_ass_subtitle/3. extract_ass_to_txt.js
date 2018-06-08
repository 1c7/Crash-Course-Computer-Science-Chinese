// ass to txt
// 不写注释了，参考 2. extract_head.js 即可

const assParser = require('ass-parser');
const fs = require('fs');
const common = require('./common.js');
const path = require('path')

var result = ''
var folder = '/Users/remote_edit/Desktop/ass/' // 40 集字幕文件的文件夹

function loop_current_folder_ass_file_in_order(){
  fs.readdir(folder, (err, files) => {
    for (var i = 1; i <= 40; i++) {     // 40*40(files)=1600 loop, I know.. I know.. not the most ‘efficient’ code, but it's good enough
      files.forEach(file => {           // file == 1. 计算机早期历史-Early Computing.ass
        var number = file.split('.')[0] // number == 1
        var ext = path.extname(file);   // ext == ass
        if (parseInt(number) === i && ext === '.ass'){
          extract_main_point(folder+file, number);
        }
      });
    }
  })
}


function extract_main_point(file, number){
  var text = fs.readFileSync(file,'utf8')
  data = assParser(text);
  body = data[3]['body'];

  for (var i = 0; i <= body.length-1; i++) {
    var element = body[i];
    if (element.key == 'Dialogue') {
      if (element.value.Style == 'en - 白色'){
        var text = element.value.Text;
        text = common.remove_curly_brace_keep_text(text);
        result = result + text.trim() + '\n';
      }
      if (element.value.Style == 'zh - 黄色'){
        var text = element.value.Text;
        text = common.remove_curly_brace_keep_text(text);
        result = result + text.trim() + '\n\n';
      }
    }
  }

  // 写文件
  // if (number == 40){
    fs.writeFile(file+'.txt', result, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
  // }

  result = '';
}

// =============

loop_current_folder_ass_file_in_order();
