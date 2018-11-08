#!/bin/bash

sudo docker build -t monitor .
sudo docker tag monitor randrades/monitor:3.3.0
sudo docker push randrades/monitor:3.3.0