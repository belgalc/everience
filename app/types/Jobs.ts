export type JobType = {
  title: string;
  description?: string;
  missions?: {
    mission: string;
  }[];
  status?: boolean;
  profiles?: {
    profile: string;
  }[];
  id?: string;
  jobApply?: Function;
};
