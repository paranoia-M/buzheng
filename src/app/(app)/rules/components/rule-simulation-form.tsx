'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ruleEngineDetermination, type RuleEngineDeterminationOutput } from '@/ai/flows/rule-engine-determination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  userBehavior: z.string().min(10, { message: "用户行为描述至少需要10个字符。" }),
  userContext: z.string().min(10, { message: "用户背景描述至少需要10个字符。" }),
});

export function RuleSimulationForm() {
  const [result, setResult] = useState<RuleEngineDeterminationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userBehavior: "",
      userContext: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await ruleEngineDetermination(values);
      setResult(res);
    } catch (error) {
      console.error("智能分析失败:", error);
      toast({
        variant: "destructive",
        title: "分析失败",
        description: "无法连接到智能分析服务，请稍后再试。",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-6 w-6 text-primary" />
                    智能分析模拟
                </CardTitle>
                <CardDescription>输入用户行为和背景信息，系统将智能判断应适用的风险规则。</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="userBehavior"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>用户行为描述</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="例如：用户在凌晨3点异地登录，并尝试多次大额转账至新账户。"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userContext"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>用户背景信息</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="例如：该用户为新注册用户，过往无交易记录，账户余额较低。"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    分析中...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    开始分析
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle>分析结果</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg">建议适用规则</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {result.applicableRules.map((rule, index) => (
                                <span key={index} className="px-3 py-1 text-sm rounded-full bg-primary text-primary-foreground">
                                    {rule}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">分析依据</h3>
                        <p className="text-muted-foreground mt-2">{result.reasoning}</p>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
