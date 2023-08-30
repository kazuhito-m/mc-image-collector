#!/usr/bin/env python
# -*- coding: utf-8 -*-:q

from PIL import Image, ImageFilter

TILE_SIZE = 4

img = Image.open("./results/0000_0000.bin")

tile_v_len = 176
tile_h_len = img.height / TILE_SIZE

for i in range(TILE_SIZE):
    for j in range(TILE_SIZE):
        left = tile_v_len * i
        top = tile_h_len * j
        right = tile_v_len * (i + 1)
        bottom = tile_h_len * (j + 1)

        img_roi = img.crop((left, top, right, bottom))

        file_name = str(i) + "_" + str(j) + ".bmp"
        img_roi.save(file_name)

