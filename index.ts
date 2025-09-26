import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = 3000
const prisma = new PrismaClient

async function start() {
    await prisma.$connect();
    console.log('prisma connected')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}. You better catch it!`)
    })
}

start()



