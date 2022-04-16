const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'er rol eso bligador']
    }
});

module.exports = model('Role', RoleSchema);
