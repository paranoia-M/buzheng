import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RuleSimulationForm } from './components/rule-simulation-form';
import { cn } from '@/lib/utils';

const existingRules = [
    { id: 'rule-001', name: '可疑登录', description: '在异常设备或地理位置登录时触发', status: '启用' },
    { id: 'rule-002', name: '大额交易', description: '单笔交易金额超过用户平均水平的3个标准差时触发', status: '启用' },
    { id: 'rule-003', name: '账户信息修改', description: '用户修改密码、邮箱等敏感信息时触发', status: '启用' },
    { id: 'rule-004', name: '频繁操作', description: '短时间内进行大量重复性操作时触发', status: '启用' },
    { id: 'rule-005', name: '设备异常', description: '用户使用被标记为可疑的设备进行操作时触发', status: '停用' },
];

export default function RulesPage() {
  return (
    <>
      <PageHeader title="规则引擎" description="配置和模拟风险识别规则。" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
            <RuleSimulationForm />
            <Card>
            <CardHeader>
                <CardTitle>现有规则列表</CardTitle>
                <CardDescription>系统中当前配置的所有风险规则。</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>规则名称</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>状态</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {existingRules.map(rule => (
                    <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>{rule.description}</TableCell>
                        <TableCell>
                        <Badge variant={rule.status === '启用' ? 'default' : 'secondary'}
                            className={cn({
                                'bg-risk-low text-risk-low-foreground hover:bg-risk-low/80': rule.status === '启用',
                            })}
                        >
                            {rule.status}
                        </Badge>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          {/* This column is intentionally left empty for future content or to maintain layout balance. */}
        </div>
      </div>
    </>
  );
}
