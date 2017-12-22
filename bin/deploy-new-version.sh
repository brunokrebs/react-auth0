#!/bin/bash

cat package.json | grep "\"name\": \"react-auth0\""
if [ $? -eq 0 ]
then
  git pull
  docker build -t react-auth0 .
  docker stop react-client
  docker rm react-client
  docker run --name react-client --network digituz -d react-auth0
fi
