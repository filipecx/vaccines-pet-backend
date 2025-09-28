import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import router from './src/Adapters/Routes/petRoutes.ts'
const app = express()
const port = 3000
const prisma = new PrismaClient

app.use(express.json());
app.use(cors())

app.use("/vaccination-card", router)


async function start() {
    await prisma.$connect();
    console.log('prisma connected')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}. You better catch it!`)
    })
}



start()



