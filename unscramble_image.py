#!/usr/bin/env python
# -*- coding: utf-8 -*-:q

from PIL import Image, ImageFilter

TILE_SIZE = 4

target_file = "./results/0000_0000.bin"

base_image = Image.open(target_file)
unscramble_image = Image.open(target_file)

tile_v_len = 176
tile_h_len = base_image.height / TILE_SIZE

image_tiles = [[],[],[],[]]

for i in range(TILE_SIZE):
    for j in range(TILE_SIZE):
        left = tile_v_len * i
        top = tile_h_len * j
        right = tile_v_len * (i + 1)
        bottom = tile_h_len * (j + 1)

        image_tile = base_image.crop((left, top, right, bottom))
        image_tiles[i].append(image_tile)

        file_name = str(i) + "_" + str(j) + ".bmp"
        image_tiles[i][j].save(file_name)
