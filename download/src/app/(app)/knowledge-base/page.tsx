import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockKnowledgeBaseArticles } from '@/lib/mock-data';
import { Search } from 'lucide-react';

export default function KnowledgeBasePage() {
  return (
    <>
      <PageHeader title="知识库" description="查找操作指南、规则说明和最佳实践。" />
      <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索文章..." className="pl-8" />
          </div>
          <Button>搜索</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>标题</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>作者</TableHead>
                <TableHead>最后更新</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockKnowledgeBaseArticles.map((article) => (
                <TableRow key={article.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
