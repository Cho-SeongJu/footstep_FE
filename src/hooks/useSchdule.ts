import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { addDestinationAPI, deleteDestinationAPI } from "../api/destinationAPI";
import { recommendScheduleAPI } from "../api/recommendAPI";
import { getScheduleAPI } from "../api/scheduleAPI";
import { selecteStartPoint } from "../state/selectStartPoint";
import { scheduleList } from "../store/scheduleList";
import { selectedDay } from "../store/selectedDay";

export interface IPlace {
  placeName: string;
  addressName: string;
  y: number;
  x: number;
}

const useSchedule = () => {
  const { shareRoomID } = useParams();
  const selectedDate = useRecoilValue(selectedDay);
  const setSchedules = useSetRecoilState(scheduleList);
  const selectedStartPoint = useRecoilValue(selecteStartPoint);
  const stompClient = useRef<any | null>(null);

  const onConnected = () => {
    stompClient.current?.subscribe(
      `/sub/share-room/${shareRoomID}/destination`,
      onMessageReceived
    );
  };

  const onMessageReceived = async (payload: any) => {
    const response = JSON.parse(payload.body);

    if (response.messageType === "destination") {
      setSchedules(response.dayScheduleDtoList);
    } else if (response.messageType === "shareRoom") {
      console.log(response);
    }
  };

  const onError = (error: any) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const connect = async () => {
    const socketFactory = () =>
      new window.SockJS(`${import.meta.env.VITE_SHARE_ROOM_URL}`);
    const client = Stomp.over(socketFactory);
    stompClient.current = client;
    client.connect({}, onConnected, onError);

    const result = await getScheduleAPI(Number(shareRoomID));

    if (result?.status === 200) {
      setSchedules(result.data);
    }
  };

  const addDestination = async (place: IPlace) => {
    const data = {
      planDate: selectedDate.planDate,
      destinationCategoryCode: "C",
      destinationName: place.placeName,
      destinationAddress: place.addressName,
      lng: String(place.x),
      lat: String(place.y),
      seq: 9999,
    };

    const result = await addDestinationAPI(Number(shareRoomID), data);

    if (result?.status === 200) {
      stompClient.current?.send(`/pub/share-room/${shareRoomID}/destination`);
    }
  };

  const deleteDestination = async (destinationID: number) => {
    const result = await deleteDestinationAPI(
      Number(shareRoomID),
      destinationID
    );

    if (result?.status === 200) {
      stompClient.current?.send(`/pub/share-room/${shareRoomID}/destination`);
    }
  };

  const recommendRoute = async () => {
    const result = await recommendScheduleAPI(
      selectedStartPoint,
      Number(shareRoomID)
    );

    if (result?.status === 200) {
      Swal.fire({
        icon: "success",
        text: "추천 경로로 일정이 설정되었습니다.",
      });
      stompClient.current?.send(`/pub/share-room/${shareRoomID}/destination`);
    }
  };

  const completeRoute = async () => {
    stompClient.current?.send(`/pub/share-room/${shareRoomID}/destination`);
  };

  useEffect(() => {
    connect();
  }, []);

  return { addDestination, deleteDestination, recommendRoute, completeRoute };
};

export default useSchedule;
