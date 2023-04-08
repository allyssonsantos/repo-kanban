import { Column } from '@/features/BoardFeature/model';

export type TRepo = {
  id: number;
  name: string;
  description: string | null;
  stars: number;
  starUrl: string;
};

export type TBoardData = {
  repo: TRepo;
  branches: string[];
  availableColumns: Omit<Column, 'items'>[];
};
