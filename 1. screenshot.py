# Crash Course Computer Science
# 这里的程序只是为了截图视频开头 00:00:00 的时间表
# 最后的输出结果：40张 jpg 图片

import os

files = [f for f in os.listdir('.') if os.path.isfile(f)]
for f in files:
    # 文件名举例： 
    # 1. 计算机早期历史-Early Computing_BiliBili.mp4
    # 23. 屏幕&2D 图形显示-Screens&2D Graphics_BiliBili.mp4
    filename = f
    filename_array = filename.split('.')
    number = filename_array[0] # 拿 1
    suffix = filename_array[-1] # 拿 mp4
    if suffix == 'mp4':
        cmd = "ffmpeg -ss 00:00:00 -i '{0}' -vframes 1 -q:v 2 {1}.jpg".format(filename, number)
        # 截图第一帧图片#
        # {0} 是 input 文件名
        # {1} 是输出的 jpg 名
        os.system(cmd) # 执行