"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Globe, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'

interface Domain {
  id: string
  name: string
  status: "active" | "pending" | "expired"
  expirationDate: string
  registrar: string
}

export function Domains() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [newDomain, setNewDomain] = useState<Omit<Domain, "id" | "status">>({
    name: "",
    expirationDate: "",
    registrar: ""
  })

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'domains'));
      const domainList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Domain));
      setDomains(domainList);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  const addDomain = async () => {
    if (newDomain.name && newDomain.expirationDate) {
      try {
        await addDoc(collection(db, 'domains'), {
          ...newDomain,
          status: "active"
        });
        setNewDomain({
          name: "",
          expirationDate: "",
          registrar: ""
        });
        fetchDomains();
      } catch (error) {
        console.error("Error adding domain:", error);
      }
    }
  }

  const getStatusIcon = (status: Domain["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "expired":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: Domain["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domínios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="domain">Nome do Domínio</Label>
              <Input
                id="domain"
                value={newDomain.name}
                onChange={(e) => setNewDomain({...newDomain, name: e.target.value})}
                placeholder="exemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="expiration">Data de Expiração</Label>
              <Input
                id="expiration"
                type="date"
                value={newDomain.expirationDate}
                onChange={(e) => setNewDomain({...newDomain, expirationDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="registrar">Registrador</Label>
              <Input
                id="registrar"
                value={newDomain.registrar}
                onChange={(e) => setNewDomain({...newDomain, registrar: e.target.value})}
              />
            </div>
            <Button onClick={addDomain}>Adicionar Domínio</Button>
          </div>

          <div className="space-y-4">
            {domains.map(domain => (
              <div
                key={domain.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{domain.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {domain.registrar}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Expira em: {new Date(domain.expirationDate).toLocaleDateString()}
                  </div>
                  <Badge className={getStatusColor(domain.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(domain.status)}
                      {domain.status}
                    </span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

