'use strict';

import mongoose from 'mongoose';

var AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    departement: {
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
    },
    timestamp: {
        type: Date,
        trim: true
    },
    by: {
        type: String,
        default: '',
        trim: true
    },
    images: [{
        name: {
            type: String,
            default: '',
            trim: true
        },
        title: {
            type: String,
            default: '',
            trim: true
        },
        width: {
            type: Number,
            default: '',
            trim: true
        },
        height: {
            type: Number,
            default: '',
            trim: true
        },
        size: {
            type: Number,
            default: '',
            trim: true
        },
        by: {
            type: String,
            default: '',
            trim: true
        },
        departement: {
            type: String,
            default: '',
            trim: true
        },
        initial: {
            type: String,
            default: '',
            trim: true
        },
        timestamp: {
            type: Date,
            trim: true
        }
    }]
});

export default mongoose.model('Album', AlbumSchema, 'album');
