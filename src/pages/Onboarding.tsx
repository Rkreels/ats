
import React, { useState } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { OnboardingTask } from "@/types";
import { CalendarIcon, BarChart, CheckSquare2, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Sample onboarding tasks
const sampleTasks: OnboardingTask[] = [
  {
    id: "task1",
    candidateId: "c-101",
    title: "Complete I-9 Form",
    description: "Fill out I-9 employment eligibility verification form",
    dueDate: "2025-05-15",
    status: "Pending",
    assignedTo: "HR Team"
  },
  {
    id: "task2",
    candidateId: "c-101",
    title: "Set up workstation",
    description: "Prepare laptop, monitor, and desk for new hire",
    dueDate: "2025-05-12",
    status: "In Progress",
    assignedTo: "IT Department"
  },
  {
    id: "task3",
    candidateId: "c-101",
    title: "Schedule orientation",
    description: "Arrange company orientation session",
    dueDate: "2025-05-18",
    status: "Completed",
    assignedTo: "HR Team"
  },
  {
    id: "task4",
    candidateId: "c-102",
    title: "Background check",
    description: "Complete background verification process",
    dueDate: "2025-06-01",
    status: "Pending",
    assignedTo: "Compliance Team"
  }
];

export default function Onboarding() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<OnboardingTask[]>(sampleTasks);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newTask, setNewTask] = useState<Partial<OnboardingTask>>({
    title: "",
    description: "",
    candidateId: "",
    dueDate: "",
    status: "Pending",
    assignedTo: ""
  });
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  // Voice tutorials
  const { voiceProps } = useVoiceTrigger({
    what: "This is the onboarding management page. Here you can create and track onboarding tasks for new hires.",
    actionStep: "Browse through tasks, create new ones, and update their status."
  });
  
  const handleAddTask = () => {
    if (!newTask.title || !newTask.candidateId || !newTask.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const task: OnboardingTask = {
      id: `task${tasks.length + 1}`,
      title: newTask.title || "",
      description: newTask.description || "",
      candidateId: newTask.candidateId || "",
      dueDate: newTask.dueDate || "",
      status: newTask.status as "Pending" | "In Progress" | "Completed" | "Overdue" || "Pending",
      assignedTo: newTask.assignedTo || ""
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      candidateId: "",
      dueDate: "",
      status: "Pending",
      assignedTo: ""
    });
    
    setTaskDialogOpen(false);
    
    toast({
      title: "Task Created",
      description: "Onboarding task has been added successfully"
    });
  };
  
  const updateTaskStatus = (taskId: string, newStatus: OnboardingTask["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Status Updated",
      description: `Task status has been updated to ${newStatus}`
    });
  };
  
  const pendingTasks = tasks.filter(task => task.status === "Pending" || task.status === "In Progress");
  const completedTasks = tasks.filter(task => task.status === "Completed");
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Onboarding Management</h1>
          <p className="text-gray-600">Track and manage new hire onboarding processes</p>
        </div>
        
        <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Onboarding Task
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Create New Onboarding Task</DialogTitle>
              <DialogDescription>
                Add a new task to a candidate's onboarding process
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  value={newTask.title || ""} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newTask.description || ""} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateId">Candidate ID</Label>
                  <Input 
                    id="candidateId" 
                    value={newTask.candidateId || ""} 
                    onChange={(e) => setNewTask({...newTask, candidateId: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input 
                    id="assignedTo" 
                    value={newTask.assignedTo || ""} 
                    onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (date) {
                          setNewTask({
                            ...newTask, 
                            dueDate: format(date, 'yyyy-MM-dd')
                          });
                        }
                      }}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" {...voiceProps}>
          <CardHeader>
            <CardTitle>Onboarding Tasks</CardTitle>
            <CardDescription>Track progress of pending and completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending Tasks</TabsTrigger>
                <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {pendingTasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No pending tasks
                      </div>
                    ) : (
                      pendingTasks.map(task => (
                        <div key={task.id} className="bg-white border rounded-md p-4 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{task.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                              
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>Candidate ID: {task.candidateId}</span>
                                <span className="mx-2">•</span>
                                <span>Due: {task.dueDate}</span>
                                <span className="mx-2">•</span>
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className={cn(
                                "px-2 py-1 text-xs rounded-full",
                                task.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                task.status === "Overdue" ? "bg-red-100 text-red-800" : ""
                              )}>
                                {task.status}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            {task.status === "Pending" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateTaskStatus(task.id, "In Progress")}
                              >
                                Start Task
                              </Button>
                            )}
                            
                            {task.status === "In Progress" && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => updateTaskStatus(task.id, "Completed")}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="completed">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {completedTasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No completed tasks
                      </div>
                    ) : (
                      completedTasks.map(task => (
                        <div key={task.id} className="bg-white border rounded-md p-4 shadow-sm opacity-80">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium flex items-center">
                                <CheckSquare2 className="h-4 w-4 mr-2 text-green-600" />
                                {task.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                              
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>Candidate ID: {task.candidateId}</span>
                                <span className="mx-2">•</span>
                                <span>Due: {task.dueDate}</span>
                                <span className="mx-2">•</span>
                                <span>Assigned to: {task.assignedTo}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                                Completed
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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
                  <div 
                    className="bg-green-500 h-full rounded-full" 
                    style={{width: `${(completedTasks.length / tasks.length) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {completedTasks.length} of {tasks.length} tasks completed
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4">Tasks by Status</h3>
                <div className="space-y-2">
                  {["Pending", "In Progress", "Completed", "Overdue"].map((status) => {
                    const count = tasks.filter(t => t.status === status).length;
                    return (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-sm">{status}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4">Assigned Teams</h3>
                <div className="space-y-2">
                  {Array.from(new Set(tasks.map(t => t.assignedTo))).map((team) => {
                    const count = tasks.filter(t => t.assignedTo === team).length;
                    return (
                      <div key={team} className="flex justify-between items-center">
                        <span className="text-sm">{team}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Report Generated",
                  description: "Onboarding report has been generated and downloaded."
                });
              }}>
                <BarChart className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
