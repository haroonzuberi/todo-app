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

  /**
   * Handles the addition of a new todo item.
   * 
   * This function is responsible for processing the user's input and adding a new todo item to the list.
   * 
   * @returns {void}
   * @memberof TodoListController
   * @function handleAddTodo
   * @example
   * // Usage:
   * handleAddTodo();
  */
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

  /**
   * Handles the toggling of a todo item's completion status.
   *
   * This function is responsible for toggling the completion status of a todo item,
   * identified by its unique ID, and updating its title and description accordingly.
   * 
   * @param {string} id - The unique identifier of the todo item.
   * @param {string} title - The title of the todo item.
   * @param {string} description - The description of the todo item.
   * @returns {void}
   * @function handleToggleTodo
   * @memberof TodoListController
   * @example
   * // Usage:
   * handleToggleTodo(todo.id, todo.title, todo.description);
 */
  const handleToggleTodo = (id, title, description) => {
    setShowModal(true);
    setNewTodoTitle(title);
    setNewTodoDescription(description);
    setUpdateMode(true);
    setEditTodoId(id);
  };

  /**
   * Handles the change of checkbox status for a todo item.
   *
   * This function is responsible for updating the completion status of a todo item
   * identified by its unique ID, and updating its title, checkbox status, and description accordingly.
   * 
   * @param {string} id - The unique identifier of the todo item.
   * @param {string} title - The title of the todo item.
   * @param {boolean} checkboxDone - The new status of the checkbox for the todo item.
   * @param {string} description - The description of the todo item.
   * @returns {void}
   * @function handleCheckboxChange
   * @memberof TodoListController
   * @example
   * // Usage:
   * handleCheckboxChange(todo.id, todo.title, !todo.completed, todo.description);
  */
  const handleCheckboxChange = (id, title, checkboxDone,description) => {
    if (!checkboxDone) {
      toast.success("Item Completed Successfully!")
      dispatch(toggleCheckTodo(id));
    }else{
      toast.success("Item UnCompleted Successfully!")
      dispatch(toggleUnCheckTodo(id));
    }
  };

  /**
   * Handles the deletion of a todo item.
   *
   * This function is responsible for deleting a todo item from the list
   * based on its unique identifier and title.
   * 
   * @param {string} id - The unique identifier of the todo item to be deleted.
   * @param {string} title - The title of the todo item to be deleted.
   * @returns {void}
   * @function handleDeleteTodo
   * @memberof TodoListController
   * @example
   * // Usage:
   * handleDeleteTodo(todo.id, todo.title);
  */
  const handleDeleteTodo = (id,title) => {
    dispatch(deleteTodo(id));
    toast.error("Item Deleted Successfully!")
    if(title===newTodoTitle){
    setNewTodoTitle('');
    setNewTodoDescription('');
    }
  };

  /**
   * Opens the modal for adding a new todo.
   *
   * This function is responsible for displaying the modal window
   * to allow the user to add a new todo item.
   * 
   * @returns {void}
   * @function handleOpenModal
   * @memberof TodoListController
   * @example
   * // Usage:
   * handleOpenModal();
  */
  const handleOpenModal = () => {
    setShowModal(true);
    setNewTodoTitle('');
    setUpdateMode(false)
    setNewTodoDescription('');
  };

  /**
   * Closes the modal.
   *
   * This function is responsible for hiding or closing the modal window.
   * 
   * @returns {void}
   * @function handleCloseModal
   * @memberof TodoListController
   * @example
   * // Usage:
   * handleCloseModal();
  */
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