## 这里是一些 Node.js 代码

## 用途
抽取 ass 字幕文件的信息       

## 说明
针对计算机速成课的 ass 字幕                
不通用（不能随便把什么 .ass 都拿来当输入），就是快速 hack 了一下写了点 node.js 代码把事情搞定     

Input: 40个 .ass 后缀的字幕文件     
Output: 看下面的说明    

`2. extract_head.js` 负责抽取40集的片头文字总结，放到一个文件中（结果：1个 .md 文件）        
`3. extract_ass_to_txt.js` 把 ass 转成 txt （结果：40个 .txt 文件）       
