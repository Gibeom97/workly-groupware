import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";

const ApprovalWriteBody = ({ approvalData, setApprovalData }) => {
  const editorRef = useRef(null);


  // ✅ 에디터의 초기 값 설정
  const [editorContent, setEditorContent] = useState(approvalData.approvalContent || "");

  useEffect(() => {
    setApprovalData((prevData) => ({
      ...prevData,
      approvalContent: editorContent,
    }));
  }, [editorContent]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Editor
        apiKey="kfbtq0klr5lef8kfjp5pkpy6g2mt9wjl1nwhtg76wek8u9v8"
        cloudChannel="5"
        value={editorContent}
        onEditorChange={(content) => setEditorContent(content)}
        init={{
          height: 550,
          width: 900,
          menubar: true, // ✅ 상단 메뉴바 표시
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | table | link | fullscreen",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
      />
    </div>
  );
};

export default ApprovalWriteBody;
