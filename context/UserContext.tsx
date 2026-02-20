"use client";

import { createContext, useContext, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  phone: string;
};

type UserContextType = {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
};

const defaultProfile: UserProfile = {
  name: "Jeongwoo",
  email: "jeongjeong@email.com",
  role: "Product Designer",
  bio: "Passionate about building clean and useful interfaces.",
  location: "Jakarta, Indonesia",
  phone: "+62 812 3456 7890",
};

const UserContext = createContext<UserContextType>({
  profile: defaultProfile,
  setProfile: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}