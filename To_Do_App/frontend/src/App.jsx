import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function App() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([])

  const handleChange = (e) => {
    setTodoName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(todoName == ""){
        toast.warn("Enter Some Value in Todo Box");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({todoName}),
      });

      if(response.ok){
        toast.success(`${todoName} added to your TodoList!`);
        setTodoName("");
        handleTodoList();
      }else{
        toast.error(`${todoName} has not been added to your list`);
      }
    } catch (error) {
      console.log(`Error While Storing Todo Items : ${error.message}`);
      
    }
  }

  const handleTodoList = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      
      const data = await response.json();

      if(response.ok){
        setTodoList(data);
      }
    }catch(error){
      toast.error("Error While Fetching TodoList");
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/${id}`, {
        method: "DELETE",
        headers:{
          "Content-Type": "application/json"
        }
      })

      if(response.ok){
        toast.success("Todo Item Was Deleted");
        handleTodoList();
      }
    } catch (error) {
      toast.error("Error While Deleting Todo Item");
    }
  }

  useEffect(() => {
    handleTodoList();
  }, [])

  return (
    <>
      <div className='w-100 flex flex-column justify-center items-center'>
        <div className='w-1/2 m-10 p-4 flex flex-col items-center'>
          <h1 className="text-3xl text-center font-bold underline">To Do App</h1>
          <div className="w-100 m-3 flex flex-col justify-center items-center">
            <label className='text-xl'>Enter Your Todo: </label>
            <input className='p-2 rounded' type="text" name="todoName" onChange={handleChange} value={todoName}  />
            <button className='bg-gray-500 p-2 m-2 rounded-tr-md rounded-md' onClick={handleSubmit}>Submit</button>
          </div>
          
          <div className="w-1/2 m-4 flex flex-col justify-center rounded-md">
            {todoList.map((item, i) => (
              <div className="p-3 rounded-md m-2 bg-cyan-500 justify-center flex justify-between" key={i}>
                <label className='font-bold'>{item.todoName}</label>
                <button className='bg-red-500 p-1 rounded-md font-bold' onClick={() => handleDelete(item.todoID)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
