import sql from "mssql";
import { dbconfig } from "../utils/db.js";

const getTodos = async (req, res) => {
  try{
    await sql.connect(dbconfig);
    const result = await sql.query("Select * from Todo");
    res.status(200).json(result.recordset);
  }catch (err){
    res.status(500).send(`Error While Getting Todo ${err.message}`);
  }
}

const insertTodo = async (req, res) => {
  const {todoName} = req.body;
  try{
    await sql.connect(dbconfig);
    await sql.query(`Insert into Todo(todoName) Values('${todoName}')`);
    res.status(200).json("Todo added");
  }catch(err){
    res.status(500).json(`Error While Inserting Todo ${err.message}`);
  }
}

const deleteTodo = async (req, res) => {
  const {id} = req.params;
  try{
    await sql.connect(dbconfig);
    await sql.query(`Delete from Todo where todoID = '${id}'`);
    res.status(200).json("Todo Deleted Successfully");
  }catch(err){
    res.status(500).json(`Error While Deleting Todo ${err.message}`);
    console.log(err.message);
    
  }
}

const updateTodo = async (req, res) => {
  const {id, text} = req.body;
  try{
    await sql.connect(dbconfig);
    await sql.query(`Update Todo set todoName = ${text} where todoID = ${id}`);
    res.status(200).json("Todo Updated Successfully");
  }catch(err){
    res.status(500).json(`Error While Updating Todo ${err.message}`);
  }
}

export {getTodos, insertTodo, deleteTodo, updateTodo};