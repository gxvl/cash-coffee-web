export interface ResumeCity {
  city: string;
  qtde: number;
}

export interface ResumeAge {
  range: string;
  qtde: number;
}

export interface ResumeProduct {
  product: string;
  qtde: number;
}

export interface ResumeDayWeek {
  dayWeek: string;
  qtde: number;
}

export interface ResumeGender {
  gender: string;
  perc: number;
}

export interface OrdersReportEntity {
  resumeCities: ResumeCity[];
  resumeAges: ResumeAge[];
  resumeProducts: ResumeProduct[];
  resumeDaysWeek: ResumeDayWeek[];
  resumeGenders: ResumeGender[];
}

export interface OrdersReportApiResponse {
  ResumeCities: Array<{
    City: string;
    Qtde: number;
  }>;
  ResumeAges: Array<{
    Range: string;
    Qtde: number;
  }>;
  ResumeProducts: Array<{
    Product: string;
    Qtde: number;
  }>;
  ResumeDaysWeek: Array<{
    DayWeek: string;
    Qtde: number;
  }>;
  ResumeGenders: Array<{
    Gender: string;
    Perc: number;
  }>;
}
