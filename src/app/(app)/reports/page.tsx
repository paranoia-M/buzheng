import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReports } from '@/lib/mock-data';
import { Download, FileSignature } from 'lucide-react';

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="数据报表" description="生成、查看和管理您的风险数据报表。">
        <Button>
          <FileSignature className="mr-2 h-4 w-4" />
          创建新报表
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>已生成报表</CardTitle>
          <CardDescription>以下是您或系统已生成的报表列表。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>报表名称</TableHead>
                <TableHead>生成日期</TableHead>
                <TableHead>生成者</TableHead>
                <TableHead>格式</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.creationDate}</TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      下载
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
