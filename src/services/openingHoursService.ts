import {
  OpeningHoursApiResponse,
  OpeningHoursRequest
} from "@/common/entities/openingHours";

import api from "./api";

const convertTimeSlotToTimeOnly = (hour: number, minute: number): string => {
  const h = hour.toString().padStart(2, "0");
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m}:00`;
};

export const createOrUpdateOpeningHours = async (
  openingHoursData: OpeningHoursRequest
): Promise<OpeningHoursApiResponse> => {
  const method = openingHoursData.isUpdate ? "put" : "post";

  // Create array with all 7 days (0-6 for Sunday-Saturday)
  const allDays = [0, 1, 2, 3, 4, 5, 6].map((dayWeek) => {
    const existingDay = openingHoursData.daysWeekOpeningHours.find(
      (d) => d.dayWeek === dayWeek
    );

    if (
      existingDay &&
      (existingDay.openHourAm ||
        existingDay.closeHourAm ||
        existingDay.openHourPm ||
        existingDay.closeHourPm)
    ) {
      return {
        DayWeek: dayWeek,
        OpenHourAm: existingDay.openHourAm
          ? convertTimeSlotToTimeOnly(
              existingDay.openHourAm.hour,
              existingDay.openHourAm.minute
            )
          : "00:00:00",
        CloseHourAm: existingDay.closeHourAm
          ? convertTimeSlotToTimeOnly(
              existingDay.closeHourAm.hour,
              existingDay.closeHourAm.minute
            )
          : "00:00:00",
        OpenHourPm: existingDay.openHourPm
          ? convertTimeSlotToTimeOnly(
              existingDay.openHourPm.hour,
              existingDay.openHourPm.minute
            )
          : "00:00:00",
        CloseHourPm: existingDay.closeHourPm
          ? convertTimeSlotToTimeOnly(
              existingDay.closeHourPm.hour,
              existingDay.closeHourPm.minute
            )
          : "00:00:00"
      };
    } else {
      return {
        DayWeek: dayWeek,
        OpenHourAm: "00:00:00",
        CloseHourAm: "00:00:00",
        OpenHourPm: "00:00:00",
        CloseHourPm: "00:00:00"
      };
    }
  });

  const transformedData = {
    userId: openingHoursData.userId,
    ClosedLunch: openingHoursData.closedLunch,
    DaysWeekOpeningHours: allDays
  };

  const response = await api[method]<OpeningHoursApiResponse>(
    "/users/shop/opening-hours",
    transformedData
  );
  return response.data;
};

export const getOpeningHours = async (
  shopId: string
): Promise<OpeningHoursApiResponse> => {
  const response = await api.get<OpeningHoursApiResponse>(
    "/users/shop/opening-hours",
    {
      params: { shopId }
    }
  );
  return response.data;
};
