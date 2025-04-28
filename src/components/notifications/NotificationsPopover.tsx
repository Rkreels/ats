
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
};

export const NotificationsPopover = () => {
  // Mock notifications - in a real app these would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Candidate",
      message: "Alex Johnson has applied for Software Engineer position",
      date: "10 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Interview Reminder",
      message: "Interview with Sarah Smith scheduled at 2:00 PM today",
      date: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: "3",
      title: "Hiring Approved",
      message: "Marketing Manager position approved for hiring",
      date: "Yesterday",
      read: true,
      type: "success",
    },
    {
      id: "4",
      title: "Feedback Required",
      message: "Please provide feedback for Michael Brown's interview",
      date: "2 days ago",
      read: true,
      type: "error",
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-xs h-auto py-1"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    "cursor-pointer p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors",
                    !notification.read && "bg-blue-50"
                  )}
                >
                  <div className="flex items-start">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 mr-2",
                        notification.type === "info" && "bg-blue-500",
                        notification.type === "warning" && "bg-yellow-500",
                        notification.type === "success" && "bg-green-500",
                        notification.type === "error" && "bg-red-500"
                      )}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
