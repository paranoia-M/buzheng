'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Users,
  Bell,
  BookCopy,
  Settings,
  UserCircle,
  History,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: '风险总览', icon: LayoutDashboard },
  { href: '/events', label: '风险事件', icon: AlertTriangle },
  { href: '/rules', label: '规则引擎', icon: Shield },
  { href: '/reports', label: '数据报表', icon: FileText },
  { href: '/alerts', label: '实时告警', icon: Bell },
  { href: '/users', label: '用户管理', icon: Users },
  { href: '/audit', label: '审核日志', icon: History },
  { href: '/knowledge-base', label: '知识库', icon: BookCopy },
  { href: '/settings', label: '系统设置', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Logo className="h-6 w-6 fill-current text-primary" />
                <span className="sr-only">天盾风控</span>
              </Link>
            </Button>
            <div className="group-[[data-collapsible=icon]]/sidebar:hidden">
              <h2 className="text-lg font-semibold tracking-tighter text-foreground">天盾风控</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex flex-col gap-2 p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="个人中心" isActive={pathname === '/profile'}>
                  <Link href="/profile">
                    <UserCircle />
                    <span>个人中心</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="退出登录">
                  <Link href="#">
                    <LogOut />
                    <span>退出登录</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="text-lg font-semibold">
                {navItems.find(item => pathname.startsWith(item.href))?.label || '天盾风控'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/40x40.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
