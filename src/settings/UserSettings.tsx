
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

export default function UserSettings() {
  const { voiceProps } = useVoiceTrigger({
    what: "Manage team members and their access permissions to the ATS system."
  });

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>Users & Roles</CardTitle>
        <CardDescription>Manage team members and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md mb-6">
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
              <tr className="border-b">
                <td className="p-3">John Smith</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">Admin</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">
                    Active
                  </span>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Sarah Johnson</td>
                <td className="p-3">sarah@example.com</td>
                <td className="p-3">HR Manager</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">
                    Active
                  </span>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Michael Brown</td>
                <td className="p-3">michael@example.com</td>
                <td className="p-3">Hiring Manager</td>
                <td className="p-3">
                  <span className="bg-amber-100 text-amber-700 rounded-full px-2 py-1 text-xs">
                    Invited
                  </span>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <Button>
          Invite User
        </Button>
      </CardContent>
    </Card>
  );
}
