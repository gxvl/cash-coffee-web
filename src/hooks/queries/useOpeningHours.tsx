import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  OpeningHoursEntity,
  OpeningHoursRequest
} from "@/common/entities/openingHours";
import {
  createOrUpdateOpeningHours,
  getOpeningHours
} from "@/services/openingHoursService";

export const useGetOpeningHours = (userId: string) => {
  return useQuery<OpeningHoursEntity | null, Error>({
    queryKey: ["openingHours", userId],
    queryFn: async () => {
      try {
        const response = await getOpeningHours(userId);
        const parsedData = JSON.parse(response.data);

        const parseTimeString = (timeStr: string) => {
          if (!timeStr || timeStr === "00:00:00") return null;
          const [hour, minute] = timeStr.split(":");
          return {
            hour: parseInt(hour, 10),
            minute: parseInt(minute, 10)
          };
        };

        const mappedData: OpeningHoursEntity = {
          userId: parsedData.UserId,
          closedLunch: parsedData.ClosedLunch,
          daysWeekOpeningHours: parsedData.DaysWeekOpeningHours.map(
            (day: {
              DayWeek: number;
              OpenHourAm: string;
              CloseHourAm: string;
              OpenHourPm: string;
              CloseHourPm: string;
            }) => ({
              dayWeek: day.DayWeek,
              openHourAm: parseTimeString(day.OpenHourAm),
              closeHourAm: parseTimeString(day.CloseHourAm),
              openHourPm: parseTimeString(day.OpenHourPm),
              closeHourPm: parseTimeString(day.CloseHourPm)
            })
          )
        };
        return mappedData;
      } catch (error) {
        if (
          error instanceof AxiosError &&
          (error.response?.status === 404 || error.response?.status === 500)
        ) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 45, // 45 minutes
    retry: (failureCount, error) => {
      if (
        error instanceof AxiosError &&
        (error.response?.status === 404 || error.response?.status === 500)
      ) {
        return false;
      }
      return failureCount < 3;
    }
  });
};

export const useCreateOrUpdateOpeningHours = () => {
  const queryClient = useQueryClient();

  return useMutation<OpeningHoursEntity | null, Error, OpeningHoursRequest>({
    mutationFn: async (openingHoursData: OpeningHoursRequest) => {
      const response = await createOrUpdateOpeningHours(openingHoursData);

      // Handle 204 No Content - success but no response body
      if (!response.data || response.statusCode === 204) {
        return null;
      }

      // Check if statusCode is 200 (success)
      if (response.statusCode === 200) {
        const parsedData = JSON.parse(response.data);

        const mappedData: OpeningHoursEntity = {
          userId: parsedData.UserId,
          closedLunch: parsedData.ClosedLunch,
          daysWeekOpeningHours: parsedData.DaysWeekOpeningHours.map(
            (day: {
              DayWeek: number;
              OpenHourAm: string;
              CloseHourAm: string;
              OpenHourPm: string;
              CloseHourPm: string;
            }) => {
              const parseTimeString = (timeStr: string) => {
                if (!timeStr || timeStr === "00:00:00") return null;
                const [hour, minute] = timeStr.split(":");
                return {
                  hour: parseInt(hour, 10),
                  minute: parseInt(minute, 10)
                };
              };

              return {
                dayWeek: day.DayWeek,
                openHourAm: parseTimeString(day.OpenHourAm),
                closeHourAm: parseTimeString(day.CloseHourAm),
                openHourPm: parseTimeString(day.OpenHourPm),
                closeHourPm: parseTimeString(day.CloseHourPm)
              };
            }
          )
        };

        return mappedData;
      }

      return null;
    },
    onSuccess: (_data, variables) => {
      // Delay para dar tempo do backend processar antes de recarregar
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["openingHours", variables.userId]
        });
      }, 1000);
    }
  });
};
