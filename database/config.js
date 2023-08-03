const mongoose = require('mongoose')

const dbConnection = async() =>{

    try {
       await mongoose.connect(process.env.MONGOBD)

       console.log('DB online')
        
    } catch (error) {
        console.log(error)
        throw new error('Error al iniciar la DB')
    }

}

module.exports={
    dbConnection
}