// Account

const UserRole = {
  GUEST: "GUEST",
  CANDIDATE: "CANDIDATE",
  RECRUITER: "RECRUITER",
} as const;

type Role = keyof typeof UserRole;

type SignInRequest = {
  login: string;
  password: string;
};

type RegisterRequest = {
  name: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

type UserJwtPayload = {
  role: string;
  user_public_id: string;
};


// Errors

const ApplicationErrorType = {
  SERVER: "SERVER",
  AUTHENTICATION: "AUTHENTICATION",
  AUTHORIZATION: "AUTHORIZATION",
  CONNECTION: "CONNECTION",
  UNEXPECTED: "UNEXPECTED",
  CONFLICT: "CONFLICT",
  VALIDATION: "VALIDATION",
  NOTFOUND: "VALIDATION",
} as const;


type ErrorType = keyof typeof ApplicationErrorType;

type ApplicationError = {
  type: ErrorType;
  message: string;
};


// Result and Response

type Result<TResult> = {
  value?: TResult;
  error?: ApplicationError;
  success: bool;
};

type ApiResponse<TResponse> = {
  data?: TResponse;
  error?: unknown;
  status: number;
};


// Skill

type Skill = {
  id: string;
  name: string;
};

type SkillUpdateRequest = {
  skills: string[];
};


// Position

type Position = {
  public_id: string;
  name: string;
  status: number;
  skills?: string[];
  company: Company;
  recruiter_public_id: string;
  description: string;
};

type PositionBase = {
  public_id: string;
  name: string;
  status: number;
  skills?: string[];
  company: CompanyBase;
};

type PositionsBaseResponse = {
  positions: PositionBase[];
  count: number;
};

type PositionCreate = {
  name: string;
  description: string;
  status: number = 0;
  skills: string[];
};


// Company

type CompanyBase = {
  public_id: string;
  name: string;
  logo: string;
};

type CompanyPosition = {
  public_id: string;
  name: string;
  status: number;
  skills?: string[];
  recruiter_public_id: string;
  description: string;
};

type CompanyPositionsResponse = {
  positions: CompanyPosition[];
  count: number;
};


type CompaniesResponse = {
  companies: Company[];
  count: number;
};

type Company = {
  public_id: string;
  name: string;
  logo: string;
  description: string;
};

type CompanyCreateRequest = {
  name: string;
  logo: string;
  description: string;
};

type CompanyUpdateRequest = {
  public_id: string;
  name: string;
  logo: string;
  description: string;
};


// User

type User = {
  public_id: string;
  first_name: string;
  last_name: string;
  photo?: string;
};

type Candidate = User & {
  current_position: string;
  resume: string;
  bio: string;
  education?: string;
  skills?: string[];
};

type Recruiter = User & {
  company_public_id: string;
};


// Question

type Question = QuestionCreate & {
  public_id: string;
};

type QuestionsResponse = {
  position_public_id: string;
  questions: Question[];
};

type QuestionsCreateRequest = {
  questions: QuestionCreate[];
};

type QuestionsUpdateRequest = {
  questions: Question[];
};

type QuestionCreate = {
  name: string;
  read_duration: number;
  answer_duration: number;
};


// Interview

type Interview = {
  public_id: string;
  result: InterviewResult;
};

type PositionInterview = Interview & {
  position_public_id: string;
};

type InterviewResult = {
  questions?: QuestionResult[] | null;
  score: number;
};

type PositionInterviewsResponse = {
  interviews: PositionInterview[];
  count: number;
};

type InterviewsResponse = {
  interviews: Interview[];
  count: number;
};

type CreateInterviewResponse = {
  public_id: string;
};

type QuestionResult = {
  question: string;
  public_id: string;
  question_type: string;
  evaluation: string;
  score: number;
  answer: string;
  video_link: string;
  video_public_id: string;
  emotion_results: EmotionResult[];
};

type EmotionResult = {
  emotion: string;
  exact_time: number;
  duration: number;
};


// Video

type VideoCreateRequest = {
  interview_public_id: string;
  video: string;
};

type Video = {
  id: string;
  path: string;
};