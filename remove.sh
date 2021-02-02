docker system prune
docker rmi $(docker images -a)
docker rmi $(docker images -a -q)
docker rm $(docker ps -a -f status=exited -q)
docker rm $(docker ps -a -f status=created -q)
docker rm $(docker ps -a -f -q)
docker rm $(docker ps -a -f -q)