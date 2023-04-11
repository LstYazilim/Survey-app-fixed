import React from 'react'
import { Link } from 'react-router-dom'
import Users from '../components/Users'

function Admin() {
  return (
    <section>
        <h1>Admin</h1>
        <br></br>
        <Users/>
        <br></br>
        <div className='flexGrow'>
            <Link to="/">Home</Link>
        </div>
    </section>
  )
}

export default Admin