#!/bin/sh
# Scriptacular - yuijs.sh
# JavaScript file compression & obfuscation with yuicompressor
# Copyright 2013 Christopher Simpkins
# MIT License

# Modify YUI_PATH below with the path to your yuicompressor jar file
YUI_PATH="yuicompressor-2.4.8.jar"
JS="js/src"
FILELIST="minify.$$.tmp"
MIN_FILE="$JS/tryptique-min.js"
EXCLUDES="ev_*"

rm -rf $MIN_FILE;

# Minify JS to multiple files
find $JS -type f \( -iname "*.js" ! -iname $EXCLUDES \) | grep -v min > $FILELIST
while read LINE
do
  OLD="$LINE"
  NEW=`echo "$LINE" | sed 's/.js/.min.js/g'`
  echo "$OLD -> $NEW"
  java -jar $YUI_PATH $OLD > $NEW
  cat $NEW >> $MIN_FILE;
  rm -rf $NEW;
done < $FILELIST

rm -f $FILELIST