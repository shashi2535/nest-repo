interface SequelizeConfig {
  dialect: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  //   models: any[]; // Adjust the type based on your model types, assuming User is of type 'any'
}
interface IAppConfigInterface {
  port: number;
}
interface IDbConfigInterface {
  db_config: SequelizeConfig;
}
export { IAppConfigInterface, IDbConfigInterface };
