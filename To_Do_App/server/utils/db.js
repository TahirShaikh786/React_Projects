import sql from "mssql";

export const dbconfig = {
  user: "sa",
  password: "tahir",
  server: "Tahir",
  database: "Projects",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

sql.connect(dbconfig).then(pool => {
  return pool.request().query("SELECT GETDATE() as Server_Time");
}).then(result => {
  console.log("Connected! " , result.recordset[0]);
}).catch(error => {
  console.log("Error While Connecting: " , error.message);
})