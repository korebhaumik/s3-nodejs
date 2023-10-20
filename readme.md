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

Hosted Server link is [ec2-13-234-232-157.ap-south-1.compute.amazonaws.com:1337](http://ec2-13-234-232-157.ap-south-1.compute.amazonaws.com:1337)

## Walkthrough

S3 can be accessed on '/addItem' route.
The appropriate format should be like this:
<img width="446" alt="image" src="https://github.com/korebhaumik/s3-nodejs/assets/106856064/83254ee6-e37d-4539-b053-081544803ed5">


- username and metadata fields are optional and can be omitted.
- file is a required field.

<img width="447" alt="image" src="https://github.com/korebhaumik/s3-nodejs/assets/106856064/df783979-9143-42cd-b8c9-048ed3f4491a">


- response object should be something like this.

<img width="747" alt="image" src="https://github.com/korebhaumik/s3-nodejs/assets/106856064/12a1965e-cc2f-403c-8e1a-f5ae3819c149">

-file ka url is also saved in the db.


> Note: File types supported are '.png', '.jpeg', '.jpg', '.txt', '.pdf'. File Size Limit is 10MB.


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
