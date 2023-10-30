#!/bin/sh

git submodule update --init -recursive
git submodule update --remote --recursive
git add .
git commit -am "automatic submodule update" 
git push
