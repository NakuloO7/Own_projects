//this file contains the information related to the 
// - PORT number
// - JWT
// - Mongdo DB url

const PORT = 3001;
const JWT_SECRET = 'Nakul123';
const mongoUrl = "mongodb+srv://admin:100xDevs@cluster0.jx20z.mongodb.net/QuickNotes";


module.exports = {
    PORT,
    JWT_SECRET,
    mongoUrl
}

