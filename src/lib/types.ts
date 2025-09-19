export type Stage = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

export const STAGES: Stage[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

export const KANBAN_STAGES: Exclude<Stage, 'Rejected'>[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  jobId: string;
  jobTitle: string;
  stage: Stage;
  applicationDate: string;
};

export type Job = {
  id: string;
  title: string;
  status: 'Active' | 'Archived';
  tags: string[];
};

export type Activity = {
  id: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatarUrl: string;
  }
}

export type AssessmentQuestion = {
    id: string;
    type: 'single-choice' | 'multi-choice' | 'short-text' | 'long-text' | 'numeric-range' | 'file-upload';
    text: string;
    options?: { value: string }[];
};

export type Assessment = {
    id: string;
    title: string;
    description: string;
    questions: AssessmentQuestion[];
};

export type Note = {
  id: string;
  candidateId: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: string;
};
