# Answers

Lastname:Uppal
Firstname:Srishti

## 2.2
command:sudo docker run testapp_1

## 2.3
question:ports are not opened 
command: sudo docker -i --expose:PortNumber testapp_1 // where PortNumber is the port we want to open.


## 2.5
question:This is because docker push uses the tag to identify the repository where it is supposed to push the image.
command:sudo docker login // and then I provided my login infos sudo docker tag testing srishtiuppal/devops_lab // where testing is the name of my image, srishtiuppal is my docker hub id, and devops_lab is my docker hub repository sudo docker push srishtiuppal/devops_lab

## 2.6
command:sudo docker system prune -a (this is actually more than necessary since it purges every resources)

question:"sudo docker pull srishtiuppal/devops_lab" to create a container, "sudo docker create srishtiuppal/devops_lab"

We need to use --net=host in order for the container to be able to reach localhost on the laptop since the container has its own network by default.

command:sudo docker run srishtiuppal/devops_lab

sudo docker ps -a yields: CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES 5f995d80bc82 srishtiuppal/devops_lab "/bin/sh -c 'node ..." 10 minutes ago Up 2 seconds testapp_1

command:sudo docker start -d --net=host testapp_1

## 2.7
question:we use the command "sudo docker ps -a" to get the list of containers and check that our container is started.

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES 5f995d80bc82 srishtiuppal/devops_lab "/bin/sh -c 'node ..." 13 minutes ago Up 2 minutes testapp_1
question:the name of the container is testapp_1
command:sudo docker ps -a

command:we can either rerun the image setting a new name by: sudo docker start -d --name rest_api srishtiuppal/devops_lab or rename the already existing testapp_1 container by: sudo docker rename testapp_1 rest_api_2

## 2.8
question:We can enter interactive mode by executing the following 
output: "sudo docker run -it srishtiuppal/devops_lab /bin/bash". now, using "cat /etc/*release" output: root@09a1ef804243:/# cat /etc/*release PRETTY_NAME="Debian GNU/Linux 9 (stretch)" NAME="Debian GNU/Linux" VERSION_ID="9" VERSION="9 (stretch)" ID=debian HOME_URL="https://www.debian.org/" SUPPORT_URL="https://www.debian.org/support" BUG_REPORT_URL="https://bugs.debian.org/"

## 3.1
command:sudo docker-compose up

## 3.4
command:sudo docker-compose up -d 
command: sudo docker-compose logs

