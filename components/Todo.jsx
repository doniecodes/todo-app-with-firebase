import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa';

const Todo = (props) => {

    const { todos, toggleCompleted, deleteItem,
      updateItem, handleProceedUpdate, updateFormRef, cancelUpdate, textareaRef
     } = props

  return (
    <>
    { todos.length !== 0 && todos.map((todo, index)=> (
        <>
        <li key={todo.id} className='todo-item'>
        <label htmlFor={`todo${index + 1}`} className="todo-label">
        <input
        onChange={()=> toggleCompleted(todo.id, todo.completed)}
        type="checkbox" id={`todo${index + 1}`} className='mr-5'
        checked={todo && todo.completed}/>

        <p className="todo-text">
           {todo.title}
        </p>
        </label>

      <div>
      <button onClick={()=> updateItem(todo.id, todo.title)}><FaEdit className='edit-btn'/></button>
      <button onClick={()=> deleteItem(todo.id)}><FaTrash className='delete-btn'/></button>
      </div>
    </li>

    <form onSubmit={(e)=> handleProceedUpdate(e, todo.id)} className='update-form' ref={updateFormRef}>
      <textarea name="textarea"
      ref={textareaRef}>
      </textarea>
      <div className="update-btns">
        <button
        type="button" className='update-btn-cancel'
        onClick={(e)=> cancelUpdate(e.target.innerText)}>Cancel</button>
        <button className='update-btn-update'>Update</button>
      </div>
    </form>
        </>
    )) }
    </>
  )
}

export default Todo