#!/bin/bash

set -eu

THIS_SCRIPT_DIR=$(cd $(dirname $(readlink $0 || echo $0)); pwd -P)
UNSCRAMBLE_SCRIPT_PATH=${THIS_SCRIPT_DIR}/unscramble_image.py
MERGE_IMAGE_SCRIPT_PATH=${THIS_SCRIPT_DIR}/merge_sprlit_images.py

WORK_DIR=./work
RESULT_DIR=./results

# --- check preconditions ---

if [ $# != 1 ]; then
  echo "引数には「Chromeの通信履歴のファイル(*.har)」のPathを指定して下さい。"
  exit 1
fi

har_file=${1}

if [ -f ${har_file} ]; then
  echo "ファイルの存在を確認: ${har_file}"
else
  echo "指定されたファイルが存在しません。 ${har_file}"
  exit 1
fi

# --- main ---

rm -rf ${RESULT_DIR}
rm -rf ${WORK_DIR}
mkdir ${WORK_DIR}

grep "\"url" ${har_file} | grep "m_hai.php?file=0" | sed 's/^.*url": "//g' | sed 's/",$//g' | sort | uniq >${WORK_DIR}/urls.txt

cd ${WORK_DIR}

for i in $(cat ./urls.txt); do
  file_name=$(echo ${i} | sed 's/^.*\?file\=//g' | sed 's/\&.*$//g')
  echo "now download ${file_name} ..."
  curl --output ${file_name} ${i}
done

for image_file_path in $(ls *.bin); do
  echo "${image_file_path} ファイルを変換中..."
  ${UNSCRAMBLE_SCRIPT_PATH} ${image_file_path}
done

${MERGE_IMAGE_SCRIPT_PATH} .

cd ..
mkdir ${RESULT_DIR}

mv ${WORK_DIR}/*.png ${RESULT_DIR}

rm -rf ${WORK_DIR}

final_dir_path=$(echo ${har_file} | sed 's/.har$//g')
mv ${RESULT_DIR} ${final_dir_path}

echo "取得並びに変換処理が終了しました。 ${final_dir_path} を確認して下さい。"
exit 0
