"use client"

import { useState, useEffect } from "react"
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
import { Calendar, Edit2, Trash2 } from 'lucide-react'
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'

interface Article {
  id: string
  title: string
  content: string
  status: "draft" | "published" | "archived"
  createdAt: string
}

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [newArticle, setNewArticle] = useState<Omit<Article, "id" | "createdAt">>({
    title: "",
    content: "",
    status: "draft"
  })

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articleList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(articleList);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const addArticle = async () => {
    if (newArticle.title && newArticle.content) {
      try {
        await addDoc(collection(db, 'articles'), {
          ...newArticle,
          createdAt: new Date().toISOString()
        });
        setNewArticle({
          title: "",
          content: "",
          status: "draft"
        });
        fetchArticles();
      } catch (error) {
        console.error("Error adding article:", error);
      }
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }

  const updateStatus = async (id: string, status: Article["status"]) => {
    try {
      const articleRef = doc(db, 'articles', id);
      await updateDoc(articleRef, { status });
      fetchArticles();
    } catch (error) {
      console.error("Error updating article status:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artigos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={newArticle.content}
              onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
              rows={5}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={addArticle}>Criar Artigo</Button>
          </div>

          <div className="space-y-4 mt-8">
            {articles.map(article => (
              <Card key={article.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{article.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(article.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={article.status}
                        onValueChange={(value: Article["status"]) => updateStatus(article.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Rascunho</SelectItem>
                          <SelectItem value="published">Publicado</SelectItem>
                          <SelectItem value="archived">Arquivado</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{article.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

