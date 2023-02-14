import './style.css'
import {Card} from '../../components/Card'
import React, { useState, useEffect } from 'react'


export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function addStudent() {
    const newStudent = {name: studentName, time: new Date().toLocaleTimeString("pt-Br")}

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect (() => {
    fetch('https://api.github.com/users/biielsantos')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name, avatar: data.avatar_url,
      })
    })
  }, []);

  return (
    <div className='lista'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='foto do perfil'/>
        </div>
      </header>
      
      <input type="text" placeholder="Digite o nome.." onChange={e => setStudentName(e.target.value)}/>
      <button type="button" onClick={addStudent}>Adicionar</button>

      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />)
        }
      
    </div>
  )
}


