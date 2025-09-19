
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useActivities } from '@/hooks/use-activities';

// A simple parser to render markdown-like bold syntax
const renderDescription = (desc: string) => {
    if (typeof desc !== 'string') {
        return null;
    }
    const parts = desc.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export default function RecentActivities() {
  const [activities] = useActivities();
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className='font-headline'>Recent Activity</CardTitle>
        <CardDescription>An overview of recent actions in your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm text-muted-foreground">
                {renderDescription(activity.description)}
              </p>
              <div className="text-xs text-muted-foreground">
                {activity.timestamp}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
