#!/usr/bin/env bash

# Since I'm usually running these on a clean (new) system the repo
# links need to be updated (otherwise some packages will fail)
apt-get update

# ssh for easier command line (already done by vagrant?)
apt-get -y install openssh-server openssh-client

# Git for source code version control
apt-get -y install git

# Mkdocs for documentation
apt-get -y install python python-pip
pip install mkdocs

# Pandoc with PDF support (warning: huge)
#sudo apt-get -y install pandoc
#sudo apt-get -y install texlive

# Nodejs (symbolic link fixing naming conflict)
apt-get -y install nodejs npm
ln -s /usr/bin/nodejs /usr/bin/node

# Mocha testing + Istanbul code coverage
npm install -g mocha
npm install -g istanbul

# Jshint code style/quality checker
# http://jshint.com/docs/options/
npm install -g jshint

# ---------------------------------- Cloud9 web-based development enviornment - 

# Install
git clone https://github.com/ajaxorg/cloud9.git /opt/cloud9
cd /opt/cloud9
npm install

# Make sure it is owned by vagrant (not root)
chown -R vagrant:vagrant /opt/cloud9

# Fix the config file (it crahses if mercurial is not installed so we remove
# any lines relating to mercurial (assuming those lines have an 'hg' on them))
sed -i -e 's_^.*hg.*__g' /opt/cloud9/configs/default.js

# Start cloud9 server
# /opt/cloud9/bin/cloud9.sh -w /vagrant -l 0.0.0.0 -p 3131

# Create an Upstart config file that starts cloud9 on boot
cat << 'EOF' > /etc/init/vagrant.cloud9.conf

description "Cloud9 Server in Vagrant"
author      "Andrew Ippoliti"

start on local-filesystems
stop on shutdown

# Automatically Respawn:
respawn
respawn limit 10 5

script
	/opt/cloud9/bin/cloud9.sh -w /vagrant -l 0.0.0.0 -p 3131
end script

EOF

# Start the cloud9 service
service vagrant.cloud9 start

# -------------------------------------------------------- Simple HTTP Server - 
# Just needs python to run. I'll just create a script that starts it at boot

cat << 'EOF' > /etc/init/vagrant.server.conf

description "Simple HTTP Server in Vagrant"
author      "Andrew Ippoliti"

start on local-filesystems
stop on shutdown

# Automatically Respawn:
respawn
respawn limit 10 5

script
	cd /vagrant
	python -m SimpleHTTPServer 8080
end script

EOF

# Start the simple http server service
service vagrant.server start
