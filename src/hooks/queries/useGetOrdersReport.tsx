/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

import type { OrdersReportEntity } from "@/common/entities/report";
import { getOrdersReport } from "@/services/orderService";

export const useGetOrdersReport = (userId: string) => {
  return useQuery<OrdersReportEntity>({
    queryKey: ["ordersReport", userId],
    queryFn: async () => {
      const response = await getOrdersReport(userId);
      const apiData = JSON.parse(response.data.data);

      // Map PascalCase to camelCase
      const mappedData: OrdersReportEntity = {
        resumeCities: apiData.ResumeCities.map(
          (item: { City: any; Qtde: any }) => ({
            city: item.City,
            qtde: item.Qtde
          })
        ),
        resumeAges: apiData.ResumeAges.map(
          (item: { Range: any; Qtde: any }) => ({
            range: item.Range,
            qtde: item.Qtde
          })
        ),
        resumeProducts: apiData.ResumeProducts.map(
          (item: { Product: any; Qtde: any }) => ({
            product: item.Product,
            qtde: item.Qtde
          })
        ),
        resumeDaysWeek: apiData.ResumeDaysWeek.map(
          (item: { DayWeek: any; Qtde: any }) => ({
            dayWeek: item.DayWeek,
            qtde: item.Qtde
          })
        ),
        resumeGenders: apiData.ResumeGenders.map(
          (item: { Gender: any; Perc: any }) => ({
            gender: item.Gender,
            perc: item.Perc
          })
        )
      };

      return mappedData;
    },
    enabled: !!userId
  });
};
