const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://krushnabsdk:MbxVv0EgCWJWIJT3@ac-4guvupz-shard-00-00.vbf5or2.mongodb.net:27017,ac-4guvupz-shard-00-01.vbf5or2.mongodb.net:27017,ac-4guvupz-shard-00-02.vbf5or2.mongodb.net:27017/?replicaSet=atlas-3ekyta-shard-0&ssl=true&authSource=admin');
        console.log('connect done');
    }catch (error){
        console.log(error);
    }
}
module.exports = connectDB;