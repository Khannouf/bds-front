import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Définissez le type de l'objet user
interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  classe: string;
  fiiere: string;
  role: string;
  token: string | null
}

// Définissez le type du context
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Créez un context avec une valeur initiale (ici, null)
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

// Créez un fournisseur de context qui sera utilisé pour envelopper votre application
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    console.log(storedUserString);
    const token = localStorage.getItem("token")
    console.log(token);
    
    
    if (storedUserString) {
      const parsedUser: User = JSON.parse(storedUserString);
      const userWithToken = {
        ...parsedUser,
        token : token,
      }
      setUser(userWithToken);
      console.log(userWithToken);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Utilitaire pour utiliser le context dans un composant
export const useUserContext = () => useContext(UserContext)