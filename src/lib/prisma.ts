// import "dotenv/config";
// import { PrismaClient } from "../generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const adapter = new PrismaMariaDb({
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "123456",
//   database: "mydb",
// });

// const prisma = new PrismaClient({ adapter });
// export default prisma;
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
