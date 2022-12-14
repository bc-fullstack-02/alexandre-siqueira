<h1>Project Social Network - Trainee SysMap Full Stack 2ª Ed </h1>

> Status: Developing ⚠️

## Modules:

+ Backend - API 
+ Frontend - WEB
+ Frontend - MOBILE

## Technologies Used in Backend API:

<table>
  <tr>
    <td>NodeJS</td>
    <td>MongoDB</td>
    <td>Rabbitmq</td>
    <td>Minio</td>
    <td>Docker</td>
  </tr>
  <tr>
    <td>19.2.0</td>
    <td>6.0.3</td>
    <td>3.8</td>
    <td>latest</td>
    <td>20.10.21</td>
  </tr>
</table>

## How to run the application:

1) create directory for project: mkdir app
2) move for diretory created: cd app
3) git clone https://github.com/bc-fullstack-02/alexandre-siqueira.git or git@github.com:bc-fullstack-02/alexandre-siqueira.git
4) move for directory backend: cd backend
5) run command: npm install
6) run command: docker-compose up
7) access browser url: http://localhost:4000/api-docs/

## Addictional implementations:
1) add route Unlike in Posts -> /v1/posts/:id/unlike
2) add route Unlike in Comments -> /v1/:postId/comments/:id/unlike
3) When deleting User, I added profile deletion
4) add method put in route profiles, for updates on frontend
5) add field image and imageUrl in profile model

