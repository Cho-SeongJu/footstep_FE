import { IPlace } from "../hooks/useManageSchdule";

export interface IShareRoom {
  endPoint: string;
  imageUrl: string;
  shareCode: string;
  shareId: number;
  shareName: string;
  startPoint: string;
  travelEndDate: string;
  travelStartDate: string;
}
export interface ISubmitShareRoomData {
  shareName: string;
  travelEndDate: string;
  travelStartDate: string;
  imageUrl: string;
}

export interface ICreateShareRoomFormValue {
  title: string;
  startDate: string;
  endDate: string;
}

export interface IPropsPlaceSearch {
  placeSearch: (keyword: string) => void;
}

export interface IPropsPlaceSearchLists {
  panTo: (placeX: number, placeY: number, index: number) => void;
  addDestination: (place: IPlace) => void;
  placePagination: any;
  recommendStatus: boolean;
}

export interface IPlaceContentDown {
  panTo: (placeX: number, placeY: number, index: number) => void;
  addDestination: (place: IPlace) => void;
  placePagination: any;
}

export interface IPropsSideBar {
  placeSearch: (keyword: string) => void;
  panTo: (placeX: number, placeY: number, index: number) => void;
  placePagination: any;
  addDestination: (place: IPlace) => void;
}
