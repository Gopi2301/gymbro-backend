// index.js
import express, { Request, Response } from 'express'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import cors from 'cors';
import { apiRouter } from "#routes/index.js";
const app = express();

const port = process.env.PORT ?? "5000";

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client); 

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter)

app.get('/', (_req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

