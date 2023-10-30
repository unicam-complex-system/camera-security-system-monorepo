#!/bin/sh

git submodule update --init --recursive
git pull --recurse-submodules 
git add .
git commit -am "automatic submodule update" 
git push
