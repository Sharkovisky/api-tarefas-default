const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Logs
app.use(morgan('combined'))

// Documentação da API
const swaggerDocument = YAML.load('./docs/swagger.yml')
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Rotas
const tarefaRoute = require('./routes/tarefaRoute')
app.use('/api/v1/tarefas', tarefaRoute)

// Porta da aplicação
const port = process.env.PORT

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})