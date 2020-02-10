<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
    Kit-nodejs-ultra - project on nest framework, this project work on typescript and separated on layers and based on ddd principles 
    <ul>
        <li>Application layer - responsible for web application and provides a restful API</li>
        <li>Domain layer - responsible for business logic and contains interfaces for work with database or other storages also contains entities and value objects</li> 
        <li>Infrastructure layer - responsible for implementation of interfaces in domain layer</li>
    </ul>
</p>

<p align="center">
    This project was design according DDD (Domain Driven Design) architect pattern. The main business entity was defined as "Car", "Owner" and "Manufacture" was defined as Value-Object of "Car" aggregation root.
    Following DDD concept, the business logic was implemented independently of any specific software solutions (DBs, ORMs, and etc.) and give us flexibility to choose it later.
</p>

<p align="center">
    Technology stack:
    <ul>
        <li>Typescript - primary language</li>
        <li>Nest - application framework</li>
        <li>Docker - virtualization tool</li>
    </ul>   
</p>
    

## Installation

```bash
$ cd domain && npm install && cd ../infrastructure && npm i && cd ../application && npm install && cd ..
```

## Running the app
### < development mode >
```bash
$ cd application
$ node build
$ npm run start
```

###< production mode >
```
$ cd application
$ npm run build:prod
$ npm run start
```

## Test
###< unit tests >
```bash
$ cd application
$ npm run test
```

###< integrations tests >
```
$ cd application
$ npm run test:integrations
```

###< test coverage >
```
$ cd application
$ npm run test:cov
```

## Build Docker image

```bash
$ cd application
$ npm run build:prod
$ docker build -t kit-nodejs-ultra .
```
