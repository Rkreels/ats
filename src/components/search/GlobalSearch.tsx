import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, User, Briefcase, Calendar } from "lucide-react";
import { mockDataService } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "candidate" | "job" | "interview";
  url: string;
}

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        performSearch(query);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const performSearch = (searchQuery: string) => {
    const candidates = mockDataService.getAllCandidates();
    const jobs = mockDataService.getAllJobs();
    const interviews = mockDataService.getAllInterviews();

    const searchResults: SearchResult[] = [];

    // Search candidates
    candidates.forEach(candidate => {
      if (
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push({
          id: candidate.id,
          title: candidate.name,
          subtitle: `${candidate.role} • ${candidate.email}`,
          type: "candidate",
          url: `/candidates/${candidate.id}`
        });
      }
    });

    // Search jobs
    jobs.forEach(job => {
      if (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push({
          id: job.id,
          title: job.title,
          subtitle: `${job.department} • ${job.location}`,
          type: "job",
          url: "/jobs"
        });
      }
    });

    // Search interviews
    interviews.forEach(interview => {
      if (
        interview.interviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.type.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        searchResults.push({
          id: interview.id,
          title: `Interview - ${interview.type}`,
          subtitle: `${interview.interviewerName} • ${interview.date}`,
          type: "interview",
          url: "/interviews"
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
    setShowResults(true);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setQuery("");
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "candidate": return <User className="h-4 w-4" />;
      case "job": return <Briefcase className="h-4 w-4" />;
      case "interview": return <Calendar className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "candidate": return "bg-primary/10 text-primary";
      case "job": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "interview": return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const { voiceProps: searchProps } = useVoiceTrigger({
    what: "Global search to find candidates, jobs, or interviews across the entire system",
    actionStep: "Type your search query to find relevant results"
  });

  return (
    <VoiceTutorialListener
      selector="global-search"
      description="Global search functionality to find candidates, jobs, and interviews"
      actionStep="Type to search across all data in the system"
    >
      <div className="relative w-full max-w-md" {...searchProps}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search candidates, jobs, interviews..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={clearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {showResults && (
          <Card className="absolute top-full mt-1 w-full z-50 max-h-[400px] overflow-auto">
            <CardContent className="p-0">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="divide-y">
                  {results.map((result) => (
                    <VoiceTutorialListener
                      key={`${result.type}-${result.id}`}
                      selector={`search-result-${result.id}`}
                      description={`Search result: ${result.title} - ${result.type}`}
                      actionStep="Click to navigate to this item"
                    >
                      <div
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-center space-x-3">
                          {getIcon(result.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {result.subtitle}
                            </p>
                          </div>
                          <Badge className={getTypeColor(result.type)}>
                            {result.type}
                          </Badge>
                        </div>
                      </div>
                    </VoiceTutorialListener>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </VoiceTutorialListener>
  );
}