
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User, Link } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Candidate } from "@/types";

interface CandidateInfoProps {
  candidate: Candidate;
}

export function CandidateInfo({ candidate }: CandidateInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Information</CardTitle>
        <CardDescription>Details about the candidate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-500">{candidate.role}</p>
            <div className="mt-2 space-y-1">
              <p className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {candidate.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {candidate.experience} years experience
              </p>
              <p className="flex items-center text-gray-600">
                <Link className="h-4 w-4 mr-2" />
                {candidate.location}
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <ul className="list-disc list-inside text-gray-600">
              {candidate.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <p className="text-gray-600">{candidate.education}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
