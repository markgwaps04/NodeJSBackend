
const db = require("../models");
import {Request, Response} from 'express';
import { to_content_type } from '../src/global';
const bcrypt = require("bcrypt")
import { saltRounds } from '../src/global';
import { Op} from 'sequelize';
import { DELETED } from "../src/global"


export const MODEL = db.User;

export const resource_name = "user";
export const resource_methods = ['GET', 'POST', 'DELETE', "PATCH"];

const return_data = async function(data : Array<any>, req : Request, res : Response) {

  const result = {
    "data": data || [],
    "items_count": await MODEL.count()
  };

  return to_content_type(result, req, res)

};


export const event = {
  "after_get" : return_data,
  "after_post" : async function(data : any, req : Request, res : Response) {
    
    const result = {
      "id": data.id,
      "updatedAt" : data.updatedAt,
      "createdAt" : data.createdAt
    };
  
    return to_content_type(result, req, res);

  },
  "before_post" : async function(req : Request) {
    const salt = await bcrypt.genSalt(saltRounds);
    req.body.password = await bcrypt.hash(req.body.password, salt)
    // req.body.password =
    
    return req;
  },
  after_get_item : return_data,
  after_deleted : async function(data : any, req : Request, res : Response) {
    
    const result = {
      "id": data.id,
      "isDeleted" : data.state,
      "updatedAt" : data.updatedAt,
      "createdAt" : data.createdAt
    };
  
    return to_content_type(result, req, res);

  },

  after_deleted_multiple : function(ids : Array<number>, updateAffectedCount : any, req : Request, res : Response) {

    const result = {
      "afftected_length": updateAffectedCount[0],
      "ids" : ids
    };
  
    return to_content_type(result, req, res);

  },
  error_handling : async function(error : any,req : Request, res:Response) {

    res.status(400);

    console.warn(error);

    const result = {
      "error": error.toString(),
    };

    to_content_type(result, req, res);

  },
  after_patch : function(data : any, req : Request, res : Response) {
    
    const result = {
      "data": data,
      "isUpdated" : true
    };
  
    return to_content_type(result, req, res);

  },
  get_filter_handling : function(filter_data : any | Array<any>) {
      filter_data['where']["state"] = {[Op.not] : DELETED};
      return filter_data
  }
}