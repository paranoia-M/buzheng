'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { RiskBadge } from '@/components/risk-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateDynamicMockData } from '@/lib/mock-data';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { type Alert } from '@/lib/types';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[] | null>(null);

  useEffect(() => {
    setAlerts(generateDynamicMockData().mockAlerts);
  }, []);

  if (!alerts) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="实时告警" description="需要您立即关注的高风险事件通知。">
        <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            全部标记为已读
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {alerts.map(alert => (
          <Card key={alert.id} className={alert.read ? 'opacity-60' : ''}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                        <Bell className="h-5 w-5 text-destructive" />
                    </div>
                </div>
                <div className="flex-1">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription>{alert.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <RiskBadge level={alert.riskLevel} />
                    <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true, locale: zhCN })}</span>
                </div>
            </CardContent>
             <CardFooter>
              <Button className="w-full" variant={alert.read ? 'secondary' : 'default'}>
                {alert.read ? '查看详情' : '立即处理'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
