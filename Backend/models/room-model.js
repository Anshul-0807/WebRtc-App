const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({

    topic : {type : String , required : true },
    roomType : {type : String , required : true },
    ownerId: {type: Schema.Types.ObjectId, Ref: 'User'},
    speakers : {
        type: []
    }
},
{
    timestamps : true,
}
);

module.exports = mongoose.model('Refresh' , refreshSchema, 'tokens' );