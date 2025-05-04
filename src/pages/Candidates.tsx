
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDataService } from "@/data/mockData";
import { Candidate } from "@/types";
import { AddCandidateForm } from "@/components/candidates/AddCandidateForm";
import CandidateSearchFilters from "@/components/candidates/CandidateSearchFilters";
import CandidateTable from "@/components/candidates/CandidateTable";

export default function Candidates() {
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

  // Candidate status options
  const statusOptions = ["All", "Applied", "Screen", "Interview", "Offer", "Hired", "Rejected"];

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
      const aValue = a[sortBy as keyof Candidate];
      const bValue = b[sortBy as keyof Candidate];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });

  const deleteCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
          <p className="text-gray-600">Manage your candidate pipeline</p>
        </div>
        <AddCandidateForm />
      </div>

      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Candidate Pipeline</CardTitle>
          <CardDescription>Track candidates through each stage of the hiring process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CandidateSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusOptions={statusOptions}
          />
          
          <CandidateTable 
            candidates={filteredCandidates}
            onDelete={deleteCandidate}
          />
        </CardContent>
      </Card>
    </>
  );
}
