import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEditor } from "../../hooks/useEditor";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const EditorArea = () => {
  const { checkLocationPath } = useRequireAuth();

  const {
    setTitle,
    content,
    setContent,
    setIsPublic,
    selectedPlan,
    plans,
    handleSelectPlan,
    submitPost,
  } = useEditor();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "접근 불가",
        text: "게시글 작성은 로그인 후 이용 가능합니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      navigate("/community");
    }

    checkLocationPath();
  }, []);

  const submitPostWithConfirmation = async () => {
    const result = await Swal.fire({
      title: "게시글 작성",
      text: "작성한 내용으로 게시하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "취소",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const postResult = await submitPost();
      if (postResult) {
        Swal.fire("성공!", "게시글이 정상적으로 등록되었습니다", "success");
        navigate("/community");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("취소", "게시글이 등록되지 않았습니다", "error");
    }
  };

  return (
    <>
      <div className="mx-auto md:w-[50rem] lg:w-[55rem] min-h-screen pt-[3rem] md:p-8">
        <div className="p-4 md:p-8 mb-8 rounded-lg bg-white-001">
          <h2 className="mb-4 pb-4 w-full border-b-2 text-2xl font-bold text-blue-003">
            새 게시글 작성
          </h2>
          <div>
            <select
              value={selectedPlan ? selectedPlan.shareName : ""}
              onChange={(e) => {
                const selectedPlanName = e.target.value;
                const selectedPlan = plans.shareRoomDtoList.find(
                  (plan) => plan.shareName === selectedPlanName
                );
                if (selectedPlan) {
                  handleSelectPlan(selectedPlan);
                }
              }}
              className="w-full p-2 mb-4 border-2 border-gray-002 rounded-md"
            >
              <option value="">일정을 선택해주세요</option>
              {plans.shareRoomDtoList.map((plan) => (
                <option
                  key={plan.shareId}
                  value={plan.shareName}
                >
                  {plan.shareName}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-4 py-3 mb-4 border-2 border-gray-002 rounded-md placeholder:text-sm"
          />
          <label className="flex items-center ml-2 mb-4">
            <input
              type="checkbox"
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
              defaultChecked
            />
            게시글 공개
          </label>
          <div className="w-full p-2 mb-4 border-2 border-gray-002 rounded-md">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(_event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              onReady={(editor: any) => {
                editor.ui.view.editable.element.style.height = "400px";
              }}
              config={{
                removePlugins: [
                  "Image",
                  "Table",
                  "MediaEmbed",
                  "CKFinder",
                  "ImageCaption",
                  "ImageStyle",
                  "ImageToolbar",
                  "ImageUpload",
                  "Link",
                  "Autoformat",
                  "BlockQuote",
                  "Heading",
                  "List",
                  "Indent",
                  "PasteFromOffice",
                  "TextTransformation",
                  "CKBox",
                  "EasyImage",
                  "UploadAdapter",
                ],
              }}
            />
          </div>
          <div className="flex justify-end mt-40">
            <button
              onClick={submitPostWithConfirmation}
              className="p-2 rounded bg-blue-003 text-white"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditorArea;
