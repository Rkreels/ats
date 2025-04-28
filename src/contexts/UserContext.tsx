
import { createContext, useState, useContext, ReactNode } from "react";

// Define user roles
export type UserRole = "admin" | "hr_manager" | "interviewer" | "hiring_manager" | "viewer";

// Define permissions for each functionality
export interface Permissions {
  canCreateJob: boolean;
  canEditJob: boolean;
  canDeleteJob: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canViewCandidates: boolean;
  canEditCandidates: boolean;
  canScheduleInterviews: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  permissions: Permissions;
  hasPermission: (permission: keyof Permissions) => boolean;
  logout: () => void;
}

// Define role-based permissions
const rolePermissions: Record<UserRole, Permissions> = {
  admin: {
    canCreateJob: true,
    canEditJob: true,
    canDeleteJob: true,
    canViewReports: true,
    canManageUsers: true,
    canViewCandidates: true,
    canEditCandidates: true,
    canScheduleInterviews: true
  },
  hr_manager: {
    canCreateJob: true,
    canEditJob: true,
    canDeleteJob: false,
    canViewReports: true,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: true,
    canScheduleInterviews: true
  },
  interviewer: {
    canCreateJob: false,
    canEditJob: false,
    canDeleteJob: false,
    canViewReports: false,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: true
  },
  hiring_manager: {
    canCreateJob: true,
    canEditJob: true,
    canDeleteJob: false,
    canViewReports: true,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: true
  },
  viewer: {
    canCreateJob: false,
    canEditJob: false,
    canDeleteJob: false,
    canViewReports: false,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: false
  }
};

// Default admin user
const defaultUser: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  avatar: "",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  
  const permissions = rolePermissions[currentUser.role];
  
  const hasPermission = (permission: keyof Permissions) => {
    return permissions[permission];
  };
  
  const logout = () => {
    setCurrentUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      permissions, 
      hasPermission,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
