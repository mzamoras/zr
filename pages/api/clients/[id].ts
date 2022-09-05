import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import { update, deleteById, getById, tables } from '../mockDatabase/databaseHelpers';
const selectedTable = tables.clients;

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const client = getById(selectedTable, Number(req.query.id));
        res.status(!!client ? 200 : 404).json(client || {});
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const client = getById(selectedTable, Number(req.query.id));
        if (client) {
            deleteById(selectedTable, Number(client.id));
        }
        res.status(client ? 200 : 404).json({});
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        const updated = update(selectedTable, Number(req.query.id), req.body);
        res.status(updated ? 200 : 404).json(updated || {});
    });

export default handler;
