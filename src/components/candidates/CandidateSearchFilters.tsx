
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface CandidateSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  statusOptions: string[];
}

const CandidateSearchFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  statusOptions
}: CandidateSearchFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <VoiceTutorialListener
        selector="filter-search"
        description="Use this search box to quickly find candidates by name, role, or email."
        actionStep="Type to filter the candidate list as you enter text."
      >
        <div className="space-y-2">
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
      </VoiceTutorialListener>
      <VoiceTutorialListener
        selector="filter-status"
        description="Filter candidates based on current hiring status."
        actionStep="Select a status from the dropdown."
      >
        <div className="space-y-2">
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
      </VoiceTutorialListener>
      <VoiceTutorialListener
        selector="filter-sort"
        description="Sort the candidate list by name, role, or applied date in the desired order."
        actionStep="Choose the sort criteria and direction."
      >
        <div className="space-y-2">
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
      </VoiceTutorialListener>
    </div>
  );
};
export default CandidateSearchFilters;
