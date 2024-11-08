"use client";
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  age: number;
  // Add other user fields as needed
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/mongodb/user`);
        const data = await res.json();
        console.log('Users:', data);
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div  className="relative min-h-screen">
      <h1>User List</h1>
      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Age:</strong> {user.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPage;