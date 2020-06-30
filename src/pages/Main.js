import React, { useEffect, useState } from 'react';
import './Main.css';

import tindev from '../assets/tindev.svg';
import api from '../services/api';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      });

      setUsers(response.data);
    }
    
    loadUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    // The second param of the post is the body, then this is why we let it null, we just want to set the headers, the third param
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id,
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    // The second param of the post is the body, then this is why we let it null, we just want to set the headers, the third param
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id,
      }
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return(
    <div className="main-container">
      <img src={tindev} alt="logo" id="tindev-logo" />
        {users.length > 0 ? (
          <ul>
            {/* When an arrow function just has a return we can use the () instead of { return () } */}
            {users.map(user => (
              // Everytime we use a map the first element should have a key to let them unique
              <li key={user._id}>
                <img src={user.avatar} alt={user.name} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
    
                <div className="buttons">
                  <button type="button" onClick={() => handleLike(user._id)} > <p>S2</p></button>
                  <button type="button" onClick={() => handleDislike(user._id)} ><p>X</p></button>
                </div>
              </li>
            ))}
          </ul>    
        ) : (
          <div className="empty">Acabou :(</div>
        ) }
      
    </div>
  );
}