# Deploying React Client on Digituz

## Creating Digituz Network

First, we need to create a Docker network for Digituz microservices:

```bash
DIGITUZ_NETWORK=digituz

docker network create $DIGITUZ_NETWORK
```

## Cloning the Repository

```bash
git clone https://github.com/brunokrebs/react-auth0.git ~/git/react-client
cd ~/git/react-client
```

## Creating Docker Instance

```bash
# build the image
docker build -t react-client .

# run it attached to Digituz network
docker run --name react-client --network digituz -d react-client
```
