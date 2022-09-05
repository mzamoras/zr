import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import { create, getAll, tables } from '../mockDatabase/databaseHelpers';
const selectedTable = tables.clients;

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json(getAll(selectedTable));
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        res.status(200).json(create(selectedTable,req.body));
    });

export default handler;