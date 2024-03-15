

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'Post') {
        console.log('data')
        res.status(200).json({ message: 'Data received' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}