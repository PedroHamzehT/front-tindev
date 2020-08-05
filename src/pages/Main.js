import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import tindev from '../assets/tindev.svg';
import api from '../services/api';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  // This useEffect receive 2 params the frist is the function who will be called and the second param is when it will call the function
  // Example when the match.params.id be changed the arrow function in the first param will be executed
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

    // Always overwrite with the setStateName function when using a state
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    // The second param of the post is the body, then this is why we let it null, we just want to set the headers, the third param
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id,
      }
    });

    // Always overwrite with the setStateName function when using a state
    setUsers(users.filter(user => user._id !== id));
  }

  return(
    <div className="main-container">
      <Link to="/">
        <img src={tindev} alt="logo" id="tindev-logo" />
      </Link>
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