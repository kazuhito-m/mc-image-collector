# -*- coding: utf-8 -*-:q

import sys
import os
import re
import glob
import logging
import xml.etree.ElementTree as ET
from PIL import Image

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")


def main(argv=sys.argv):
    if len(argv) == 1:
        print("第一引数には、対象となるXMLと画像ファイルのフォルダPathを指定して下さい。")
        return 1

    target_dir_path = argv[1]

    for xml_file_path in glob.glob(os.path.join(target_dir_path, "*.xml")):
        xml_root = ET.parse(xml_file_path).getroot()
        x = int(xml_root.find("./Sheet/X").text)
        y = int(xml_root.find("./Sheet/Y").text)

        if x == 1 and y == 1:
            src_path = re.sub("\.xml", "_0000.png", xml_file_path)
            dest_path = re.sub("\.xml", ".png", xml_file_path)
            os.rename(src_path, dest_path)
            continue

        merge_width = 0
        merge_height = 0

        images = load_devided_images(xml_file_path, x * y)
        for i, image in enumerate(images):
            if i < x:
                merge_width += image.width
            if i % x == 0:
                merge_height += image.height

        logging.debug("merged:width,height = {},{}".format(merge_width, merge_height))

        merged_image = merge_devided_images(images, merge_width, merge_height, x)

        merged_image_file_path = re.sub("\.xml", ".png", xml_file_path)
        merged_image.save(merged_image_file_path)

        for src_image in images:
            os.remove(src_image.filename)

    return 0


def load_devided_images(xml_file_path, image_count):
    images = []
    for i in range(image_count):
        image_file_suffix = "_" + str(i).zfill(4) + ".png"
        image_file_path = re.sub("\.xml", image_file_suffix, xml_file_path)

        image = Image.open(image_file_path)
        images.append(image)
    return images


def merge_devided_images(images, width, height, x):
    merged_image = Image.new("RGB", (width, height), (0, 0, 0))

    left = 0
    top = 0
    for i, src_image in enumerate(images):
        if i % x == 0:
            left = 0

        merged_image.paste(src_image, (left, top))

        left += src_image.width
        if (i + 1) % x == 0:
            top += src_image.height

    return merged_image


sys.exit(main())
