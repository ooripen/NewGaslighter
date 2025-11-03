export type AppStage = 'screening' | 'chat' | 'exit';

export interface ScreeningQuestion {
  id: number;
  text: string;
}

export interface ExampleDialogue {
  id: string;
  title: string;
  messages: {
    speaker: 'user' | 'other';
    text: string;
    annotation?: string;
  }[];
  summary: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'hotline' | 'info' | 'support';
}
