<h1>Project Social Network - Trainee SysMap Full Stack 2ª Ed </h1>

> Status: Developing ⚠️

## Modules:

+ [Back-end API](https://github.com/bc-fullstack-02/alexandre-siqueira/tree/main/backend)
+ [Front-end web](https://github.com/bc-fullstack-02/alexandre-siqueira/tree/main/frontend/web)
+ [Mobile](https://github.com/bc-fullstack-02/alexandre-siqueira/tree/main/frontend/mobile)

## Technologies Used:

<table>
  <tr>
    <td>Node.js</td>
    <td>Express.js</td>
    <td>MongoDB</td>
    <td>Rabbitmq</td>
    <td>Minio</td>
    <td>Docker</td>
  </tr>
  <tr>
    <td>18.12.1</td>
    <td>4.18.2</td>
    <td>latest</td>
    <td>3.11</td>
    <td>latest</td>
    <td>20.10.21</td>
  </tr>
</table>

### Frontend Web:

<table>
  <tr>
    <td>Typescript</td>
    <td>React</td>
    <td>Vite</td>
    <td>Tailwind</td>
  </tr>
  <tr>
    <td>4.6.4</td>
    <td>18.2.0</td>
    <td>3.2.3</td>
    <td>3.2.4</td>
  </tr>
</table>

### Mobile:

<table>
  <tr>
    <td>Typescript</td>
    <td>React Native</td>
  </tr>
  <tr>
    <td> ^4.6.3 </td>
    <td> 0.70.5 </td>
  </tr>
</table>

## How to run the application:

1) clone the project: 
```
git clone https://github.com/bc-fullstack-02/alexandre-siqueira
```
2) go to *API* directory in *backend* directory
3) install back-end dependencies:
```
npm install
```
4) start the server and the services:
```
docker-compose up -d
```
*in case of server error, repeat `docker-compose up -d` after the services are successfully running

5) go to *Parrot Social Network* directory in *frontend* directory, after *web*
6) install front-end dependencies:
```
npm install
```
7) start the front-end
```
npm run dev
```
8) access browser url: 
- Web Application: http://localhost:5173
- Api Swagger Documentation: http://localhost:4000/api-docs/

## Author

- [@aspli](https://github.com/aspli)


## Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aspli/)


