import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, X, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

export default function NotificationCenter() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Application Received",
      message: "John Smith applied for Frontend Developer position",
      type: "info",
      timestamp: "2024-01-10T10:30:00Z",
      read: false,
      actionRequired: true
    },
    {
      id: "2",
      title: "Interview Reminder",
      message: "Interview with Alice Johnson scheduled in 2 hours",
      type: "warning",
      timestamp: "2024-01-10T08:00:00Z",
      read: false,
      actionRequired: true
    },
    {
      id: "3",
      title: "Application Status Updated",
      message: "Bob Williams has been moved to 'Offer' stage",
      type: "success",
      timestamp: "2024-01-09T16:45:00Z",
      read: true
    },
    {
      id: "4",
      title: "Job Posting Expired",
      message: "Marketing Specialist position has expired",
      type: "error",
      timestamp: "2024-01-09T00:00:00Z",
      read: false,
      actionRequired: true
    }
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared"
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case "success": return <Check className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "error": return <X className="h-5 w-5 text-destructive" />;
      default: return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning": return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "success": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "error": return "bg-destructive/10 text-destructive";
      default: return "bg-primary/10 text-primary";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <VoiceTutorialListener
      selector="notification-center"
      description="Your notification center showing important updates and alerts"
      actionStep="View, mark as read, or take action on notifications"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Stay updated with important events</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <VoiceTutorialListener
                    key={notification.id}
                    selector={`notification-${notification.id}`}
                    description={`${notification.type} notification: ${notification.title}`}
                    actionStep={notification.actionRequired ? "This notification requires action" : "Click to mark as read"}
                  >
                    <div
                      className={`p-4 border rounded-lg transition-colors ${
                        notification.read 
                          ? "bg-muted/30" 
                          : "bg-card border-l-4 border-l-primary"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                                {notification.title}
                              </h4>
                              <Badge className={getTypeColor(notification.type)}>
                                {notification.type}
                              </Badge>
                              {notification.actionRequired && (
                                <Badge variant="outline" className="text-orange-600 border-orange-600">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <p className={`text-sm ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </VoiceTutorialListener>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}