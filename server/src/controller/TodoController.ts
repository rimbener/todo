/** Controlador de la ruta /todos */
import { getRepository } from 'typeorm';
import * as fs from 'fs';
const moveFile = require('move-file');
const stream = require('stream');

import QueryConstructor from '../utils/query-constructor';
import Todo from '../entity/Todo';
import { config } from '../config';
import { Request, Response } from 'express';

export default class TodoController {
    public static async all(req: Request, res: Response) {
        const whereClause = new QueryConstructor(req.query, 'todo');
        if (req.query.id) {
            whereClause.addEqualCondition('id');
        }
        if (req.query.resolved) {
            whereClause.addEqualCondition('resolved', req.query.resolved === 'true' ? true : false);
        }

        if (req.query.title) {
            whereClause.addLikeCondition('title', req.query.title);
        }

        try {

            const todos: Todo[] = await getRepository(Todo)
                .createQueryBuilder('todo')
                .where(whereClause.getQuery(), whereClause.getParams())
                .getMany();
            return res.send(todos);
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }

    public static async one(req, res) {
        try {
            const todo: Todo = await getRepository(Todo).findOneOrFail(req.params.id);
            if (todo) {
                return res.send(todo);
            } else {
                return res.status(204).send();
            }
        } catch (errors) {
            return res.status(404).send('ToDo no encontrado');
        }
    }

    private static async deleteImageIfChanged(newTodo: Todo) {
        if (newTodo.id) {
            const oldTodo = await getRepository(Todo).findOne(newTodo.id);
            if (oldTodo && oldTodo.image !== newTodo.image) {
                fs.unlink(config.todosPrivateDir + oldTodo.id.toString() + '/' + oldTodo.image, () => { });
            }
        }
    }

    private static async save(newTodo: Todo, reqFile?: any): Promise<Todo> {
        const savedTodo = await getRepository(Todo).save(newTodo);
        if (reqFile) {
            await moveFile(reqFile.path, config.todosPrivateDir + '/' + savedTodo.id.toString() + '/' + reqFile.originalname);
        }
        return savedTodo;
    }

    public static async create(req, res) {
        const newTodo = JSON.parse(req.body.todo);
        try {
            const savedTodo = await TodoController.save(newTodo, req.file);
            return res.send(savedTodo);
        } catch (errors) {
            return res.status(500).send(errors);
        }
    }

    public static async update(req, res) {
        const newTodo = JSON.parse(req.body.todo);
        TodoController.deleteImageIfChanged(newTodo);
        try {
            await TodoController.save(newTodo, req.file);
            return res.status(204).send();
        } catch (errors) {
            return res.status(500).send(errors);
        }
    }

    public static getFiles(req, res) {
        const fileName = config.todosPrivateDir + '/' + req.params.id + '/' + req.params.fileName;
        const readStream = fs.createReadStream(fileName);
        const ps = new stream.PassThrough();
        stream.pipeline(readStream, ps,
            err => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
            });
        ps.pipe(res);
    }

    // NO ESTA IMPLEMENTADO EN EL FRONT END PERO LO USO PARA PRUEBAS
    // FALTA BORRAR LOS ARCHIVOS
    public static async remove(req, res) {
        const todoRepository = getRepository(Todo);
        try {
            const todo: Todo = await todoRepository.findOneOrFail(req.params.id);
            await todoRepository.remove(todo);
            return res.status(204).send();
        } catch (errors) {
            return res.status(404).send('ToDo no encontrado');
        }
    }

    // NO ESTA IMPLEMENTADO EN EL FRONT END PERO LO USO PARA PRUEBAS
    // FALTA BORRAR LOS ARCHIVOS
    public static async removeAll(req, res) {
        const todoRepository = getRepository(Todo);
        try {
            await todoRepository
                .createQueryBuilder('todo')
                .delete()
                .from('todo')
                .execute();
            return res.status(204).send();
        } catch (errors) {
            return res.status(500).send('ToDo no encontrado');
        }
    }
}
