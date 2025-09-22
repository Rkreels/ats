import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Search, User, Briefcase, Calendar } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "candidate" | "job" | "interview";
  url: string;
}

interface SearchResultsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  query: string;
}

export default function SearchResultsDialog({
  isOpen,
  onClose,
  results,
  query
}: SearchResultsDialogProps) {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case "candidate": return User;
      case "job": return Briefcase;
      case "interview": return Calendar;
      default: return Search;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "candidate": return "bg-blue-100 text-blue-800";
      case "job": return "bg-green-100 text-green-800";
      case "interview": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Search Results for "{query}"</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{query}"</p>
              </div>
            ) : (
              results.map((result) => {
                const Icon = getIcon(result.type);
                return (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <Icon className="h-5 w-5 mt-0.5 text-gray-500" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{result.title}</h4>
                          <Badge className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.subtitle}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}