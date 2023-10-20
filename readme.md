<a href = "/">
    <h1>S3 With Express and MongoDB.</h1>
</a>

<p >
  <a href="#description"><strong>Description</strong></a> ·
  <a href="#walkthrough"><strong>Walkthrough</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
</p>
<br/>

## Description

Simple S3 setup with mongo integration and express server.


## Walkthrough



## Running locally

You will need to have the necessary environment variables setup in your `.env` file.
This include keys for your MongoDB URI, AWS Access Key and Secret, S3 Bucket name and S3 Bucket region. 
    
```bash
MONGO_URI = 
DB_NAME = 
ACCESS_KEY_ID = 
SECRET_ACCESS_KEY = 
BUCKET_NAME = 
BUCKET_REGION = 
```

1. Install run: `npm i`
2. Make a new `.env` file.
3. Populate the `.env` file with the necessary environment variables.

```bash
npm run dev
```

Your app template should now be running on [localhost:1337](http://localhost:1337/).

## Running locally with docker

```bash
docker login
docker pull korebhaumik/amd-s3.
docker run -d -p 1337:1337 -e MONGO_URI="" -e DB_NAME="" -e ACCESS_KEY_ID="" -e SECRET_ACCESS_KEY="" -e BUCKET_NAME="" -e BUCKET_REGION="" --name s3-server korebhaumik/amd-s3
```

> Note: If the docker image is not available (repo is privated), you can build it locally by running `docker build -t amd-s3 .` in the root directory of the project.