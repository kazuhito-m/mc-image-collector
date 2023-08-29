#!/bin/bash

WORK_DIR=./results

har_file=${1}

grep "\"url" ${har_file} | grep "m_hai.php?file=0" | sed 's/^.*url": "//g' | sed 's/",$//g' > ./urls.txt

rm -rf ${WORK_DIR}
mkdir ${WORK_DIR}
mv ./urls.txt ${WORK_DIR}
cd ${WORK_DIR}

for i in $(cat ./urls.txt) ; do
  file_name=$(echo ${i} | sed 's/^.*\?file\=//g' | sed 's/\&.*$//g')
  echo "now download ${file_name} ..."
  curl --output ${file_name} ${i}
done

