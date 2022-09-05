import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect';
import { create, getAll, User, tables } from '../mockDatabase/databaseHelpers';
const selectedTable = tables.users;

export const cleanUser = (user: User | any, index?: number) : User => {
    const { password, ...cleanedUser } = user;
    return cleanedUser;
}

const handler = nc()
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
        console.log('get all', selectedTable);
        res.status(200).json(getAll(selectedTable).map(cleanUser));
    })
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const {password, ...all } = create(selectedTable,req.body);
        res.status(200).json(all);
    });

export default handler;