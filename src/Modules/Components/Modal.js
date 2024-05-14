import React from 'react';

const Modal = ({ showModal, handleCloseModal, updateMode, newTodoTitle, newTodoDescription, setNewTodoTitle, setNewTodoDescription, handleAddTodo }) => {
  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
         {/* Header section */}
          <div className='modal-heading-parent'>
            <div/>
            <h1 className='textCenter'>{updateMode ? 'Update Item' : 'Add New Item'}</h1>
            <span className="close" onClick={handleCloseModal}>&times;</span>
          </div>
         {/* Add todo section */}
          <div className="add-todo">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className='input-css'
              placeholder="Add an item..."
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
    )
  );
}

export default Modal;