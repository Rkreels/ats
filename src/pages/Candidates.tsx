import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDataService } from "@/data/mockData";
import { Candidate } from "@/types";
import { AddCandidateForm } from "@/components/candidates/AddCandidateForm";
import CandidateSearchFilters from "@/components/candidates/CandidateSearchFilters";
import CandidateTable from "@/components/candidates/CandidateTable";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

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
    const success = mockDataService.deleteCandidate(id);
    if (success) {
      setCandidates(mockDataService.getAllCandidates());
    }
  };

  const handleAddCandidate = (newCandidate: Omit<Candidate, "id">) => {
    const candidate = mockDataService.addCandidate(newCandidate);
    setCandidates(mockDataService.getAllCandidates());
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
          <p className="text-gray-600">Manage your candidate pipeline</p>
        </div>
        <VoiceTutorialListener
          selector="candidates-add"
          description="Add a new candidate to your talent pool."
          actionStep="Fill out the required candidate information and submit."
        >
          <AddCandidateForm onAdd={handleAddCandidate} />
        </VoiceTutorialListener>
      </div>
      <VoiceTutorialListener
        selector="candidates-pipeline-card"
        description="This section shows your candidate pipeline, filtering and sorting features."
        actionStep="Use the filters and actions to manage, search, or update candidates."
      >
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Candidate Pipeline</CardTitle>
            <CardDescription>Track candidates through each stage of the hiring process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <VoiceTutorialListener
              selector="candidates-filters"
              description="Filter, search, or sort the list of candidates."
              actionStep="Adjust the filters or search and see the results update below."
            >
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
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="candidates-table"
              description="This table lists all candidates filtered by your criteria. Actions are available on each row."
              actionStep="Use the row actions to view details, edit, or delete a candidate."
            >
              <CandidateTable 
                candidates={filteredCandidates}
                onDelete={deleteCandidate}
              />
            </VoiceTutorialListener>
          </CardContent>
        </Card>
      </VoiceTutorialListener>
    </>
  );
}
