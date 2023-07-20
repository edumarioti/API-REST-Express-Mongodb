import mongoose from "mongoose"

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://alura:alura123@alura.kzhckai.mongodb.net/alura-node")

let db = mongoose.connection

export default db