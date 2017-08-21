# Bold Leads Serverless Framework AWS Lambda MySQL Boilerplate
## v0.1 - [View Repository]
(https://github.com/boldleadsdevelopment/serverless-aws-lambda-mysql-boilerplate)


## Synopsis

Use this repository as a starting point for connecting AWS Lambda & API Gateway
to a MySQL database using the Serverless Framework.


## Requirements

* Serverless
* Node
* NPM
* Babel
* Webpack


## Stages

* **Dev** is for testing development work and is based on the **master** code
  branch
* **Staging** is for testing stable code prior to moving into production and is
  based on the **staging** branch, which should **only merge changes from master**
* **Production** is for official, production ready, tested code and is based on
  the **production** branch, which should **only merge changes from staging**


## Endpoints

* Mapped: [h/api] ()
* Production: [i] ()
* Staging: [j] ()
* Dev: [k] ()


### Example Request Parameters

* `?x=x&y=y&z=z`


## TODOs

*


## Ideas

*


## Caveats

*


## Contributors



## Contributing

The primary development branch is **master**.  Fork our main repository and
follow the GitFlow model, then submit pull requests when your code is tested
and ready to be merged into primary development branch.

Do not submit pull requests against, or make modifications in, staging or
production.

### Workflow

* Make sure you have git, node, npm and serverless installed
* Make sure your AWS credentials are configured
* Clone the repository
* Run `npm install` to download and install the dependencies
* Run `serverless webpack && serverless webpack serve` and load
  http://localhost:8000 and make sure it works as expected (this is the dev
  branch, it may be in development status)
* Edit `handler.js` which is where the actual function code is located
* Use the local web server to test your changes as you work, but take note that
  it is reading from the production database
* When you are happy with your changes and all files are saved:
  - Bump the semver version numbers appropriately in package.json and handler.js
  - `git add -A .`
  - `git commit -m "Describe your changes here"
  - `git tag vX.Y.z` # Where X.Y.z is the semver, ie; v2.0.1
  - `git push` # Push this into AWS CC where it will **automatically** be built and
    deployed!
* Panda dance!


## Resources Consumed

XXX

### IAM

XXX


## Links to AWS Resources Utilized

* XXX


## Links to Documentation

* XXX
