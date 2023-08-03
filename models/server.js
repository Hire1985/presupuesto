const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.js');




class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        //Conectar DB
        this.dataBase();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }
    async dataBase() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        // Reading body 
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.js'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto`, this.port)
        })
    }

}
module.exports = {
    Server
}