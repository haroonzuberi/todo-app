import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleUnCheckTodo, toggleCheckTodo,editTodo,deleteTodo } from './Modules/redux/todoSlice';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modules/Components/Modal"
function App() {
  // Redux state and dispatcher setup
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // State management for modal and todo form
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  // Function to handle adding or updating todo
  const handleAddTodo = () => {
    if (updateMode) {
      dispatch(editTodo({ id: editTodoId, title: newTodoTitle }));
      setNewTodoTitle('');
      setUpdateMode(false);
      setNewTodoDescription('')
      toast.success("Item Updated Successfully!")
    } else {
      if (newTodoTitle.trim() !== '') {
        dispatch(addTodo({ id: Math.floor(Math.random() * 1000), title: newTodoTitle, description: newTodoDescription, checkboxDone: false }));
        setNewTodoTitle('');
        setNewTodoDescription('');
        toast.success("Item Added Successfully!")
      }else{
        toast.error("Title is Required!")
      }
    }
  };

  // Function to handle toggling todo completion status
  const handleToggleTodo = (id, title, description) => {
    setShowModal(true);
    setNewTodoTitle(title);
    setNewTodoDescription(description);
    setUpdateMode(true);
    setEditTodoId(id);
  };

  // Function to handle checkbox change for todo
  const handleCheckboxChange = (id, title, checkboxDone,description) => {
    if (!checkboxDone) {
      toast.success("Item Completed Successfully!")
      dispatch(toggleCheckTodo(id));
    }else{
      toast.success("Item UnCompleted Successfully!")
      dispatch(toggleUnCheckTodo(id));
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id,title) => {
    dispatch(deleteTodo(id));
    toast.error("Item Deleted Successfully!")
    if(title===newTodoTitle){
    setNewTodoTitle('');
    setNewTodoDescription('');
    }
  };

  // Function to open modal for adding  todo
  const handleOpenModal = () => {
    setShowModal(true);
    setNewTodoTitle('');
    setUpdateMode(false)
    setNewTodoDescription('');
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
     <ToastContainer />
      {/* Header section */}
       <div className='modal-heading-parent'>
        <div/>
       <h1 className='textCenter'>Todo App</h1>
      <button className="normal-button" onClick={handleOpenModal}>Add Item</button>
      </div>
      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        updateMode={updateMode}
        newTodoTitle={newTodoTitle}
        newTodoDescription={newTodoDescription}
        setNewTodoTitle={setNewTodoTitle}
        setNewTodoDescription={setNewTodoDescription}
        handleAddTodo={handleAddTodo}
      />
      {/* Todo list */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className='todo-container'>
            <div className='flexBasis60'>
            <input
              type="checkbox"
              checked={todo.checkboxDone}
              onChange={() => handleCheckboxChange(todo.id, todo.title, todo.checkboxDone,todo.description)}
            />
            {todo.completed?<s>{todo.title}</s>:
            <span className={todo.checkboxDone ? 'completed editable' : 'editable'}>
              {todo.title}
            </span>}
             </div>
            <div className='flexBasis40'>
            {!todo.completed &&  <button className='markdone-button' onClick={() =>handleToggleTodo(todo.id, todo.title, todo.description)}>Edit</button>}
            <button className='delete-button' onClick={() => handleDeleteTodo(todo.id,todo.title)}>Delete</button>
         </div>
         </div>
         {todo.description.length>0&&<p className='para-text'>{todo.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;