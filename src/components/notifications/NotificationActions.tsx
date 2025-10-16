import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Archive, Star } from "lucide-react";

interface NotificationActionsProps {
  notificationId: string;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onStar?: (id: string) => void;
}

export default function NotificationActions({
  notificationId,
  onMarkAsRead,
  onDelete,
  onArchive,
  onStar
}: NotificationActionsProps) {
  const { toast } = useToast();

  const handleMarkAsRead = () => {
    onMarkAsRead?.(notificationId);
    toast({
      title: "Marked as read",
      description: "Notification marked as read"
    });
  };

  const handleDelete = () => {
    onDelete?.(notificationId);
    toast({
      title: "Notification deleted",
      description: "Notification has been removed"
    });
  };

  const handleArchive = () => {
    onArchive?.(notificationId);
    toast({
      title: "Notification archived",
      description: "Notification moved to archive"
    });
  };

  const handleStar = () => {
    onStar?.(notificationId);
    toast({
      title: "Notification starred",
      description: "Notification marked as important"
    });
  };

  return (
    <div className="flex space-x-1">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleMarkAsRead}
        className="h-6 w-6 p-0"
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleStar}
        className="h-6 w-6 p-0"
      >
        <Star className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleArchive}
        className="h-6 w-6 p-0"
      >
        <Archive className="h-3 w-3" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleDelete}
        className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}