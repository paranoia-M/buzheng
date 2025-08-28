import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RiskBadge({ level }: { level: '高' | '中' | '低' | string }) {
  return (
    <Badge
      className={cn("text-xs font-semibold", {
        "bg-risk-high text-risk-high-foreground hover:bg-risk-high/80": level === '高',
        "bg-risk-medium text-risk-medium-foreground hover:bg-risk-medium/80": level === '中',
        "bg-risk-low text-risk-low-foreground hover:bg-risk-low/80": level === '低',
        "border-border": level !== '高' && level !== '中' && level !== '低',
      })}
    >
      {level}
    </Badge>
  );
}
