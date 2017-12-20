## Running

To run this application, one must overwrite the env variables exposed by [`.env`](./.env). Instead of updating this file,
a better approach is to create a file called `.env.local` alonside with it (i.e. in the project root). Create-React-App
considers `.local` files as priorities over their siblings.

After creating this file and fixing the variables accordingly, we can just:

```bash
npm start
```

```bash
# build the image
docker build -t react-auth0 .

# run an instance based on this image
docker run --name react-auth0 -d -p 3000:80 react-auth0

# or attached to a network and without defining external ports
docker run --name react-auth0 --network digituz -d react-auth0
```
