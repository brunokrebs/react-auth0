#!/bin/bash

cat package.json | grep "\"name\": \"react-auth0\""
if [ $? -eq 0 ]
then
  git pull
  docker build -t react-auth0 .
  docker stop react-auth0
  docker rm react-auth0
  docker run --name react-auth0 --network digituz -d react-auth0
fi
