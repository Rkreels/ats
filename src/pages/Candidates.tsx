
import { useState, useEffect } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockDataService } from "@/data/mockData";
import { Candidate } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";

export default function Candidates() {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Fetch candidates on mount
    const initialCandidates = mockDataService.getAllCandidates();
    setCandidates(initialCandidates);
  }, []);

  // Voice tutorials with improved descriptions
  const { voiceProps: candidateOverviewProps } = useVoiceTrigger({
    what: "Welcome to the candidate pipeline. Here you can see all applicants and track them through different stages of the hiring process. You can search for candidates, filter them by status, and sort them in different ways."
  });

  const { voiceProps: searchVoiceProps } = useVoiceTrigger({
    what: "Type in this search box to find candidates by their name, role, or email address. The list will update as you type."
  });

  const { voiceProps: filterVoiceProps } = useVoiceTrigger({
    what: "Use this dropdown to filter candidates by their current status. Select options like Applied, Interview, Offer, or Hired to see only candidates in that stage."
  });

  const { voiceProps: sortVoiceProps } = useVoiceTrigger({
    what: "Sort your candidate list by name, role, or application date. You can also choose between ascending and descending order."
  });

  // Filtered and sorted candidates
  const filteredCandidates = candidates
    .filter(candidate => {
      const searchRegex = new RegExp(searchTerm, 'i');
      return searchRegex.test(candidate.name) ||
             searchRegex.test(candidate.role) ||
             searchRegex.test(candidate.email);
    })
    .filter(candidate => {
      return statusFilter === "All" || candidate.status === statusFilter;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });

  // Candidate status options
  const statusOptions = ["All", "Applied", "Screen", "Interview", "Offer", "Hired", "Rejected"];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
          <p className="text-gray-600">Manage your candidate pipeline</p>
        </div>
      </div>

      <Card className="space-y-4" {...candidateOverviewProps}>
        <CardHeader>
          <CardTitle>Candidate Pipeline</CardTitle>
          <CardDescription>Track candidates through each stage of the hiring process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2" {...searchVoiceProps}>
              <Label htmlFor="search">Search Candidates</Label>
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Search by name, role, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2" {...filterVoiceProps}>
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2" {...sortVoiceProps}>
              <Label htmlFor="sort">Sort By</Label>
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue placeholder="Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="role">Role</SelectItem>
                    <SelectItem value="appliedDate">Applied Date</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger id="order">
                    <SelectValue placeholder="Asc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <ScrollArea className="rounded-md border h-[400px] w-full">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Applied Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map(candidate => (
                    <tr key={candidate.id} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                        <Avatar className="mr-3">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {candidate.name}
                      </th>
                      <td className="px-6 py-4">
                        {candidate.role}
                      </td>
                      <td className="px-6 py-4">
                        {candidate.status}
                      </td>
                      <td className="px-6 py-4">
                        {candidate.appliedDate}
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setCandidates(candidates.filter(c => c.id !== candidate.id));
                              toast({
                                title: "Candidate deleted",
                                description: `The candidate "${candidate.name}" has been deleted.`
                              });
                            }}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                View Resume
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
