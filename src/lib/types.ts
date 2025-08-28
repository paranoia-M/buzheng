export type RiskLevel = '高' | '中' | '低';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  ipAddress: string;
  lastLogin: string;
  riskLevel: RiskLevel;
}

export interface RiskEvent {
  id: string;
  timestamp: string;
  eventType: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
  riskLevel: RiskLevel;
  details: string;
  location: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  read: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: Pick<User, 'id' | 'name'>;
  action: string;
  details: string;
}

export interface Report {
  id: string;
  title: string;
  creationDate: string;
  generatedBy: string;
  format: 'PDF' | 'CSV' | 'PNG';
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  lastUpdated: string;
}
