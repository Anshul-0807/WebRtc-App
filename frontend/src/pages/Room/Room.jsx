import React, {useState} from 'react'

const Room = () => {

const [clients, setClients] = useState([
  {
    id: 1,
    name: 'Anshul',
  },
  {
    id:2,
    name: 'john doe',
  },
])

  return (
    <div>
    <h1>All connected clients</h1>
    {
      clients.map(client =>{
        return <div>
          <audio controls autoPlay></audio>
          <h4>{client.name}</h4>
        </div>
      })
    }
    </div>
  )
}

export default Room