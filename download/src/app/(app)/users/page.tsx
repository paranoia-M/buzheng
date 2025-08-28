'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { RiskBadge } from '@/components/risk-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { generateDynamicMockData } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Loader2, UserPlus } from 'lucide-react';
import { type User } from '@/lib/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    setUsers(generateDynamicMockData().mockUsers);
  }, []);

  if (!users) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="用户管理" description="管理系统中的所有用户及其风险画像。">
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>最后登录IP</TableHead>
                <TableHead>最后登录时间</TableHead>
                <TableHead>风险等级</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.ipAddress}</TableCell>
                  <TableCell>{format(new Date(user.lastLogin), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell>
                    <RiskBadge level={user.riskLevel} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      查看画像
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
