import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import { update, deleteById, getById, tables } from '../mockDatabase/databaseHelpers';
const selectedTable = tables.customers;

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        const customer = getById(selectedTable, Number(req.query.id));
        res.status(!!customer ? 200 : 404).json(customer || {});
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const customer = getById(selectedTable, Number(req.query.id));
        if (customer) {
            deleteById(selectedTable, Number(customer.id));
        }
        res.status(customer ? 200 : 404).json({});
    })
    .patch(async (req: NextApiRequest, res: NextApiResponse) => {
        const updated = update(selectedTable, Number(req.query.id), req.body);
        res.status(updated ? 200 : 404).json(updated || {});
    });

export default handler;
