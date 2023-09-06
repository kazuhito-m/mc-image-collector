#!/bin/bash

set -eu

THIS_SCRIPT_DIR=$(cd $(dirname $(readlink $0 || echo $0)); pwd -P)
MERGE_IMAGE_SCRIPT_PATH=${THIS_SCRIPT_DIR}/merge_sprlit_images.py

SCRAMBLE_IMAGE_DATA_PATH=scramble_image_chunk.js

WORK_DIR=./work
RESULT_DIR=./results

# --- check preconditions ---

if [ $# != 1 ]; then
  echo "引数には「ビューアを表示した時に保存したHTMLファイル(*.html)」のPathを指定して下さい。"
  exit 1
fi

html_file=${1}

if [ -f ${html_file} ]; then
  echo "ファイルの存在を確認: ${html_file}"
else
  echo "指定されたファイルが存在しません。 ${html_file}"
  exit 1
fi

# --- main ---

rm -rf ${RESULT_DIR}
rm -rf ${WORK_DIR}
mkdir ${WORK_DIR}

cat ${html_file} \
  | sed 's/^ *//g' \
  | sed 's/\t/  /g' \
  | sed -z 's/\n/<cr>/g' \
  | sed 's/.*<\/div><cr><script>//' \
  | sed 's/<\/script>.*//' \
  | sed 's/<cr>/\n/g' \
  | sed -z 's/;\n\n/;\n/g' \
  > ${WORK_DIR}/${SCRAMBLE_IMAGE_DATA_PATH}

npm run all ${WORK_DIR}/${SCRAMBLE_IMAGE_DATA_PATH}

mkdir -p ${RESULT_DIR}
mv ${WORK_DIR}/????.jpg ${RESULT_DIR} 
rm -rf ${WORK_DIR}

final_dir_path=$(echo ${html_file} | sed 's/\.[Hh][Tt][Mm]l*$//g')
mv ${RESULT_DIR} ${final_dir_path}

echo "取得並びに変換処理が終了しました。 ${final_dir_path} を確認して下さい。"
exit 0
