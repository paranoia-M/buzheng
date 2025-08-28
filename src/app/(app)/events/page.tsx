'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateDynamicMockData } from '@/lib/mock-data';
import { type RiskEvent, type RiskLevel } from '@/lib/types';
import { format } from 'date-fns';
import { RiskBadge } from '@/components/risk-badge';
import { Download, Search, Loader2 } from 'lucide-react';

interface EventsData {
  mockRiskEvents: RiskEvent[];
  eventTypes: string[];
}

export default function EventsPage() {
  const [filters, setFilters] = useState({
    user: '',
    eventType: 'all',
    riskLevel: 'all',
  });
  const [eventsData, setEventsData] = useState<EventsData | null>(null);

  useEffect(() => {
    const { mockRiskEvents, eventTypes } = generateDynamicMockData();
    setEventsData({ mockRiskEvents, eventTypes });
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (!eventsData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const { mockRiskEvents, eventTypes } = eventsData;

  const filteredEvents = mockRiskEvents.filter(event => {
    return (
      (filters.user === '' || event.user.name.toLowerCase().includes(filters.user.toLowerCase())) &&
      (filters.eventType === 'all' || event.eventType === filters.eventType) &&
      (filters.riskLevel === 'all' || event.riskLevel === filters.riskLevel)
    );
  });
  
  const riskLevels: (RiskLevel | 'all')[] = ['all', '高', '中', '低'];

  return (
    <>
      <PageHeader title="风险事件" description="查看和管理所有检测到的风险事件。">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          导出事件
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="按用户名搜索..."
                        className="pl-8"
                        value={filters.user}
                        onChange={(e) => handleFilterChange('user', e.target.value)}
                    />
                </div>
                <Select value={filters.eventType} onValueChange={(value) => handleFilterChange('eventType', value)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="事件类型" />
                    </SelectTrigger>
                    <SelectContent>
                        {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>{type === 'all' ? '所有事件类型' : type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filters.riskLevel} onValueChange={(value) => handleFilterChange('riskLevel', value)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="风险等级" />
                    </SelectTrigger>
                    <SelectContent>
                        {riskLevels.map(level => (
                             <SelectItem key={level} value={level}>{level === 'all' ? '所有风险等级' : level}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>事件ID</TableHead>
                <TableHead>时间</TableHead>
                <TableHead>用户</TableHead>
                <TableHead>事件类型</TableHead>
                <TableHead>风险等级</TableHead>
                <TableHead>详情</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event: RiskEvent) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.id}</TableCell>
                  <TableCell>{format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                  <TableCell>{event.user.name}</TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>
                    <RiskBadge level={event.riskLevel} />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      处理
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
