#!/usr/bin/env python
# -*- coding: utf-8 -*-:q

import sys
import logging
from argparse import ArgumentParser
from PIL import Image

TILE_SIZE = 4
TILE_HORIZONTAL_LENGTH = 176

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")

parser = ArgumentParser(
    prog="unscramble_image", description="とある軽度な暗号化がされている画像を定義ファイルを元に復元する。"
)


def main(argv=sys.argv):
    args = parser.parse_args()

    target_file = "./results/0000_0000.bin"
    scrambles = [12, 3, 1, 15, 6, 8, 10, 4, 9, 5, 14, 13, 0, 2, 7, 11]

    target_image = Image.open(target_file)

    tile_v_len = target_image.height // TILE_SIZE
    tile_h_len = TILE_HORIZONTAL_LENGTH

    image_tiles = capture_image_tiles(target_image, tile_h_len, tile_v_len)

    unscramble_image(target_image, image_tiles, scrambles, tile_h_len, tile_v_len)

    target_image.save("result.png")


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


main()
