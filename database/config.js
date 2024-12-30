const mongoose = require('mongoose');



const dbConnection = async() => {

    try {

        await mongoose.connect( "mongodb://localhost:27017/valuShopping", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).catch(error => { throw error});
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports = {
    dbConnection
}
