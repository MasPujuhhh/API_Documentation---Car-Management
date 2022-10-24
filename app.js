const express = require('express')
const swaggerUi =  require('swagger-ui-express')
const PORT = 3000

const router = require('./routes/routes')

const app = express()

const apiDoc = require('./api_docs/api-docs.json')
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(apiDoc))

app.use(express.json())

app.use(router)

app.listen(PORT, ()=>{
    console.log(`server running in port`, PORT);
})