import { useState } from "react";
import {
  getMemberIdAPI,
  getPlanScheduleAPI,
  postCommunityAPI,
} from "../api/newPostAPI";
import { useSharedRoom } from "./useMyShareRoom";
import { IPlan } from "../type/newPost";
import Swal from "sweetalert2";

export const useEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);

  const { shareRooms, plans } = useSharedRoom();

  const handleSelectPlan = async (plan: IPlan) => {
    setSelectedPlan(plan);
    try {
      const scheduleData = await getPlanScheduleAPI(plan.shareId);

      let contentString = "";
      for (let i = 0; i < scheduleData.length; i++) {
        const daySchedule = scheduleData[i];

        contentString += `${i + 1}일차 : ${daySchedule.planDate}<br />`;
        contentString += "장소: <br />";

        for (let j = 0; j < daySchedule.destinationDtoList.length; j++) {
          contentString += `- ${daySchedule.destinationDtoList[j].destinationName}<br />`;
        }
        contentString += "<br /><br />";
      }

      setContent(contentString);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPost = async () => {
    try {
      if (!selectedPlan) {
        Swal.fire({
          icon: "warning",
          title: "일정 선택 필요",
          text: "일정을 선택해야 글을 작성하실 수 있습니다.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        });
        return false;
      }

      const memberId = await getMemberIdAPI();
      const shareId = selectedPlan.shareId;
      await postCommunityAPI(memberId, shareId, title, isPublic, content);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    isPublic,
    setIsPublic,
    selectedPlan,
    setSelectedPlan,
    shareRooms,
    plans,
    handleSelectPlan,
    submitPost,
  };
};
