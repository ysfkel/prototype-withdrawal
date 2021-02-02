# Withdrawal App

The project contains two directories

 - server
  - client 

## Server dependencies
   * [Node](https://nodejs.org/en/) - Node
   * [Typescript](https://www.npmjs.com/package/typescript) - Typescript

## Client dependencies
   * [Node](https://nodejs.org/en/) - Node
   * [Create React App](https://www.npmjs.com/package/create-react-app) - npm i create-react-app -g 
   

The applications displays a list of orders and also provides a search functionality.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
 
### Installing 

Clone The project 

```
git clone https://github.com/ysfkel/prototype-withdrawal
```

### Run the server 

Change directory to > server  and  run 

```
npm install 
```

```
npm start 
```

### Run the client 

Change directory to > client  and  run 

```
npm install 
```

```
npm start 
```

When the application build is done, open a web browser and navigate to:

```
http://localhost:3000/withdrawal
```
 
## Backend Server folder structure (NODEJS)

Directory name: server

The backend project follows the domain driven design project structure according 
to the following directories

* Api
   This directory contains a single file in which the rest api routes are defined

* Controllers:
   This directory contains controllers that handles the Api routes
   
* Models:
   This directory contains code that define the models

* Repository:
   This directory contains code that define the  data repositories

* Services:
   This directory contains services that handle business logic


## Application Flow
   
* User Makes a http request to widthraw some funds 
* The request hits the /withdraw route defines in api/routes
* The controller validates the user request and instantiates the service and passes the request to the service located in the service directory
* the service handles the request and returns the result to the controller 
* controller returns response to the client 


