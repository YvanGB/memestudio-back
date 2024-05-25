const mongoose = require('mongoose');
const dbcredentials = require('../../credentials/dbcredentials');

const dbUrl = `mongodb+srv://${dbcredentials.username}:${dbcredentials.password}@cluster0.khplp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const DBConnection = async () =>{
    await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(cnx => {
            console.log(`DB connected : ${cnx.connection.host}` );  // The connection worked
        })
        .catch(error =>{
            console.log(`Encountered error while connecting to DB : ${error}` );
        })
        ;
}

module.exports = DBConnection;