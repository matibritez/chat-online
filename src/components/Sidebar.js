import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = () => {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendId, setFriendId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(storedId);
      fetchFriends(storedId);
    }
  }, []);

  const fetchFriends = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_friends/${id}`);
      setFriends(response.data.friends || []);
    } catch (err) {
      console.error("Error al obtener amigos:", err);
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/add_friend", {
        user_id: userId,
        friend_id: friendId,
      });
      if (response.data.success) {
        alert("Amigo añadido exitosamente");
        fetchFriends(userId); // Actualizar la lista de amigos
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Error al añadir amigo:", err);
      alert("No se pudo añadir el amigo. Intenta de nuevo.");
    }
  };

  return (
    <div className="sidebar">
      <div className="profile-pic">
        <img
          src={`https://api.dicebear.com/6.x/personas/svg?seed=${Math.random()}`}
          alt="Perfil"
        />
      </div>
      <h3>Mi ID único: <span style={{ color: "#007BFF" }}>{userId}</span></h3>
      <h3>Amigos conectados</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => alert(`Chateando con ${friend.username}`)}>
            {friend.username}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Ingresar ID de amigo"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <button onClick={handleAddFriend}>Añadir Amigo</button>
    </div>
  );
};

export default Sidebar;
