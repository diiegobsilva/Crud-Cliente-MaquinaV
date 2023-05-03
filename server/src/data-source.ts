import { DataSource } from "typeorm";



// const AppDataSource = new DataSource({
//   database: "clientes",
//   type: "mysql", 
//   host: "localhost", 
//   port: 3306, 
//   username: "root",
//   password: "12345",

//   synchronize: false,
//   logging: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
//   subscribers: [],
//   maxQueryExecutionTime: 2000,
// });

const AppDataSource = new DataSource({
  database: "clientes",
  type: "mysql", 
  host: "192.168.15.79", 
  port: 3306, 
  username: "fatec",
  password: "11",
  connectTimeout: 30000,

  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  maxQueryExecutionTime: 10000,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); //sucesso na promessa
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

export default AppDataSource;
