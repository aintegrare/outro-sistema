"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, where } from 'firebase/firestore'
import { Pencil, Trash2 } from 'lucide-react'

interface Task {
  id: string
  title: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  clientId: string
  projectId: string
}

interface Client {
  id: string
  name: string
}

interface Project {
  id: string
  name: string
  clientId: string
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    status: "pending",
    priority: "medium",
    clientId: "",
    projectId: ""
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  
  useEffect(() => {
    fetchTasks();
    fetchClients();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const taskList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'clients'));
      const clientList = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name } as Client));
      setClients(clientList);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projectList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addTask = async () => {
    if (newTask.title && newTask.clientId && newTask.projectId) {
      try {
        await addDoc(collection(db, 'tasks'), newTask);
        setNewTask({
          title: "",
          status: "pending",
          priority: "medium",
          clientId: "",
          projectId: ""
        });
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  }

  const updateTask = async () => {
    if (editingTask) {
      try {
        const taskRef = doc(db, 'tasks', editingTask.id);
        await updateDoc(taskRef, editingTask);
        setEditingTask(null);
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, { status: task.status === "completed" ? "pending" : "completed" });
        fetchTasks();
      } catch (error) {
        console.error("Error toggling task:", error);
      }
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Título da Tarefa</Label>
              <Input
                id="title"
                value={editingTask ? editingTask.title : newTask.title}
                onChange={(e) => editingTask
                  ? setEditingTask({...editingTask, title: e.target.value})
                  : setNewTask({...newTask, title: e.target.value})
                }
                placeholder="Adicionar nova tarefa..."
              />
            </div>
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Select
                value={editingTask ? editingTask.clientId : newTask.clientId}
                onValueChange={(value) => editingTask
                  ? setEditingTask({...editingTask, clientId: value, projectId: ""})
                  : setNewTask({...newTask, clientId: value, projectId: ""})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="project">Projeto</Label>
              <Select
                value={editingTask ? editingTask.projectId : newTask.projectId}
                onValueChange={(value) => editingTask
                  ? setEditingTask({...editingTask, projectId: value})
                  : setNewTask({...newTask, projectId: value})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects
                    .filter(project => project.clientId === (editingTask ? editingTask.clientId : newTask.clientId))
                    .map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={editingTask ? editingTask.priority : newTask.priority}
                onValueChange={(value: Task["priority"]) => editingTask
                  ? setEditingTask({...editingTask, priority: value})
                  : setNewTask({...newTask, priority: value})
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editingTask ? (
              <Button onClick={updateTask}>Atualizar Tarefa</Button>
            ) : (
              <Button onClick={addTask}>Adicionar Tarefa</Button>
            )}
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  task.status === "completed" ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div>
                    <span className={task.status === "completed" ? "line-through" : ""}>
                      {task.title}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      Cliente: {clients.find(c => c.id === task.clientId)?.name},
                      Projeto: {projects.find(p => p.id === task.projectId)?.name}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === "high" 
                      ? "bg-red-100 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select
                    value={task.status}
                    onValueChange={(value: Task["status"]) => {
                      const taskRef = doc(db, `tasks/${task.id}`);
                      updateDoc(taskRef, { status: value });
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in-progress">Em Progresso</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTask(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

