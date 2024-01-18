const mongoose = require("mongoose");

const editReading = async (req, res) => {

    const readingModel = mongoose.model("readings");
    const { bookName, author, page, genre, description, pageRead, status } = req.body;

    const updateReading = await readingModel.findOneAndUpdate({
        user_id: req.user._id, 
       
    },
      {
        $set: {
          bookName: bookName,
          author: author,
          page: page,
          genre: genre,
          description: description,
          pageRead: pageRead,
          status: status
        },

        // Updating Book read query agg. pipeline
        $inc: {
          bookRead: {
            $cond: {
              if: { $eq: ['$page', '$pageRead'] },
              then: 1,
              else: 0
            }
          }
        }
      },
    {
        runValidator: true,
        new: true  //  to get the updated document
    }
    );


    res.status(200).json({
        status: 'success',
        message: 'Updated reading successfully'
    })

}

module.exports = editReading;