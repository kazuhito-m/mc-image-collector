#!/usr/bin/env python
# -*- coding: utf-8 -*-:q

import sys
import os
import re
import logging
import xml.etree.ElementTree as ET
from PIL import Image

TILE_SIZE = 4
TILE_HORIZONTAL_LENGTH = 176

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")


def main(argv=sys.argv):
    if len(argv) == 1:
        print("第一引数には、対象となる画像ファイルのPath(*.bin)を指定して下さい。")
        return 1

    target_file_path = argv[1]

    target_image = Image.open(target_file_path)

    scrambles = load_scramble_numbers(target_file_path)

    tile_v_len = target_image.height // TILE_SIZE
    tile_h_len = TILE_HORIZONTAL_LENGTH

    image_tiles = capture_image_tiles(target_image, tile_h_len, tile_v_len)

    unscramble_image(target_image, image_tiles, scrambles, tile_h_len, tile_v_len)

    result_image_path = make_png_file_name(target_file_path)
    target_image.save(result_image_path)

    return 0


def capture_image_tiles(base_image, tile_h_len, tile_v_len):
    image_tiles = []

    for y in range(TILE_SIZE):
        for x in range(TILE_SIZE):
            left = tile_h_len * x
            top = tile_v_len * y
            right = tile_h_len * (x + 1)
            bottom = tile_v_len * (y + 1)

            image_tile = base_image.crop((left, top, right, bottom))
            image_tiles.append(image_tile)

    return image_tiles


def unscramble_image(target_image, image_tiles, scrambles, tile_h_len, tile_v_len):
    for i, scramble_pos in enumerate(scrambles):
        x = i % TILE_SIZE
        y = i // TILE_SIZE

        left = tile_h_len * x
        top = tile_v_len * y

        hit_image_tile = image_tiles[scramble_pos]
        target_image.paste(hit_image_tile, (left, top))


def load_scramble_numbers(target_image_file_path):
    image_file_name = os.path.basename(target_image_file_path)
    xml_file_name = re.sub("_.*.bin", ".xml", image_file_name)
    xml_file_path = os.path.join(os.path.dirname(target_image_file_path), xml_file_name)

    xml_tree = ET.parse(xml_file_path)
    scramble_csv = xml_tree.getroot().find("./Scramble").text

    return [int(n) for n in scramble_csv.split(",")]


def make_png_file_name(original_image_file_path):
    image_file_name = os.path.basename(original_image_file_path)
    png_file_name = re.sub("\.bin", ".png", image_file_name)
    return os.path.join(os.path.dirname(original_image_file_path), png_file_name)


sys.exit(main())
