'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { generateDynamicMockData } from '@/lib/mock-data';
import { format } from 'date-fns';
import { type AuditLog } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[] | null>(null);

  useEffect(() => {
    setAuditLogs(generateDynamicMockData().mockAuditLogs);
  }, []);

  if (!auditLogs) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="审核日志" description="查看系统中的所有用户操作记录。" />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>时间</TableHead>
                <TableHead>操作用户</TableHead>
                <TableHead>操作类型</TableHead>
                <TableHead>详情</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                  <TableCell>{log.user.name}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
