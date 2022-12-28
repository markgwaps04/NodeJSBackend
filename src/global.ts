
import {Request, Response} from 'express';
import { json2xml } from 'xml-js';
export const saltRounds = 10
export const PARENT_URL = "api"
export const DELETED = 1;




export const to_content_type = function(result : Array<any> | object, req : Request, res : Response) {

    const headers = req.headers;
    const content_type = headers['content-type'] || "application/xml";
  
    if(content_type == "application/xml") {
  
      let xml = `<?xml version="1.0" encoding="UTF-8"?>`
      const xmlContent = json2xml(JSON.stringify(result), { compact: true, spaces: 1 });
      xml += "<response>" + xmlContent + "</response>";
    
      res.header('Content-Type', content_type)
      res.status(200).send(xml)
      return {};
    }
  
    res.json(result);
    return {}
  
}