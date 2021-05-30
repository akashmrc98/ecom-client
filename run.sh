docker build -t ecom-client .
docker run --name ecom-client-runner -d -p 4201:80 ecom-client