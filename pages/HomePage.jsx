import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header';
import Todo from "../components/Todo"
import { FormCustomHooks } from "../hooks/FormCustomHooks"
import { FbConfig } from '../fbfiles/FbConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { addDoc, deleteDoc, doc, onSnapshot,
  query,where, setDoc, updateDoc, deleteField,
  orderBy, serverTimestamp, getDoc,
  collection} from "firebase/firestore"



const HomePage = () => {
  let [newItem, setNewItem] = useState('');
  const mode = localStorage.getItem("mode");
  const [filtered, setFiltered] = useState()
  const { error, loading, user } = FormCustomHooks();
  const [ todos, setTodos ] = useState([]);
  const { todosRef, auth, db } = FbConfig();

const q = query(todosRef, orderBy("createdAt", "desc"))

// items to fetch
useEffect(()=> {
  onSnapshot(q, (snapshot)=> {
    snapshot.docs.forEach((doc)=> {
      const docObj = { ...doc.data(), id: doc.id };
      if(user){
        setTodos((prev)=> [...prev, docObj]);
      } else {
        setTodos([]);
      }
    })
  }, (err)=> {
    console.log(err);
  })
}, [user])

// render new items
const navigate = useNavigate();
let renderNewItem = (e)=>{
  if(!user){
    navigate("/login?message=You must log in first")
  }
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const title = formData.get("todo");
  const completed = false;
  const createdAt = serverTimestamp();
  if(!title){
    return;
  }
  addDoc(todosRef, {title, completed, createdAt})
  .then((doc)=> {
    e.target.reset();
    console.log("document added");
  }).then((err)=> {
    console.log(err);
  })

}

// delete items 
let deleteItem = (id)=> {
  const docRef = doc(db, "todos", id);
  deleteDoc(docRef)
  .then(()=> {
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
    toast.success("Task deleted.")
  }).catch((err)=> {
  })
}

// Update item
const updateFormRef = useRef(null);
const textareaRef = useRef(null);

const updateItem = (id, text)=> {
  textareaRef.current.innerText = text;
  updateFormRef.current.classList.toggle("active");
}
// Proceed with updating item
const handleProceedUpdate = (e, id)=> {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const newText = formData.get("textarea");

  if(!newText){
    return;
  }

  const docRef = doc(db, "todos", id);

  updateDoc(docRef, {
    title: newText,
    completed: false,
    createdAt: serverTimestamp(),
  }).then((doc)=> {
    updateFormRef.current.classList.remove("active");
    toast.success("Task updated.")
  }).catch((err)=> {
    console.log(err)
  })
}
// cancel update
const cancelUpdate = ()=> {
  updateFormRef.current.classList.remove("active");
}

// Handle all todo filters
const cleardivRef = useRef(null);

const handleFilter = async (text)=> {
  if(text === "Completed"){
    setFiltered("completed", "==", true);
  }
  if(text === "Active"){
    setFiltered("completed", "==", false);
  }
  if(text === "Clear All"){
    console.log(cleardivRef.current)
    cleardivRef.current.classList.toggle("active")
  }
}

const handleDeleteAll = (text)=> {
  if(text === "Cancel"){
    cleardivRef.current.classList.toggle("active")
  }
  if(text === "Delete"){
    onSnapshot(todosRef, (snapshot)=> {
      snapshot.docs.forEach((doc)=> {
        const docRef = getDoc(todosRef, doc.id);
        to.doc(doc.id).delete()
      })
    }, (err)=> {
      console.log(err)
    }) 

    cleardivRef.current.classList.toggle("active")
  }
}


//toggle completed
let toggleCompleted = (id, completed)=>{
  const docRef = doc(todosRef, id);
  updateDoc(docRef, {
    completed: !completed
})
  .then((doc)=> {
    console.log("document updated")
  })
  .catch((err)=> {
    console.log(err);
  })
}


  return (
    <>
  <Header renderNewItem={renderNewItem}
  newItem={newItem}
  setNewItem={setNewItem} />

      <div className={`container2 ${mode}`}>
      <section className={`todos-section ${mode}`}>
        
        { todos.length === 0 && <div className='empty-list'>
          <p>No todos here... </p>
          { !user && <p>Log in to start adding.</p> }
        </div> }

      <div className={`todos-wrapper ${mode}`}>
      <ul className={`todos-list ${mode}`}>
        <Todo todos={todos}
        toggleCompleted={toggleCompleted}
        deleteItem={deleteItem}
        updateItem={updateItem}
        handleProceedUpdate={handleProceedUpdate}
        updateFormRef={updateFormRef}
        cancelUpdate={cancelUpdate}
        textareaRef={textareaRef}/>
      </ul>

      { todos.length !== 0 &&
      <div id="todo-filters">
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>All</span>
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>Active</span>
        <span onClick={(e)=> handleFilter(e.target.innerText)} className='filter'>Completed</span>
        <div className="filter filter-all"
        onClick={(e)=> handleFilter(e.target.innerText)}>
          Clear All
          </div>
      </div> }

      </div>
    {/* Delete all div */}
      <div className={`delete-all-div ${mode}`}
        ref={cleardivRef}>
        <p>Are you sure you want to delete all tasks ? </p>
        <div>
        <button className="cancel-del-btn"
        onClick={(e)=> handleDeleteAll(e.target.innerText)}>
          Cancel
        </button>
        <button className="proceed-del-btn"
        onClick={(e)=> handleDeleteAll(e.target.innerText)}>
          Delete
        </button>
        </div>
      </div>

      </section>
      </div>
    </>
  )
}

export default HomePage
