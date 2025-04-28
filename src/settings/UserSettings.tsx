
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser, UserRole } from "@/contexts/UserContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Invited" | "Inactive";
}

export default function UserSettings() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "admin",
      status: "Active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "hr_manager",
      status: "Active"
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "hiring_manager",
      status: "Invited"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "interviewer",
      status: "Active"
    }
  ]);

  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer" as UserRole
  });

  const { voiceProps } = useVoiceTrigger({
    what: "Manage team members and their access permissions to the ATS system. As an administrator, you can add new users, edit their roles, and control who has access to different features."
  });

  const { voiceProps: tableProps } = useVoiceTrigger({
    what: "This table displays all users in your ATS system. You can see their name, email, role, and current status."
  });

  const { voiceProps: addUserProps } = useVoiceTrigger({
    what: "Click this button to invite new users to your ATS system. You can set their name, email, and role during the invitation process."
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newUserWithId: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Invited"
    };

    setUsers([...users, newUserWithId]);
    setIsAddUserDialogOpen(false);
    resetNewUserForm();

    toast({
      title: "User invited",
      description: `An invitation has been sent to ${newUser.email}`
    });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);

    toast({
      title: "User updated",
      description: `User ${selectedUser.name} has been updated`
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User removed",
      description: "User has been removed from the system"
    });
  };

  const openEditDialog = (user: User) => {
    setSelectedUser({...user});
    setIsEditUserDialogOpen(true);
  };

  const resetNewUserForm = () => {
    setNewUser({
      name: "",
      email: "",
      role: "viewer"
    });
  };

  // Check if user has permission to manage users
  if (!hasPermission('canManageUsers')) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users & Roles</CardTitle>
          <CardDescription>Manage team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-2">You don't have permission to manage users</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>Users & Roles</CardTitle>
        <CardDescription>Manage team members and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md mb-6" {...tableProps}>
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-3 font-medium text-gray-500">Name</th>
                <th className="p-3 font-medium text-gray-500">Email</th>
                <th className="p-3 font-medium text-gray-500">Role</th>
                <th className="p-3 font-medium text-gray-500">Status</th>
                <th className="p-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                  <td className="p-3">
                    <span className={cn(
                      "rounded-full px-2 py-1 text-xs",
                      user.status === "Active" ? "bg-green-100 text-green-700" :
                      user.status === "Invited" ? "bg-amber-100 text-amber-700" : 
                      "bg-gray-100 text-gray-700"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEditDialog(user)}
                        {...useVoiceTrigger({ 
                          what: `Edit ${user.name}'s profile including their role and permissions.` 
                        }).voiceProps}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            {...useVoiceTrigger({ 
                              what: `Remove ${user.name} from the system. This will revoke all their access.` 
                            }).voiceProps}
                          >
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove {user.name} from the system and revoke all access. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Remove</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Button {...addUserProps} onClick={() => setIsAddUserDialogOpen(true)}>
          Invite User
        </Button>

        {/* Add User Dialog */}
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to join your ATS system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="hr_manager">HR Manager</SelectItem>
                    <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                    <SelectItem value="interviewer">Interviewer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddUser}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Modify user details and permissions.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input 
                    id="edit-name" 
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={selectedUser.role} 
                    onValueChange={(value: UserRole) => setSelectedUser({...selectedUser, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="hr_manager">HR Manager</SelectItem>
                      <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                      <SelectItem value="interviewer">Interviewer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={selectedUser.status} 
                    onValueChange={(value: "Active" | "Invited" | "Inactive") => setSelectedUser({...selectedUser, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Invited">Invited</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

// Helper function to conditionally join classNames
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
