import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {

  const [inputText, setInputText] = useState('');
  const [taskList, setTaskList] = useState([])

  
  // Load tasks from localStorage when the component mounts

  useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if(storedTasks){
        console.log('Tasks loaded from localStorage:', storedTasks);
        setTaskList(JSON.parse(storedTasks));
      }
  }, []);

  //Update tasks on localStorage

  useEffect(() => {
    console.log('Tasks being saved to localStorage:', taskList);
    if (taskList.length > 0) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  } 
  if (taskList.length === 0){
    localStorage.removeItem('tasks');
  }
  }, [taskList]);


  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

 const handleKeyPress = (event) => {
  if (event.key === 'Enter' && inputText.trim() !== '') {
    setTaskList([...taskList, inputText]);
    setInputText('');
  }
 };

 const handleRemoveTask = (index) => {
    const updatedList = taskList.filter((_, i)=> i !== index);
    setTaskList(updatedList);
 }

 const handleButtonClick = () =>{
  if(inputText.trim() !== '')
  setTaskList([...taskList, inputText]);
  setInputText('');
 }

 const handleMoveUp = (index) => {
  if (index === 0) return;
  const updatedList = [...taskList];
  [updatedList[index - 1], updatedList[index]] =[updatedList[index], updatedList[index - 1]];
  setTaskList(updatedList);
 }

 const handleMoveDown = (index)=>{
    if (index === taskList.length - 1) return;
    const  updatedList = [...taskList];
    [updatedList[index + 1], updatedList[index]] = [updatedList[index], updatedList[index + 1]];
    setTaskList(updatedList);
 }

    return (<>
    <div>

       <header><h1>To-Do List</h1></header>
       
       <input type="text" name="task" placeholder="Enter task here" 
       value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
       <button onClick={handleButtonClick}>Enter</button>
      
      <ul>
        {
          taskList.map((text, index) => (<><li key={index}
          style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>{text}</li>
          <button onClick={() => handleMoveUp(index)}>⬆️</button>
          <button onClick={() => handleMoveDown(index)}>⬇️</button>
          <button onClick={() => handleRemoveTask(index)}>🚮</button></>))
        }
      </ul>
       </div>
      </>
     )

}
  

 export default TodoList;