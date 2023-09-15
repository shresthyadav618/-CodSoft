

import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";

connect();

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    images : {
        type : Object,
        required : false
    },
    parentCategory : {
        type : mongoose.Types.ObjectId,
        required : false,
        ref : 'categories'
    },
    properties : {
        type : Object,
        required : false
    }

},{
    timestamps : true,
});

const productModel = mongoose.models.product ||  mongoose.model('product',productSchema);
export { productModel };
