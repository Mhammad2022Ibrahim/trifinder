import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Attractions } from "./entity/Attractions"
import { Cities } from "./entity/Cities"
import { Countries } from "./entity/Countries"
import { Districts } from "./entity/Districts"
import { Images } from "./entity/Images"
import { Reviews } from "./entity/Reviews"
import { Trips } from "./entity/Trips"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root123",
    database: "trifinder_db",
    synchronize: true,
    logging: false,
    entities: [Users,Attractions,Cities,Countries,Districts,Images,Reviews,Trips],
    migrations: [],
    subscribers: [],
})