import express from 'express';
import mockApis from './mock-apis';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, '../../dist/dev/')));

app.get('/api/auth/me', (req, res) => mockApis.getAuthMe(req, res));
app.put('/api/users/:username', (req, res) => mockApis.putUsersUsername(req, res));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/dev/index.html')));

export default app;
