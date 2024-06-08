# Universal Bloomreach

A central application to handle Bloomreach needs for client-side across all brands and all stores. The intent is replace the multiple serverless functions stored in AWS as all their functionaility can be consolidated into this singular application. This fulfills the role of a backend server.

Documentation of endpoints can be found [here](https://documenter.getpostman.com/view/20530129/2s93zCYfUP)

## Description

* Has endpoints that can be utilized across brands to retrieve customer properties and marketing consents
* Can send customer events and properties to Bloomreach
* The payload can be customized to meet the needs of a developer to only retrieve specified properties and consents
* Outputs the data received into a more digestible format to be used by front-end developers
* It can use a phone number, email and even the Exponea cookie (which endures in incognito mode) to identify a user in Bloomreach
* Retrieves a Shopify account with either email or phone
* Has the capability to identify a primary Shopify account and merge duplicate accounts into the primary
* Updates the marketing consets of a Shopify account
## Getting Started

### Dependencies

* aws-serverless-express: library for running Express.js application serverless, using Amazon Web Services (AWS) Lambda and API Gateway for rapid deployments

* body-parser: middleware for handling HTTP POST requests in Express.js

* cors: enable Cross-Origin Resource Sharing

* crypto: provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

* dotenv:  loads environment variables for switching between different environments

* express: a web application framework for Node.js. Provides a set of middleware functions for handling HTTP requests and responses

* node-fetch: to use the Fetch API in Node.js

### Installing

1. Install dependencies on local environment
```
npm install
```

2. Ensure the region is set to us-west-2 in serverless.yml
```
provider:
  name: aws
  runtime: nodejs14.x
  region: us-west-2
```


### Executing program

### Deploying

run the following command in terminal
```
sls deploy
```
## Debugging
1. Go to AWS Cloudwatch
2. Find log group: universal-bloomreach-dev-api
3. run query to filter the events of a particular user:
```
fields @timestamp, @message
| filter @message like /{{user.email}} - /
| sort @timestamp desc
| limit 20
```
## Potential Future Updates
* confirm stability of account merge

## Authors

* [@Daryl Blancaflor](dblancaflor@arch-cos.com), formally dblancaflor@olukai.com

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

## Acknowledgments
