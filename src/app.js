const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const likes = []

app.get("/repositories", (request, response) => {
  // TODO

  return response.status(200).send({
    'message': 'Repositórios listados com sucesso!',
    'status': 'OK',
    'code': '200',
    repositories
  })
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body

  repository = {
    id: uuid(), 
    url,
    title,
    techs
  }
  
  repositories.push(repository)

  return response.status(201).send({
    'message': 'Repositório criado com sucesso!',
    'status': 'CREATED',
    'code': '201',
    repository: {
      url,
      title,
      techs
    }
  })
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const { url, title, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(404).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }
  
  const repository = {
    url,
    title,
    techs
  }

  repositories[repositoryIndex] = repository

  return response.status(200).send({
    'message': 'Repositório atualizado com sucesso!',
    'status': 'OK',
    'code': '200',
    repository
  })
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(404).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(200).send({
    'message': 'Repositório deletado com sucesso!',
    'status': 'OK',
    'code': '200'
  })
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0) {
    return response.status(404).send({
      'message': 'Repositório não encontrado!',
      'status': 'NOT FOUND',
      'code': '404'
    })
  }

  repositories[repositoryIndex].like = repositories[repositoryIndex].like ? 
        ++repositories[repositoryIndex].like : 1

  repository = repositories[repositoryIndex]

  return response.status(200).send(repository)
});

module.exports = app;
