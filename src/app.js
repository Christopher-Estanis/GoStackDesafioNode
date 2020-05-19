const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  // TODO

  return response.status(200).send(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body

  repository = {
    id: uuid(), 
    url,
    title,
    techs,
    likes: 0
  }
  
  repositories.push(repository)

  return response.status(200).send(repository)
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params
  const { url, title, techs, likes } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(400).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }
  
  const repository = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.status(200).send(repository)
});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(400).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send({
    'message': 'Repositório deletado com sucesso!',
    'status': 'OK',
    'code': '200'
  })
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(400).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }

  ++repositories[repositoryIndex].likes

  repository = repositories[repositoryIndex]

  return response.status(200).send(repository)
});

module.exports = app;
