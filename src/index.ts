const routes = require("./routes");
import { PARENT_URL } from "./global"
import express, { Request, Response } from 'express';

const app = routes.app;

app.post(`/${PARENT_URL}/login`, async function(req: Request, res: Response) {
    res.send("gagi")
});