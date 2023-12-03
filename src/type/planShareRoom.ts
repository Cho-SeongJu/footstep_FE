export interface IShareRoom {
  endPoint: string;
  imageUrl: string;
  shareCode: string;
  shareId: number;
  shareName: string;
  startPoint: string;
  travelEndDate: string;
  travelStartDate: string;
  hostFlag?: boolean;
}

export interface IShareRoomList {
  totalPages: number;
  shareRoomDtoList: IShareRoom[];
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

export interface IPropsSideBar {
  placeSearch: (keyword: string) => void;
  panTo: (placeX: number, placeY: number, index: number) => void;
  placePagination: any;
}
