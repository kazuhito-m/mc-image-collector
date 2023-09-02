#!/usr/bin/env python
# -*- coding: utf-8 -*-:q

from PIL import Image, ImageFilter
import logging

TILE_SIZE = 4

logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

target_file = "./results/0000_0000.bin"
scrambles = [12, 3, 1, 15, 6, 8, 10, 4, 9, 5, 14, 13, 0, 2, 7, 11]

base_image = Image.open(target_file)
unscramble_image = Image.open(target_file)

tile_v_len = base_image.height // TILE_SIZE
tile_h_len = 176

image_tiles = []

for y in range(TILE_SIZE):
    for x in range(TILE_SIZE):
        left = tile_h_len * x
        top = tile_v_len * y
        right = tile_h_len * (x + 1)
        bottom = tile_v_len * (y + 1)

        image_tile = base_image.crop((left, top, right, bottom))
        image_tiles.append(image_tile)

# for i, image_tile in enumerate(image_tiles):
#     tile_file_name = str(i) + ".bmp"
#     image_tile.save(tile_file_name)

for i, scramble_pos in enumerate(scrambles):
    x = i % TILE_SIZE
    y = i // TILE_SIZE

    # logging.debug('x = {}'.format(x))
    # logging.debug('y = {}'.format(y))

    left = tile_h_len * x
    top = tile_v_len * y

    # logging.debug('left = {}'.format(left))
    # logging.debug('top = {}'.format(top))

    hit_image_tile = image_tiles[0]
    unscramble_image.paste(hit_image_tile, (left, top))

unscramble_image.save("result.bmp")
