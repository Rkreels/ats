import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { OnboardingTask, Candidate } from "@/types";
import { CalendarIcon, BarChart, CheckSquare2, Plus, Trash2, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { mockDataService } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export default function Onboarding() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<OnboardingTask[]>(mockDataService.getAllOnboardingTasks());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCandidateFilter, setSelectedCandidateFilter] = useState<string>("all");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<OnboardingTask | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [newTask, setNewTask] = useState<Partial<OnboardingTask>>({
    title: "", description: "", candidateId: "", dueDate: "", status: "Pending", assignedTo: ""
  });

  // Get hired candidates for the dropdown
  const hiredCandidates = mockDataService.getAllCandidates().filter(c => c.status === "Hired");
  
  // Get unique candidate IDs from tasks
  const candidateIdsInTasks = Array.from(new Set(tasks.map(t => t.candidateId)));
  const candidatesWithTasks = candidateIdsInTasks.map(id => {
    const candidate = mockDataService.getCandidate(id);
    return candidate ? { id, name: candidate.name, role: candidate.role } : { id, name: `Candidate ${id}`, role: "Unknown" };
  });

  const getCandidateName = (candidateId: string) => {
    const candidate = mockDataService.getCandidate(candidateId);
    return candidate ? candidate.name : `Candidate ${candidateId}`;
  };

  const filteredTasks = selectedCandidateFilter === "all" 
    ? tasks 
    : tasks.filter(t => t.candidateId === selectedCandidateFilter);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.candidateId || !newTask.dueDate) {
      toast({ title: "Missing Information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const task: OnboardingTask = {
      id: `ot-${Date.now()}`, title: newTask.title || "", description: newTask.description || "",
      candidateId: newTask.candidateId || "", dueDate: newTask.dueDate || "",
      status: (newTask.status as OnboardingTask["status"]) || "Pending", assignedTo: newTask.assignedTo || ""
    };
    mockDataService.addOnboardingTask(task);
    setTasks([...mockDataService.getAllOnboardingTasks()]);
    setNewTask({ title: "", description: "", candidateId: "", dueDate: "", status: "Pending", assignedTo: "" });
    setSelectedDate(undefined);
    setTaskDialogOpen(false);
    toast({ title: "Task Created", description: "Onboarding task has been added successfully" });
  };
  
  const updateTaskStatus = (taskId: string, newStatus: OnboardingTask["status"]) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updated = { ...task, status: newStatus };
      mockDataService.updateOnboardingTask(updated);
      setTasks([...mockDataService.getAllOnboardingTasks()]);
      toast({ title: "Status Updated", description: `Task status changed to ${newStatus}` });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    mockDataService.deleteOnboardingTask(taskId);
    setTasks([...mockDataService.getAllOnboardingTasks()]);
    toast({ title: "Task Deleted", description: "Onboarding task has been removed" });
  };

  const openEditDialog = (task: OnboardingTask) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;
    mockDataService.updateOnboardingTask(editingTask);
    setTasks([...mockDataService.getAllOnboardingTasks()]);
    setIsEditDialogOpen(false);
    setEditingTask(null);
    toast({ title: "Task Updated", description: "Onboarding task has been updated" });
  };
  
  const pendingTasks = filteredTasks.filter(task => task.status === "Pending" || task.status === "In Progress" || task.status === "Overdue");
  const completedTasks = filteredTasks.filter(task => task.status === "Completed");
  
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Onboarding Management</h1>
          <p className="text-gray-600">Track and manage new hire onboarding processes</p>
        </div>
        <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Onboarding Task</Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Create New Onboarding Task</DialogTitle>
              <DialogDescription>Add a new task to a candidate's onboarding process</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title*</Label>
                <Input id="title" value={newTask.title || ""} onChange={(e) => setNewTask({...newTask, title: e.target.value})} placeholder="e.g., Complete I-9 Form" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={newTask.description || ""} onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Candidate*</Label>
                  <Select value={newTask.candidateId || ""} onValueChange={(value) => setNewTask({...newTask, candidateId: value})}>
                    <SelectTrigger><SelectValue placeholder="Select candidate" /></SelectTrigger>
                    <SelectContent>
                      {hiredCandidates.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name} — {c.role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input id="assignedTo" value={newTask.assignedTo || ""} onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})} placeholder="e.g., HR Team" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Due Date*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) setNewTask({ ...newTask, dueDate: format(date, 'yyyy-MM-dd') });
                    }} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Candidate filter */}
      <div className="mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Filter by candidate:</span>
          <Button variant={selectedCandidateFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedCandidateFilter("all")}>
            All ({tasks.length})
          </Button>
          {candidatesWithTasks.map(c => {
            const count = tasks.filter(t => t.candidateId === c.id).length;
            return (
              <Button key={c.id} variant={selectedCandidateFilter === c.id ? "default" : "outline"} size="sm" onClick={() => setSelectedCandidateFilter(c.id)}>
                {c.name} ({count})
              </Button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Onboarding Tasks</CardTitle>
            <CardDescription>Track progress of pending and completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {pendingTasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No pending tasks</div>
                    ) : pendingTasks.map(task => (
                      <div key={task.id} className="bg-white border rounded-md p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                            <div className="flex items-center flex-wrap mt-2 gap-2 text-xs text-gray-500">
                              <Badge variant="outline">{getCandidateName(task.candidateId)}</Badge>
                              <span>Due: {task.dueDate}</span>
                              <span>Assigned: {task.assignedTo}</span>
                            </div>
                          </div>
                          <div className={cn("px-2 py-1 text-xs rounded-full ml-2 whitespace-nowrap",
                            task.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                            "bg-red-100 text-red-800"
                          )}>{task.status}</div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(task)}>Edit</Button>
                          {task.status === "Pending" && (
                            <Button variant="outline" size="sm" onClick={() => updateTaskStatus(task.id, "In Progress")}>Start Task</Button>
                          )}
                          {task.status === "In Progress" && (
                            <Button variant="default" size="sm" onClick={() => updateTaskStatus(task.id, "Completed")}>Mark Complete</Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently remove this onboarding task.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="completed">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {completedTasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No completed tasks</div>
                    ) : completedTasks.map(task => (
                      <div key={task.id} className="bg-white border rounded-md p-4 shadow-sm opacity-80">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium flex items-center">
                              <CheckSquare2 className="h-4 w-4 mr-2 text-green-600" />{task.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                            <div className="flex items-center flex-wrap mt-2 gap-2 text-xs text-gray-500">
                              <Badge variant="outline">{getCandidateName(task.candidateId)}</Badge>
                              <span>Due: {task.dueDate}</span>
                              <span>Assigned: {task.assignedTo}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Completed</div>
                            <Button variant="ghost" size="sm" onClick={() => updateTaskStatus(task.id, "Pending")} className="text-xs">Reopen</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Stats</CardTitle>
            <CardDescription>Progress overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Task Completion</h3>
                <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{width: `${tasks.length > 0 ? (tasks.filter(t => t.status === "Completed").length / tasks.length) * 100 : 0}%`}} />
                </div>
                <p className="text-sm text-gray-500 mt-2">{tasks.filter(t => t.status === "Completed").length} of {tasks.length} tasks completed</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4">Tasks by Status</h3>
                <div className="space-y-2">
                  {(["Pending", "In Progress", "Completed", "Overdue"] as const).map((status) => (
                    <div key={status} className="flex justify-between items-center">
                      <span className="text-sm">{status}</span>
                      <span className="text-sm font-medium">{tasks.filter(t => t.status === status).length}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4">By Candidate</h3>
                <div className="space-y-2">
                  {candidatesWithTasks.map(c => (
                    <div key={c.id} className="flex justify-between items-center">
                      <span className="text-sm">{c.name}</span>
                      <span className="text-sm font-medium">{tasks.filter(t => t.candidateId === c.id).length} tasks</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                toast({ title: "Report Generated", description: "Onboarding report has been generated." });
              }}>
                <BarChart className="h-4 w-4 mr-2" /> Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Onboarding Task</DialogTitle>
            <DialogDescription>Update the task details below.</DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editingTask.title} onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingTask.description} onChange={(e) => setEditingTask({...editingTask, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Input value={editingTask.assignedTo} onChange={(e) => setEditingTask({...editingTask, assignedTo: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editingTask.status} onValueChange={(value) => setEditingTask({...editingTask, status: value as OnboardingTask["status"]})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" value={editingTask.dueDate} onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
