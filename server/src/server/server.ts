const express = require('express');
import * as path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Application } from 'express';

export default class Server {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number) {
        return new Server(port);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    public async start(callback: () => void) {
        await createConnection();
        this.app.listen(this.port, callback);
        this.publicFolder();
    }

    public use(toUse: any) {
        this.app.use(toUse);
    }
}
