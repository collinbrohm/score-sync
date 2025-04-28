'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './PlayerProfile.module.css';

export default function PlayerProfile() {
  const router = useRouter();

  const [screenName, setScreenName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('/defaultProfile.svg'); // default

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!screenName || !description) {
      alert('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('screenName', screenName);
    formData.append('description', description);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('http://localhost:3000/api/player-profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        router.push('/Dashboard');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Your Player Profile</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        {/* Profile Image Preview */}
        <div className={styles.imagePreviewContainer}>
          <Image
            src={previewUrl}
            alt="Profile Preview"
            width={100}
            height={100}
            className={styles.profileImage}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </div>

        {/* Screen Name */}
        <label className={styles.label} htmlFor="screenName">Screen Name</label>
        <input
          id="screenName"
          type="text"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
          className={styles.input}
          placeholder="Enter your screen name"
          required
        />

        {/* Description */}
        <label className={styles.label} htmlFor="description">Description (e.g., #10 PG)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Write about yourself..."
          required
        />

        <button type="submit" className={styles.saveButton}>Save Profile</button>
      </form>
    </div>
  );
}
