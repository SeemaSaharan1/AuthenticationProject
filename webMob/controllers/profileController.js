
import {dbConfig} from '../config/dbConfig.js';

export const profile = (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).send({ error: 'Unauthorized access. User information missing.' });
    }

    const userId = req.user.id;
    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    dbConfig.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(results[0]);
    });
};
