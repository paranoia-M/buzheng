import { type User, type RiskEvent, type Alert, type AuditLog, type Report, type KnowledgeBaseArticle, type RiskLevel } from './types';

const riskLevels: RiskLevel[] = ['高', '中', '低'];
const eventTypes = ['可疑登录', '大额交易', '账户信息修改', '频繁操作', '设备异常'];
const locations = ['北京', '上海', '纽约', '伦敦', '东京', '新加坡'];
const actions = ['登录系统', '导出报表', '修改规则', '查看事件', '更新用户状态'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];


export const mockReports: Report[] = [
  { id: 'rep-1', title: '2023年第四季度风险总览', creationDate: '2024-01-05', generatedBy: '系统自动', format: 'PDF' },
  { id: 'rep-2', title: '高风险用户行为分析', creationDate: '2024-02-10', generatedBy: '管理员A', format: 'CSV' },
  { id: 'rep-3', title: '交易风险趋势图', creationDate: '2024-03-15', generatedBy: '管理员B', format: 'PNG' },
];

export const mockKnowledgeBaseArticles: KnowledgeBaseArticle[] = [
  { id: 'kb-1', title: '如何处理高风险告警', category: '操作指南', author: '专家团队', lastUpdated: '2024-03-01' },
  { id: 'kb-2', title: '“大额交易”规则详解', category: '规则说明', author: '专家团队', lastUpdated: '2024-02-20' },
  { id: 'kb-3', title: '系统安全配置最佳实践', category: '安全配置', author: '技术支持', lastUpdated: '2024-03-10' },
];

export const generateDynamicMockData = () => {
  const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `用户${String.fromCharCode(65 + i)}`,
    avatar: `https://placehold.co/40x40.png`,
    email: `user${i + 1}@example.com`,
    ipAddress: `192.168.1.${i + 10}`,
    lastLogin: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toISOString(),
    riskLevel: getRandomItem(riskLevels),
  }));

  const mockRiskEvents: RiskEvent[] = Array.from({ length: 50 }, (_, i) => {
    const user = getRandomItem(mockUsers);
    return {
      id: `event-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
      eventType: getRandomItem(eventTypes),
      user: { id: user.id, name: user.name, email: user.email },
      riskLevel: getRandomItem(riskLevels),
      details: `在 ${getRandomItem(locations)} 检测到一笔金额为 ${(Math.random() * 10000).toFixed(2)} 的交易`,
      location: getRandomItem(locations),
    };
  });

  const mockAlerts: Alert[] = mockRiskEvents
    .filter(event => event.riskLevel === '高')
    .slice(0, 10)
    .map((event, i) => ({
      id: `alert-${i + 1}`,
      timestamp: event.timestamp,
      title: `${event.eventType} - ${event.user.name}`,
      description: event.details,
      riskLevel: '高',
      read: Math.random() > 0.5,
    }));

  const mockAuditLogs: AuditLog[] = Array.from({ length: 30 }, (_, i) => {
    const user = getRandomItem(mockUsers);
    return {
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 14).toISOString(),
      user: { id: user.id, name: user.name },
      action: getRandomItem(actions),
      details: `执行操作: ${getRandomItem(actions)}`,
    };
  });

  const dashboardStats = {
    highRiskUsers: mockUsers.filter(u => u.riskLevel === '高').length,
    pendingEvents: mockRiskEvents.filter(e => e.riskLevel === '高' || e.riskLevel === '中').length,
    dailyNewRisks: mockRiskEvents.filter(e => new Date(e.timestamp) > new Date(Date.now() - 1000 * 60 * 60 * 24)).length,
    totalRules: 5,
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  }).reverse();

  const riskEventsOverTime = last7Days.map(day => ({
    date: day,
    '高风险': Math.floor(Math.random() * 10) + 2,
    '中风险': Math.floor(Math.random() * 20) + 5,
    '低风险': Math.floor(Math.random() * 50) + 10,
  }));

  const riskLevelDistribution = [
    { name: '低风险', value: mockRiskEvents.filter(e => e.riskLevel === '低').length, fill: 'hsl(var(--risk-low))' },
    { name: '中风险', value: mockRiskEvents.filter(e => e.riskLevel === '中').length, fill: 'hsl(var(--risk-medium))' },
    { name: '高风险', value: mockRiskEvents.filter(e => e.riskLevel === '高').length, fill: 'hsl(var(--risk-high))' },
  ];

  return {
    mockUsers,
    mockRiskEvents,
    mockAlerts,
    mockAuditLogs,
    dashboardStats,
    riskEventsOverTime,
    riskLevelDistribution,
    eventTypes: ['all', ...Array.from(new Set(mockRiskEvents.map(e => e.eventType)))],
  }
}