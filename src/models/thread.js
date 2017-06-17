const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const ObjectID = mongoose.Schema.Types.ObjectId;

const ThreadSchema = new mongoose.Schema({
    author: {
        id: { type: ObjectID, required: true, ref: 'User' },
        screen_name: { type: String, required: true },
        picture: { type: String, required: true },
    },
    theme: { type: String },
    text: { type: String, required: true },
    comments: {
        count: { type: Number, default: 0 },
    },
    likes: {
        count: { type: Number, default: 0 },
        users: [{
            _id: false,
            id: { type: ObjectID, required: true, ref: 'User' },
            screen_name: { type: String, required: true },
            picture: { type: String, required: true },
        }],
    },
}, {
    timestamps: true,
});

/* Static methods*/
ThreadSchema.statics = {
    addLike(threadID, user) {
        return new Promise((resolve, reject) => {
            this.update(
                {
                    _id: threadID,
                    'likes.users.id': { $ne: user.id },
                },
                {
                    $push: { 'likes.users': user },
                    $inc: { 'likes.count': 1 },
                },
                { safe: true },
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;                    
                    }

                    if (result.nModified) {
                        resolve(result);
                    } else {
                        reject(new Error('Already liked or no such thread.'));
                    }
                }
            )
        });

    },
};


const ThreadModel = mongoose.model('Thread', ThreadSchema);

module.exports = ThreadModel;
