#! /bin/bash

echo 'executing: ejabberdctl start'
#/opt/ejabberd-22.05-3-g3449621cc/bin/ejabberd daemon 
ejabberdctl start

echo 'sleeping for 15secs...'
sleep 15

echo 'executing:  ejabberdctl register admin localhost password' 
ejabberdctl register admin localhost password

echo 'sleeping for 2secs...'
sleep 2

echo 'executing:  ejabberdctl register peter localhost password' 
ejabberdctl register peter localhost password

echo 'sleeping for 2secs...'
sleep 2

echo 'executing:  ejabberdctl register samuel localhost password' 
ejabberdctl register samuel localhost password

echo 'executing: node nodejs/nproxy.js'
node nodejs/server.js
#exec "$@"
