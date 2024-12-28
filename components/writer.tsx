"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Wand2 } from 'lucide-react'
import { db } from "@/lib/firebase"
import { collection, addDoc } from 'firebase/firestore'

export function Writer() {
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("professional")
  const [content, setContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = async () => {
    if (!topic) return

    setIsGenerating(true)
    // Simulating AI response
    await new Promise(resolve => setTimeout(resolve, 2000))
    setContent(`Conteúdo gerado para o tópico: ${topic}\n\nEste é um exemplo de texto gerado com tom ${tone}...`)
    setIsGenerating(false)
  }

  const saveArticle = async () => {
    if (topic && content) {
      try {
        await addDoc(collection(db, 'articles'), {
          title: topic,
          content,
          status: "draft",
          createdAt: new Date().toISOString()
        });
        setTopic("");
        setContent("");
        alert("Artigo salvo com sucesso!");
      } catch (error) {
        console.error("Error saving article:", error);
        alert("Erro ao salvar o artigo. Por favor, tente novamente.");
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Writer AI</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="topic">Tópico</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sobre o que você quer escrever?"
            />
          </div>
          
          <div>
            <Label htmlFor="tone">Tom da Escrita</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Profissional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Amigável</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateContent} 
            disabled={!topic || isGenerating}
            className="w-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isGenerating ? "Gerando..." : "Gerar Conteúdo"}
          </Button>

          <div>
            <Label htmlFor="content">Conteúdo Gerado</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="font-mono"
            />
          </div>

          <Button 
            onClick={saveArticle} 
            disabled={!topic || !content}
            className="w-full"
          >
            Salvar Artigo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

