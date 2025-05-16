export type Education = {
  highSchool: string;
  bachelor: string;
  master: string;
  doctor: string;
};

export type Policy = {
  title: string;
  description: string;
  executionPlan: string;
  expectedEffect: string;
  isCore: boolean;
};

export type Coordinate = {
  lat: number;
  lng: number;
};

export type ScheduleItem = {
  date: string;
  time: string;
  location: string;
  description: string;
  coordinates: Coordinate;
};

export type PromiseItem = {
  title: string;
  category: string;
  status: "completed" | "inProgress" | "notStarted";
  progress: number;
  description: string;
  tags: string[];
};

export type PreviousPromise = {
  election: string;
  position: string;
  promises: PromiseItem[];
};

export type Candidate = {
  _id?: string; // if fetched from MongoDB
  id: string;
  name: string;
  party: string;
  image: string;
  description: string;
  supportRate: number;
  partyColor: string;
  birthDate: string;
  birthPlace: string;
  family: string;
  religion: string;
  education: Education;
  career: string[];
  policies: {
    economy: Policy[];
    welfare: Policy[];
    education: Policy[];
    diplomacy: Policy[];
    environment: Policy[];
  };
  schedule: ScheduleItem[];
  previousPromises: PreviousPromise[];
};
