##############################

LAB1

##############################

There are 2 client server applications :
1) Calculator 
2) DropBox

1) For Calculator app

Recomanded IDE is westrome

Node : cd nodelogin 
npm install
npm start

React : cd reactlogin
npm install
npm start

Recomanded IDE is westrome

Node : cd nodelogin
npm install
npm start

React: cd reactlogin
npm install
npm start

Note :
1) Database connection is there in Dropbox application
2) To run the Application
	change database properties in mysql.js in nodelogin
	
##############
LAB2
##############

There are 3 seperate directories:

1)node
cd node
npm init
node server

2)react
cd react
npm install
npm start

3)kafka-back-end
cd kafka-back-end
npm install
npm start

Notes:
1. add/edit below properties to server.properties in kafka config file:
# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=104857600

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=104857600

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600
fetch.max.message.bytes=104857600
replica.fetch.max.bytes=1048576000
message.max.bytes=104857600

2. change username and password in share.js in routes in kafka-back-end

3. Topics to be created in Kafka:

 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic upload_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic userlogs_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic getfiles_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic createdir_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic deletefile_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic star_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic unstar_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic saveprofile_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic getprofile_topic
 bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic check_mail_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic create_group_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic add_member_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic remove_memver_topic
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic share_group_topic
