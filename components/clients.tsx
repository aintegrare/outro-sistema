"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [newClient, setNewClient] = useState<Omit<Client, "id">>({
    name: "",
    email: "",
    phone: ""
  })
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'clients'));
      const clientList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
      setClients(clientList);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const addClient = async () => {
    if (newClient.name && newClient.email) {
      try {
        await addDoc(collection(db, 'clients'), newClient);
        setNewClient({
          name: "",
          email: "",
          phone: ""
        });
        fetchClients();
      } catch (error) {
        console.error("Error adding client:", error);
      }
    }
  }

  const updateClient = async () => {
    if (editingClient && editingClient.name && editingClient.email) {
      try {
        const clientRef = doc(db, 'clients', editingClient.id);
        await updateDoc(clientRef, {
          name: editingClient.name,
          email: editingClient.email,
          phone: editingClient.phone
        });
        setEditingClient(null);
        fetchClients();
      } catch (error) {
        console.error("Error updating client:", error);
      }
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'clients', id));
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editingClient ? editingClient.name : newClient.name}
                onChange={(e) => editingClient 
                  ? setEditingClient({...editingClient, name: e.target.value})
                  : setNewClient({...newClient, name: e.target.value})
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editingClient ? editingClient.email : newClient.email}
                onChange={(e) => editingClient
                  ? setEditingClient({...editingClient, email: e.target.value})
                  : setNewClient({...newClient, email: e.target.value})
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={editingClient ? editingClient.phone : newClient.phone}
                onChange={(e) => editingClient
                  ? setEditingClient({...editingClient, phone: e.target.value})
                  : setNewClient({...newClient, phone: e.target.value})
                }
              />
            </div>
            {editingClient ? (
              <Button onClick={updateClient}>Atualizar Cliente</Button>
            ) : (
              <Button onClick={addClient}>Adicionar Cliente</Button>
            )}
          </div>

          <div className="space-y-4 mt-4">
            {clients.map(client => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{client.name}</h4>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  {client.phone && <p className="text-sm text-muted-foreground">{client.phone}</p>}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingClient(client)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteClient(client.id)}
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

