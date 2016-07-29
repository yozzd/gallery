'use strict';

import mongoose from 'mongoose';

var DepartementSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    initial: {
        type: String,
        default: '',
        trim: true
    },
    group: {
        type: Number
    }
});

export default mongoose.model('Departement', DepartementSchema, 'departement');
