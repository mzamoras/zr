import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import { update, deleteById, getById, tables } from '../mockDatabase/databaseHelpers';
const selectedTable = tables.users;

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const user = getById(selectedTable, Number(req.query.id));
        res.status(!!user ? 200 : 404).json(user || {});
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const user = getById(selectedTable, Number(req.query.id));
        if (user) {
            deleteById(selectedTable, Number(user.id));
        }
        res.status(user ? 200 : 404).json({});
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        const updated = update(selectedTable, Number(req.query.id), req.body);
        res.status(updated ? 200 : 404).json(updated || {});
    });

export default handler;
