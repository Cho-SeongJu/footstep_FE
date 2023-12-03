import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getPostAPI, updatePostAPI } from "../../../api/postAPI";
import Swal from "sweetalert2";
import HeaderContainer from "../../common/header/HeaderContainer";
import Footer from "../../common/footer/Footer";

const EditPost = () => {
  const { communityId } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const postData = await getPostAPI(Number(communityId));
        setPostContent(postData.content);
        setPostTitle(postData.communityName);
      } catch (error) {
        alert("error");
      }
    };

    fetchPostContent();
  }, [communityId]);

  const handleSubmit = async () => {
    if (inputTitleRef.current?.value.length === 0) {
      Swal.fire({
        icon: "error",
        text: "제목 입력은 필수입니다.",
      });
      return;
    }

    if (postContent.length === 0) {
      Swal.fire({
        icon: "error",
        text: "내용 입력은 필수입니다.",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "question",
      title: "글을 수정하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "수정하기",
      denyButtonText: "취소",
    });

    if (result.isConfirmed && inputTitleRef.current) {
      try {
        await updatePostAPI(
          Number(communityId),
          inputTitleRef.current?.value,
          postContent
        );
        navigate(`/community/${communityId}`);
      } catch (error) {
        alert("에러");
      }
    }
  };

  return (
    <>
      <HeaderContainer />
      <div className="mx-auto md:w-[50rem] lg:w-[55rem] min-h-[30rem] pt-[3rem] p-4 md:p-8">
        <div className="md:p-8 mb-8 rounded-lg bg-white-001">
          <input
            type="text"
            className="mb-4 pb-4 w-full border-b-2 text-2xl font-bold text-blue-003 outline-none"
            defaultValue={postTitle}
            onChange={onChangeHandler}
            ref={inputTitleRef}
            maxLength={25}
          />
          <CKEditor
            editor={ClassicEditor}
            data={postContent}
            onChange={(_event, editor) => {
              const data = editor.getData();
              setPostContent(data);
            }}
            onReady={(editor: any) => {
              editor.ui.view.editable.element.style.height = "500px";
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
          <div className="flex justify-end mt-20">
            <button
              onClick={handleSubmit}
              className="p-2 rounded bg-blue-003 text-white"
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
