import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="系统设置" description="管理和配置系统参数。" />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
            <CardDescription>配置您希望如何接收告警通知。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">邮件通知</Label>
                    <p className="text-sm text-muted-foreground">当有高风险事件时发送邮件。</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">短信通知</Label>
                    <p className="text-sm text-muted-foreground">当有严重风险事件时发送短信。</p>
                </div>
                <Switch id="sms-notifications" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>配置系统安全相关参数。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="session-timeout">会话超时时间 (分钟)</Label>
                <Input id="session-timeout" defaultValue="30" />
            </div>
             <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">启用双因素认证</Label>
                    <p className="text-sm text-muted-foreground">为所有管理员账户强制启用2FA。</p>
                </div>
                <Switch id="two-factor-auth" defaultChecked />
            </div>
          </CardContent>
           <CardFooter>
            <Button>保存更改</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
