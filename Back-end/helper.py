import flower_info
import image_paths
import cv2
import base64

def get_rand_colors(num):
    import random

    COLORS = ["navy", "blue", "aqua", "teal", "olive", "green", "lime", "yellow", "orange", "red", "maroon", "fuchsia", "purple", "black", "gray" ,"silver"]
    rand_colors = []
    
    for i in range(0, num):
        k = random.randint(0, len(COLORS) - 1)
        rand_colors.append(COLORS[k])

    return rand_colors

def get_flower_info(list_id):
    list_info = [   flower_info.chanhleo, 
                    flower_info.chidai,
                    flower_info.dambut,
                    flower_info.hoahong,
                    flower_info.huongduong,
                    flower_info.thuocduoc,
                    flower_info.cucdai
                ]

    return [list_info[i] for i in list_id]

def get_images(list_id):
    res_imgs = []
    imgs = [
                image_paths.chanhleo,
                image_paths.chidai,
                image_paths.dambut,
                image_paths.hoahong,
                image_paths.huongduong,
                image_paths.thuocduoc,
                image_paths.cucdai
           ]

    for i in list_id:
        image = cv2.imread(imgs[i])
        retval, buffer = cv2.imencode('.png', image)
        jpg_as_text = base64.b64encode(buffer)
        restext = jpg_as_text.decode(encoding='UTF-8')

        res_imgs.append(restext)

    return res_imgs