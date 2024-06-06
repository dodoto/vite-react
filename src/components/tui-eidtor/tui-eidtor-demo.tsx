import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";

export const TuiEditorDemo = () => {
  const editorRef = useRef<Editor>(null);

  return (
    <Editor 
      ref={editorRef}
      initialValue="<p>Hello, world!</p>"
      previewStyle="vertical"
      height="500px"
      initialEditType="markdown"
      useCommandShortcut={false}
      onLoad={(editor) => {
        console.log("editor load", editor);
      }}
      onChange={function (type) {
        // const editorInstance = editorRef.current!.getInstance();
        // const html = editorInstance.getHTML();
        // const markdown = editorInstance.getMarkdown();
        const html = editorRef.current!.getInstance().getMarkdown();
        console.log("editor change", type);
        if (html.endsWith("@")) {
          console.log("show selector");
        }
      }}
      onCaretChange={(type) => {
        console.log("editor caret change", type);
      }}
      onFocus={(type) => {
        console.log("editor focus", type);
      }}
      onBlur={(type) => {
        console.log("editor blur", type);
      }}
      // onKeydown={(type, event) => {
      //   console.log("editor keydown", type, event);
      // }}
      // onKeyup={(type, event) => {
      //   console.log("editor keyup", type, event);
      // }}
      // onBeforePreviewRender={(html) => {
      //   console.log("editor before preview render", html);
      //   return html;
      // }}
      // onBeforeConvertWysiwygToMarkdown={(text) => {
      //   console.log("editor before convert wysiwyg to markdown", text);
      //   return text;
      // }}
    />
  );
};