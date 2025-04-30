"use client";

import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Switch from "../components/ui/Switch";
import { Bell, Moon, User, Shield, LogOut } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  position: string;
  teams: string[];
}

const initialProfile: ProfileData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  position: "Point Guard",
  teams: ["Downtown Basketball League", "City Championship"],
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving profile:", profile);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card title="Personal Information">
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Position"
                  name="position"
                  value={profile.position}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <div className="pt-4 flex justify-end space-x-3">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <Card title="Teams">
              <div className="space-y-4">
                {profile.teams.map((team, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">{team}</span>
                    <Button variant="outline" size="sm">
                      View Team
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="App Settings">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Dark Mode
                    </span>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Notifications
                    </span>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card title="Notification Preferences">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Game Reminders</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Score Updates</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Team Announcements
                  </span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">League Updates</span>
                  <Switch />
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="outline" fullWidth className="justify-start">
                <Shield size={18} className="mr-2" />
                Privacy Settings
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
