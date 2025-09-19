
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import type { Assessment } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useActivities } from '@/hooks/use-activities';
import { faker } from '@faker-js/faker';
import { useAssessments } from '@/hooks/use-assessments';
import { UilArrowsV, UilPlus, UilTrash, UilTimes } from '@iconscout/react-unicons';

const questionSchema = z.object({
  id: z.string().optional(), // Keep it optional for new questions
  type: z.enum(['single-choice', 'multi-choice', 'short-text', 'long-text', 'numeric-range', 'file-upload']),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.object({ value: z.string().min(1) })).optional(),
});

const assessmentSchema = z.object({
  title: z.string().min(1, 'Assessment title is required'),
  description: z.string().optional(),
  questions: z.array(questionSchema),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

export default function AssessmentBuilder() {
  const router = useRouter();
  const [, addActivity] = useActivities();
  const [assessments, setAssessments] = useAssessments();

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: '',
      description: '',
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = (data: AssessmentFormValues) => {
    const newAssessment: Assessment = {
        id: faker.string.uuid(),
        title: data.title,
        description: data.description || '',
        questions: data.questions.map((q) => ({
            ...q,
            id: faker.string.uuid()
        }))
    };

    setAssessments([...assessments, newAssessment]);
    addActivity(`Created a new assessment: **${data.title}**.`);
    router.push('/assessments');
  };

  const QuestionOptions = ({ nestIndex }: { nestIndex: number }) => {
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control: form.control,
        name: `questions.${nestIndex}.options`
    });

    return (
        <div className="space-y-2 pl-6">
            {optionFields.map((field, k) => (
                <div key={field.id} className="flex items-center gap-2">
                    <Input {...form.register(`questions.${nestIndex}.options.${k}.value`)} placeholder={`Option ${k + 1}`} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(k)}><UilTimes className="h-4 w-4" /></Button>
                </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendOption({ value: '' })}>
                <UilPlus className="mr-2 h-4 w-4" /> Add Option
            </Button>
        </div>
    );
};

  const renderQuestionPreview = (question: any, index: number) => {
    switch (question.type) {
      case 'single-choice':
        return (
          <RadioGroup>
            {question.options?.map((opt: any, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`q${index}-opt${i}`} disabled/>
                <Label htmlFor={`q${index}-opt${i}`}>{opt.value || `Option ${i+1}`}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multi-choice':
        return (
          <div>
            {question.options?.map((opt: any, i: number) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`q${index}-opt${i}`} disabled/>
                <Label htmlFor={`q${index}-opt${i}`}>{opt.value || `Option ${i+1}`}</Label>
              </div>
            ))}
          </div>
        );
      case 'numeric-range':
        return <Slider defaultValue={[50]} max={100} step={1} disabled />;
      case 'short-text':
        return <Input placeholder="Short answer" disabled />;
      case 'long-text':
        return <Textarea placeholder="Long answer" disabled />;
      case 'file-upload':
        return <Button variant="outline" disabled>Upload File</Button>;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-sm">
            <CardContent className="p-6">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg">Assessment Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Frontend Developer Skills Test" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                        <FormLabel className="text-lg">Assessment Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe the purpose of this assessment." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        {fields.map((field, index) => (
          <Card key={field.id} className="relative group shadow-sm">
            <Button type="button" variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => remove(index)}>
              <UilTrash className="h-4 w-4" />
            </Button>
            <UilArrowsV className="absolute top-1/2 -translate-y-1/2 left-2 h-5 w-5 text-muted-foreground cursor-grab" />
            
            <CardContent className="p-6 pl-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='space-y-4'>
                    <FormField
                    control={form.control}
                    name={`questions.${index}.type`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Question Type</FormLabel>
                        <Select onValueChange={(value) => {
                            field.onChange(value);
                            // When changing type, reset options if not applicable
                             if (value !== 'single-choice' && value !== 'multi-choice') {
                                form.setValue(`questions.${index}.options`, []);
                            }
                        }} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a question type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="single-choice">Single Choice</SelectItem>
                            <SelectItem value="multi-choice">Multiple Choice</SelectItem>
                            <SelectItem value="short-text">Short Text</SelectItem>
                            <SelectItem value="long-text">Long Text</SelectItem>
                            <SelectItem value="numeric-range">Numeric Range</SelectItem>
                            <SelectItem value="file-upload">File Upload</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name={`questions.${index}.text`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl>
                            <Textarea placeholder="What is your question?" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    {(form.watch(`questions.${index}.type`) === 'single-choice' || form.watch(`questions.${index}.type`) === 'multi-choice') && (
                        <QuestionOptions nestIndex={index} />
                    )}
                </div>
                <div className="space-y-4">
                  <FormLabel>Preview</FormLabel>
                  <div className="p-4 border rounded-md min-h-[100px] bg-muted/50">
                    {renderQuestionPreview(form.watch(`questions.${index}`), index)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={() => append({ type: 'short-text', text: '' })}>
          <UilPlus className="mr-2 h-4 w-4" /> Add Question
        </Button>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => router.push('/assessments')}>Cancel</Button>
            <Button type="submit">Save Assessment</Button>
        </div>
      </form>
    </Form>
  );
}
