import { atom } from "recoil";

export interface ISchedule {
  readonly destinationAddress: string;
  readonly destinationCategoryCode: string;
  readonly destinationId: number;
  readonly destinationName: string;
  readonly lat: string;
  readonly lng: string;
  readonly seq: number;
}

export interface IScheduleList {
  readonly content: string;
  readonly dayScheduleId: number;
  readonly destinationDtoList: ISchedule[];
  readonly planDate: string;
  readonly shareId: number;
}

export const scheduleList = atom<IScheduleList[]>({
  key: "scheduleList",
  default: [],
});
