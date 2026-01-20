export interface TimeSlot {
  hour: number;
  minute: number;
}

export interface DayWeekOpeningHours {
  dayWeek: number; // 1 = Monday, 2 = Tuesday, ..., 7 = Sunday
  openHourAm: TimeSlot | null;
  closeHourAm: TimeSlot | null;
  openHourPm: TimeSlot | null;
  closeHourPm: TimeSlot | null;
}

export interface OpeningHoursEntity {
  userId: string;
  closedLunch: boolean;
  daysWeekOpeningHours: DayWeekOpeningHours[];
}

export interface OpeningHoursRequest {
  userId: string;
  closedLunch: boolean;
  daysWeekOpeningHours: DayWeekOpeningHours[];
  isUpdate?: boolean;
}

export interface OpeningHoursApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // Stringified JSON
}
