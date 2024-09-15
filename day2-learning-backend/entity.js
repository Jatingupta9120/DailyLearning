const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const objectId=Schema.ObjectId;


const UserSchema = new Schema({
    _id:{type:objectId,auto:true},
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
    }
});


const TodoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now } 
});


const UserModel = mongoose.model('User', UserSchema);
const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = { UserModel, TodoModel };
