const mongoose = require("mongoose");
const validator = require("validator");

const addReading = async (req, res) => {

    const usersModel = mongoose.model("users");
    const readingModel = mongoose.model("readings");


    const { bookName, author, page, genre, description, pageRead, status, bookRead } = req.body;

    // Validating creadiatilas:
    if(!bookName) throw "Book name is required";
    if(!author) throw "author name is required";
    if(!page) throw "page is required";
    if(!genre) throw "Genre is required";
    if(!description) throw "Description is required";
    if(description.length < 10) throw "Description must be at least 10 characters";
    if(!pageRead) throw "Page Read name is required";
    if(!status) throw "Status is required";

    // valdating page number with validator package:
    if(!validator.isNumeric(page.toString())) throw "Page must be a number";
    if(!validator.isNumeric(pageRead.toString())) throw "Page Read must be a number";


    // Inserting Reading into Database:
    await readingModel.create({
        user_id: req.user._id,
        bookName: bookName,
        author: author,
        page: page,
        genre: genre,
        description: description,
        pageRead: pageRead,
        status: status
    })


    // Updating Book Read of users:
    await readingModel.updateOne({
        user_id: req.user._id,
    },
    
    // Increment query:
    {
       $inc: {
        bookRead: 1
       } 
    },
    {
       runValidator: true
    }
   )



    res.status(200).json({
        status: 'success',
        message: 'Reading added sucessfully'
    })

}

module.exports = addReading;