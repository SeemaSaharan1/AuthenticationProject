import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {dbConfig} from '../config/dbConfig.js';

export const register = (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Password hashing error' });
        }
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        dbConfig.query(sql, [username, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('User registration failed: ', err);
                return res.status(500).json({ error: 'User registration failed' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    dbConfig.query(query, [email], async (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    });
};
