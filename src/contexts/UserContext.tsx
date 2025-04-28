
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
  canIntegrateExternalServices: boolean;
}

export interface User {
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
  switchUser: (userId: string) => void;
  availableUsers: User[];
  updateUserPermissions: (role: UserRole, updatedPermissions: Partial<Permissions>) => void;
  getRolePermissions: (role: UserRole) => Permissions;
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
    canScheduleInterviews: true,
    canIntegrateExternalServices: true
  },
  hr_manager: {
    canCreateJob: true,
    canEditJob: true,
    canDeleteJob: false,
    canViewReports: true,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: true,
    canScheduleInterviews: true,
    canIntegrateExternalServices: false
  },
  interviewer: {
    canCreateJob: false,
    canEditJob: false,
    canDeleteJob: false,
    canViewReports: false,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: true,
    canIntegrateExternalServices: false
  },
  hiring_manager: {
    canCreateJob: true,
    canEditJob: true,
    canDeleteJob: false,
    canViewReports: true,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: true,
    canIntegrateExternalServices: false
  },
  viewer: {
    canCreateJob: false,
    canEditJob: false,
    canDeleteJob: false,
    canViewReports: false,
    canManageUsers: false,
    canViewCandidates: true,
    canEditCandidates: false,
    canScheduleInterviews: false,
    canIntegrateExternalServices: false
  }
};

// List of demo users
const demoUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "hrm-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "hr_manager",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "int-1",
    name: "David Wong",
    email: "david@example.com",
    role: "interviewer",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: "hmg-1",
    name: "Emily Chen",
    email: "emily@example.com",
    role: "hiring_manager",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "view-1",
    name: "Mike Roberts",
    email: "mike@example.com",
    role: "viewer",
    avatar: "https://i.pravatar.cc/150?img=53",
  }
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Default user is now the admin
  const [currentUser, setCurrentUser] = useState<User>(demoUsers[0]);
  const [localRolePermissions, setLocalRolePermissions] = useState<Record<UserRole, Permissions>>({...rolePermissions});
  
  const permissions = localRolePermissions[currentUser.role];
  
  const hasPermission = (permission: keyof Permissions) => {
    return permissions[permission];
  };
  
  const logout = () => {
    setCurrentUser(demoUsers[0]);
  };

  const switchUser = (userId: string) => {
    const user = demoUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const updateUserPermissions = (role: UserRole, updatedPermissions: Partial<Permissions>) => {
    setLocalRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        ...updatedPermissions
      }
    }));
  };

  const getRolePermissions = (role: UserRole): Permissions => {
    return localRolePermissions[role];
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser,
      permissions,
      hasPermission,
      logout,
      switchUser,
      availableUsers: demoUsers,
      updateUserPermissions,
      getRolePermissions
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
