
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KANBAN_STAGES, type Candidate } from '@/lib/types';

interface CandidatesByStageChartProps {
    candidates: Candidate[];
}

export default function CandidatesByStageChart({ candidates }: CandidatesByStageChartProps) {

  const data = KANBAN_STAGES.map(stage => {
    const count = candidates.filter(c => c.stage === stage).length;
    return { name: stage, candidates: count };
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className='font-headline'>Candidate Pipeline</CardTitle>
        <CardDescription>Overview of candidates in each hiring stage.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--secondary))', radius: 'var(--radius)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                borderRadius: 'var(--radius)',
                border: '1px solid hsl(var(--border))'
              }}
            />
            <Bar dataKey="candidates" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
