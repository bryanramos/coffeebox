import express from 'express';
import { connectDatabase } from './config/database-connection.js';
import { router as categoriesRouter } from './routes/categories.js';

const app = express();
const port = 5000;

connectDatabase();

app.use(express.json()); // built-in middleware for json

app.use('/v1/categories', categoriesRouter);

// return not found for non-defined routes
app.all('*', (request, response) => {
    response.sendStatus(404);
});

app.listen(port, () => { console.log(`Server started. Listening on port ${port}!`) });