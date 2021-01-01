const mongoose = require('../config/database')
const Schema    = mongoose.Schema;

const studentSchema = new Schema({
    sid: {type: String, require: true},
    name: {type: String, require: true},
    semester: {type: String, require: true},
    branch: {type: String, require: true}
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student