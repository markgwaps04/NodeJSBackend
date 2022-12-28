const resources = require("../resources/init");
const resources_key_name = Object.keys(resources.resources);
import express, { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import { PARENT_URL, DELETED } from "./global"
const db = require("../models");


export const app = express()

const port = 3000


app.use(express.json())

interface Events {
    after_get : Function,
    after_post : Function,
    before_post : Function,
    after_get_item : Function,
    after_deleted : Function,
    after_deleted_multiple : Function,
    error_handling : Function,
    get_filter_handling : Function,
    after_patch : Function
}


const get_request = function(model : any, resource_name : String, events : Events) {


    app.get(`/${PARENT_URL}/${resource_name}`, async (req: Request, res: Response) => {

        try {

            let filter = {
                "where" : {}
            }
    
            if(req.query.hasOwnProperty("where")) {
                const where_statement = req.query["where"] as string;
                filter['where'] = JSON.parse(where_statement)
            }

            filter = events.get_filter_handling(filter) || filter;
            
            const result = await model.findAll(filter);
    
            if(events.hasOwnProperty('after_get')) {
                return await events.after_get(result, req, res);
            }
    
            return  res.json(result);

        }catch(error) {

            events.error_handling(error, req, res);

        }

        
        
    });

    app.get(`/${PARENT_URL}/${resource_name}/:id`, async (req: Request, res: Response) => {

        try {

            let where_statement = {
                "where" : {
                    "id" : req.params.id
                }
            }

            where_statement = events.get_filter_handling(where_statement) || where_statement;

            const result = await model.findOne(where_statement);

            if (events.hasOwnProperty('after_get')) {
                return await events.after_get_item(result, req, res);
            }

            return res.json(result);

        }catch(error) {

            events.error_handling(error, req, res);

        }

    
    })

}


const post_request = function(model : any, resource_name : String, events : Events) {

    app.post(`/${PARENT_URL}/${resource_name}`, async function(req: Request, res: Response) {

        try {

            req = await events.before_post(req) || req;

            const meta = await model.create(req.body);

            if (events.hasOwnProperty('after_post')) {
                return await events.after_post(meta.dataValues, req, res);
            }

            return meta.dataValues

        }catch(error) {

            events.error_handling(error, req, res);

        }

            
    });
}


const delete_request = function(model : any, resource_name : String, events : Events) {


    app.delete(`/${PARENT_URL}/${resource_name}`, async function(req: Request, res: Response) {

        try {

            if(!req.query.hasOwnProperty('id')) {
                throw Error('field id is required')
            }

            let ids = JSON.parse(req.query.id as string);
            
            if(!Array.isArray(ids)){
                ids = [req.query.id]
            }

            let where_statement = {
                "where" : {
                    "id" : { [Op.in] : ids }
                }
            }

            where_statement = events.get_filter_handling(where_statement) || where_statement;

            const updateRowsLength = await model.update({
                "state" : DELETED,
                "updatedAt" : new Date()
            }, where_statement);

            if(updateRowsLength[0] > 0) {

                return await events.after_deleted_multiple(ids, updateRowsLength, req, res);

            }

            throw Error('Could not find specified ids');



        }catch(error) {
            events.error_handling(error, req, res);
        }
        
    
    });


    app.delete(`/${PARENT_URL}/${resource_name}/:id`, async function(req: Request, res: Response) {

        try {

            let where_statement = {
                "where" : {
                    "id" : req.params.id
                }
            }

            where_statement = events.get_filter_handling(where_statement) || where_statement;
            const meta = await model.findOne(where_statement);
    
            if(meta) {
                meta.state = DELETED;
                meta.updatedAt = new Date();
                const updated_meta = await meta.save();
                if(updated_meta) {
                    return await events.after_deleted(meta.dataValues, req, res);
                }
                throw Error('Update failed');
            }
    
            throw Error('Could not find specified id');


        }catch(error) {
            events.error_handling(error, req, res);
        }
        
    
    });

}

const patch_request = function(model : any, resource_name : String, events : Events) {

    app.patch(`/${PARENT_URL}/${resource_name}/:id`, async function(req: Request, res: Response) {

        try {


            const keys = Object.keys(req.body);

            let where_statement = {
                "where": {
                    "id": req.params.id
                }
            }

            where_statement = events.get_filter_handling(where_statement) || where_statement;
            const meta = await model.findOne(where_statement);

            if (meta) {
                keys.forEach(function (per_body_key) {
                    meta[per_body_key] = req.body[per_body_key]
                })
                meta.updatedAt = new Date();
                const updated_meta = await meta.save();
                if (updated_meta) {
                    return await events.after_patch(updated_meta.dataValues, req, res);
                }
                throw Error('Update failed');
            }

            throw Error('Could not find specified id');


        }catch(error) {

            events.error_handling(error, req, res);
            
        }

    


    });

}


resources_key_name.forEach(function(per_key) {

    const resource_model = resources.resources[per_key]['MODEL'] as Model;
    // const resource_config = resources.resources[per_key]['resource_config'];

    const resource_methods = resources.resources[per_key]['resource_methods'] as Array<String>;
    const resource_name = resources.resources[per_key]['resource_name'] as String;
    const event = resources.resources[per_key]['event'] as Events;

    resource_methods.forEach(function(per) {

        try {
            const _function_request = eval(String(per.toLocaleLowerCase()) + "_request");
            _function_request(resource_model, resource_name, event);
        }catch(error) {
            //could not find function
        }
    });

});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });




// export const app = {};

// app.get('/api/user', (req : Request, res : Response) => {


// }"