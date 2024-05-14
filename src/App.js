import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleUnCheckTodo, toggleCheckTodo,editTodo,deleteTodo } from './redux/todoSlice';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { todos } = useSelector((state) => state.todo);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); 

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

  const handleToggleTodo = (id, title, description) => {
    setShowModal(true);
    setNewTodoTitle(title);
    setNewTodoDescription(description);
    setUpdateMode(true);
    setEditTodoId(id);
  };

  const handleCheckboxChange = (id, title, checkboxDone,description) => {
    if (!checkboxDone) {
      toast.success("Item Completed Successfully!")
      dispatch(toggleCheckTodo(id));
    }else{
      toast.success("Item UnCompleted Successfully!")
      dispatch(toggleUnCheckTodo(id));
    }
  };
  const handleDeleteTodo = (id,title) => {
    dispatch(deleteTodo(id));
    toast.error("Item Deleted Successfully!")
    if(title===newTodoTitle){
    setNewTodoTitle('');
    setNewTodoDescription('');
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
    setNewTodoTitle('');
    setUpdateMode(false)
    setNewTodoDescription('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
     <ToastContainer />
       <div className='modal-heading-parent'>
        <div/>
       <h1 className='textCenter'>Todo App</h1>
      <button className="normal-button" onClick={handleOpenModal}>Add Item</button> {/* Step 4 */}
      </div>
      {showModal && (
        <div className="modal"> {/* Step 4 */}
          <div className="modal-content"> {/* Step 4 */}
          <div className='modal-heading-parent'>
            <div/>
          {updateMode ? <h1 className='textCenter'> Update Item</h1>:<h1 className='textCenter'> Add New Item</h1>}
          <span className="close" onClick={handleCloseModal}>&times;</span> {/* Step 4 */}
          </div>
            <div className="add-todo"> {/* Step 4 */}
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className='input-css'
                placeholder="Add a item..."
              />
              <textarea
                type="text"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                className='input-css textarea-height'
                placeholder="Add a description..."
              />
              {updateMode ? (
                <button className='normal-button' onClick={handleAddTodo}>Update</button>
              ) : (
                <button className='normal-button' onClick={handleAddTodo}>Add</button>
              )}
            </div>
          </div>
        </div>
      )}
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