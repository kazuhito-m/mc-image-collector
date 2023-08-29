#!/bin/bash

har_file=${1}

grep "\"url" ${har_file} | grep "m_hai.php?file=0" | sed 's/^.*url": "//g' | sed 's/",$//g' > ./urls.txt

rm -rf ./result
mkdir ./result
mv ./urls.txt ./result
cd ./result

for i in $(cat ./urls.txt) ; do
  file_name=$(echo ${i} | sed 's/^.*\?file\=//g' | sed 's/\&.*$//g')
  echo "now download ${file_name} ..."
  curl --output ${file_name} ${i}
done

