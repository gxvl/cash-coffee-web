"use client";

import { useEffect, useState } from "react";

import { ChevronLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DayWeekOpeningHours } from "@/common/entities/openingHours";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreateOrUpdateOpeningHours,
  useGetOpeningHours
} from "@/hooks/queries/useOpeningHours";

const daysOfWeek = [
  { dayWeek: 1, name: "Segunda" },
  { dayWeek: 2, name: "Terça" },
  { dayWeek: 3, name: "Quarta" },
  { dayWeek: 4, name: "Quinta" },
  { dayWeek: 5, name: "Sexta" },
  { dayWeek: 6, name: "Sábado" },
  { dayWeek: 0, name: "Domingo" }
];

const formatTime = (hour: number, minute: number): string => {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

export default function SchedulePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [closedLunch, setClosedLunch] = useState(false);
  const [schedule, setSchedule] = useState<DayWeekOpeningHours[]>([]);
  const router = useRouter();

  const { data: openingHours, isLoading: loadingHours } = useGetOpeningHours(
    userId || ""
  );

  console.log(openingHours);

  const { mutate: saveOpeningHours, isPending: savingHours } =
    useCreateOrUpdateOpeningHours();

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  useEffect(() => {
    if (openingHours) {
      setClosedLunch(openingHours.closedLunch);
      setSchedule(openingHours.daysWeekOpeningHours);
    }
  }, [openingHours]);

  const handleClearDay = (dayWeek: number) => {
    setSchedule((prev) => prev.filter((day) => day.dayWeek !== dayWeek));
  };

  const handleTimeChange = (
    dayWeek: number,
    field: "openHourAm" | "closeHourAm" | "openHourPm" | "closeHourPm",
    value: string
  ) => {
    if (!value || value.length !== 5) return;

    const [hourStr, minuteStr] = value.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute)) return;

    setSchedule((prev) => {
      const existingDay = prev.find((day) => day.dayWeek === dayWeek);

      if (existingDay) {
        return prev.map((day) =>
          day.dayWeek === dayWeek ? { ...day, [field]: { hour, minute } } : day
        );
      } else {
        return [
          ...prev,
          {
            dayWeek,
            openHourAm: null,
            closeHourAm: null,
            openHourPm: null,
            closeHourPm: null,
            [field]: { hour, minute }
          }
        ];
      }
    });
  };

  const handleSave = () => {
    if (!userId) {
      toast.error("Usuário não identificado");
      return;
    }

    const hasExistingData =
      openingHours &&
      openingHours.daysWeekOpeningHours &&
      openingHours.daysWeekOpeningHours.length > 0;

    saveOpeningHours(
      {
        userId,
        closedLunch,
        daysWeekOpeningHours: schedule,
        isUpdate: !!hasExistingData
      },
      {
        onSuccess: () => {
          toast.success("Horário de funcionamento salvo com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao salvar horário de funcionamento");
        }
      }
    );
  };

  const getDaySchedule = (dayWeek: number): DayWeekOpeningHours | undefined => {
    return schedule.find((day) => day.dayWeek === dayWeek);
  };

  const hasSchedule = (day: DayWeekOpeningHours | undefined): boolean => {
    return !!(
      day?.openHourAm ||
      day?.closeHourAm ||
      day?.openHourPm ||
      day?.closeHourPm
    );
  };

  if (loadingHours) {
    return (
      <main className="relative flex h-screen flex-col items-center justify-center px-6">
        <LoadingComponent />
      </main>
    );
  }

  return (
    <main className="relative flex h-screen flex-col items-center gap-2 px-6 pt-32">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      {daysOfWeek.map((dayInfo) => {
        const daySchedule = getDaySchedule(dayInfo.dayWeek);
        const hasHours = hasSchedule(daySchedule);

        return (
          <div
            key={dayInfo.dayWeek}
            className="flex w-full items-center justify-between"
          >
            <p
              className={`text-lg font-bold ${hasHours ? "text-[#55381C]" : "text-[#CBCCCE]"}`}
            >
              {dayInfo.name}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={
                  daySchedule?.openHourAm
                    ? formatTime(
                        daySchedule.openHourAm.hour,
                        daySchedule.openHourAm.minute
                      )
                    : ""
                }
                onChange={(e) =>
                  handleTimeChange(
                    dayInfo.dayWeek,
                    "openHourAm",
                    e.target.value
                  )
                }
                className="flex h-10 w-16 items-center justify-center rounded-2xl border border-[#B35326] bg-white p-2 text-sm font-semibold text-[#55381C] focus:ring-2 focus:ring-[#B35326] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clock-icon]:hidden"
              />
              <input
                type="time"
                value={
                  daySchedule?.closeHourAm
                    ? formatTime(
                        daySchedule.closeHourAm.hour,
                        daySchedule.closeHourAm.minute
                      )
                    : ""
                }
                onChange={(e) =>
                  handleTimeChange(
                    dayInfo.dayWeek,
                    "closeHourAm",
                    e.target.value
                  )
                }
                className="flex h-10 w-16 items-center justify-center rounded-2xl border border-[#B35326] bg-white p-2 text-sm font-semibold text-[#55381C] focus:ring-2 focus:ring-[#B35326] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clock-icon]:hidden"
              />
              <p className="font-bold text-[#CBCCCE]">•</p>
              <input
                type="time"
                value={
                  daySchedule?.openHourPm
                    ? formatTime(
                        daySchedule.openHourPm.hour,
                        daySchedule.openHourPm.minute
                      )
                    : ""
                }
                onChange={(e) =>
                  handleTimeChange(
                    dayInfo.dayWeek,
                    "openHourPm",
                    e.target.value
                  )
                }
                className="flex h-10 w-16 items-center justify-center rounded-2xl border border-[#B35326] bg-white p-2 text-sm font-semibold text-[#55381C] focus:ring-2 focus:ring-[#B35326] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clock-icon]:hidden"
              />
              <input
                type="time"
                value={
                  daySchedule?.closeHourPm
                    ? formatTime(
                        daySchedule.closeHourPm.hour,
                        daySchedule.closeHourPm.minute
                      )
                    : ""
                }
                onChange={(e) =>
                  handleTimeChange(
                    dayInfo.dayWeek,
                    "closeHourPm",
                    e.target.value
                  )
                }
                className="flex h-10 w-16 items-center justify-center rounded-2xl border border-[#B35326] bg-white p-2 text-sm font-semibold text-[#55381C] focus:ring-2 focus:ring-[#B35326] focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clock-icon]:hidden"
              />
              {hasHours ? (
                <button
                  onClick={() => handleClearDay(dayInfo.dayWeek)}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-[#54361A]"
                >
                  <X className="text-white" size={10} />
                </button>
              ) : (
                <div className="h-4 w-4" />
              )}
            </div>
          </div>
        );
      })}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={closedLunch}
          onCheckedChange={(checked) => setClosedLunch(checked === true)}
          className="h-5 w-5 border-[#B35326]"
        />
        <p className="py-5 text-[#B35326]">Fechamos para almoço</p>
      </div>
      <Button onClick={handleSave} disabled={savingHours}>
        {savingHours ? "Salvando..." : "Salvar horário de funcionamento"}
      </Button>
      <div className="ml-8 flex w-full items-center justify-center gap-4 pt-6">
        <Checkbox className="h-5 w-5 border-[#54361A]" />
        <p className="py-5 text-sm text-[#54361A]">
          Deixar botão indicativo de aberta e fechada automático de acordo com o
          horário de funcionamento salvo
        </p>
      </div>
    </main>
  );
}
