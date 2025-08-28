'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { generateDynamicMockData } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Users, AlertTriangle, ShieldCheck, ListChecks, Download, Loader2 } from 'lucide-react';
import { RiskBadge } from '@/components/risk-badge';
import { type RiskEvent } from '@/lib/types';

export default function DashboardPage() {
  const [data, setData] = useState<ReturnType<typeof generateDynamicMockData> | null>(null);

  useEffect(() => {
    setData(generateDynamicMockData());
  }, []);

  if (!data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const { dashboardStats, riskEventsOverTime, riskLevelDistribution, mockRiskEvents } = data;
  const recentHighRiskEvents = mockRiskEvents.filter((e: RiskEvent) => e.riskLevel === '高').slice(0, 5);

  return (
    <>
      <PageHeader title="风险总览" description="系统核心风险指标概览">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          导出总览
        </Button>
      </PageHeader>
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="高风险用户" value={dashboardStats.highRiskUsers} icon={Users} description="当前标记为高风险的用户总数" />
          <StatCard title="待处理事件" value={dashboardStats.pendingEvents} icon={AlertTriangle} description="需要关注和处理的风险事件" />
          <StatCard title="今日新增风险" value={dashboardStats.dailyNewRisks} icon={ShieldCheck} description="24小时内新增的风险事件" />
          <StatCard title="有效规则数" value={dashboardStats.totalRules} icon={ListChecks} description="当前系统中启用的风险规则总数" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>最近7日风险事件趋势</CardTitle>
                    <CardDescription>高、中、低风险事件数量变化</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-64 w-full">
                        <ResponsiveContainer>
                           <LineChart data={riskEventsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip
                                    content={({ active, payload, label }) =>
                                    active && payload && payload.length ? (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">日期</span>
                                                    <span className="font-bold text-muted-foreground">{label}</span>
                                                </div>
                                                {payload.map((p, i) => (
                                                  <div key={i} className="flex flex-col">
                                                      <span className="text-[0.70rem] uppercase text-muted-foreground" style={{color: p.color}}>{p.name}</span>
                                                      <span className="font-bold" style={{color: p.color}}>{p.value}</span>
                                                  </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null
                                    }
                                />
                                <Legend />
                                <Line type="monotone" dataKey="高风险" stroke="hsl(var(--risk-high))" strokeWidth={2} />
                                <Line type="monotone" dataKey="中风险" stroke="hsl(var(--risk-medium))" strokeWidth={2} />
                                <Line type="monotone" dataKey="低风险" stroke="hsl(var(--risk-low))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>风险等级分布</CardTitle>
                    <CardDescription>所有风险事件的等级占比</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-64 w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie data={riskLevelDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={5}>
                                    {riskLevelDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>近期高风险事件</CardTitle>
            <CardDescription>最近发生的高风险事件列表，请及时处理。</CardDescription>
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
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentHighRiskEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.id}</TableCell>
                    <TableCell>{format(new Date(event.timestamp), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                    <TableCell>{event.user.name}</TableCell>
                    <TableCell>{event.eventType}</TableCell>
                    <TableCell>
                      <RiskBadge level={event.riskLevel} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
