import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="个人中心" description="管理您的个人信息和账户设置。" />
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24">
                <AvatarImage src="https://placehold.co/100x100.png" alt="用户头像" data-ai-hint="person avatar"/>
                <AvatarFallback>管</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-2xl">管理员</CardTitle>
                <CardDescription>admin@example.com</CardDescription>
            </div>
            <Button variant="outline">更换头像</Button>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid gap-2">
                <Label htmlFor="username">用户名</Label>
                <Input id="username" defaultValue="管理员" />
           </div>
           <div className="grid gap-2">
                <Label htmlFor="email">邮箱地址</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" disabled />
           </div>
           <div className="grid gap-2">
                <Label htmlFor="password">修改密码</Label>
                <Input id="password" type="password" placeholder="输入新密码" />
           </div>
           <div className="grid gap-2">
                <Label htmlFor="password-confirm">确认新密码</Label>
                <Input id="password-confirm" type="password" placeholder="再次输入新密码" />
           </div>
        </CardContent>
        <CardFooter>
            <Button>更新个人信息</Button>
        </CardFooter>
      </Card>
    </>
  );
}
