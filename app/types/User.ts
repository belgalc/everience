export type User = {
  id?: string;
  name?: string;
  email?: string;
  birthdate?: string;
  jobs?: {
    title: string;
    status?: boolean;
  };
  study?: {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    diploma: string;
  }[];
  work?: {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    job: string;
  }[];
  cv?: {
    id?: string;
    name: string;
    type: string;
    content: string;
    userId: string;
  };
  skills?: {
    id?: string;
    name: string;
  }[];
  languages?: {
    id?: string;
    name: string;
  }[];
};
