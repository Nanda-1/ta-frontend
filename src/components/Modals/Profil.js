
import React from 'react';

export default function Profil() {
  const userProfile = {
    name: 'John Doe',
    age: 30,
    bio: 'Halo, saya seorang pengguna ReactJS.',
    avatar: 'url_gambar_anda.jpg', // Ganti dengan URL gambar profil Anda
  };

  return (
    <div>
      <h1>{userProfile.name}</h1>
      <img src={userProfile.avatar} alt={userProfile.name} style={{ width: 200, height: 'auto' }} />
      <p>Usia: {userProfile.age}</p>
      <p>{userProfile.bio}</p>
    </div>
  );
};


