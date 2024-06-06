import MarkdownIT from "markdown-it";
import { Text, Box } from "@chakra-ui/react";
import { FormEventHandler, KeyboardEventHandler, useState, useRef, useEffect } from "react";

// const markdownIt = new MarkdownIT();

// const editor = document.getElementById('editor');
// const selectionOutput = document.getElementById('selection');

// function getTextSegments(element: ChildNode) {
//     const textSegments: { text: string | null, node: ChildNode }[] = [];
//     Array.from(element.childNodes).forEach((node) => {
//         switch(node.nodeType) {
//             case Node.TEXT_NODE:
//                 textSegments.push({text: node.nodeValue, node});
//                 break;
                
//             case Node.ELEMENT_NODE:
//                 textSegments.splice(textSegments.length, 0, ...(getTextSegments(node)));
//                 break;
                
//             default:
//                 throw new Error(`Unexpected node type: ${node.nodeType}`);
//         }
//     });
//     return textSegments;
// }

// editor.addEventListener('input', updateEditor);

// function updateEditor() {
//     const sel = window.getSelection();
//     const textSegments = getTextSegments(editor!);
//     const textContent = textSegments.map(({text}) => text).join('');
//     let anchorIndex = 0;
//     let focusIndex = 0;
//     let currentIndex = 0;
//     textSegments.forEach(({text, node}) => {
//         if (node === sel!.anchorNode) {
//             anchorIndex = currentIndex + sel!.anchorOffset;
//         }
//         if (node === sel!.focusNode) {
//             focusIndex = currentIndex + sel!.focusOffset;
//         }
//         currentIndex += text!.length;
//     });
    
//     editor!.innerHTML = renderText(textContent);
    
//     restoreSelection(anchorIndex, focusIndex);
// }

// function restoreSelection(absoluteAnchorIndex: number, absoluteFocusIndex: number) {
//     const sel = window.getSelection();
//     const textSegments = getTextSegments(editor!);
//     let anchorNode = editor;
//     let anchorIndex = 0;
//     let focusNode = editor;
//     let focusIndex = 0;
//     let currentIndex = 0;
//     textSegments.forEach(({text, node}) => {
//         const startIndexOfNode = currentIndex;
//         const endIndexOfNode = startIndexOfNode + text!.length;
//         if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
//             anchorNode = node as HTMLElement;
//             anchorIndex = absoluteAnchorIndex - startIndexOfNode;
//         }
//         if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
//             focusNode = node as HTMLElement;
//             focusIndex = absoluteFocusIndex - startIndexOfNode;
//         }
//         currentIndex += text!.length;
//     });
    
//     sel!.setBaseAndExtent(anchorNode!,anchorIndex,focusNode!,focusIndex);
// }

// function renderText(text: string) {
//     const words = text.split(/(\s+)/);
//     const output = words.map((word) => {
//         if (word === 'bold') {
//             return `<strong>${word}</strong>`;
//         }
//         else if (word === 'red') {
//             return `<span style='color:red'>${word}</span>`;
//         }
//         else {
//             return word;
//         }
//     })
//     return output.join('');
// }

// updateEditor();

// const C = ({ id }: { id: string }) => {
//   return (
//     <Text id={id}mx="1" color="blue.300" as="span">this is child</Text>
//   );
// };

// // 删除整个C
// const insertC = (container: HTMLElement) => {
//   // container.appendChild(document.createTextNode("\u200b")); // 0宽字符控制光标使用 

//   const span = document.createElement("span");
//   Object.assign(span.style, {
//     color: "skyblue",
//   });
//   span.setAttribute("contenteditable", "false"); // 关键
//   span.append("this is child");
//   container.append(span);

//   // container.appendChild(document.createTextNode("\u200b"));
// };

// // 监听 space enter 添加 empty
// const createEmpty = () => {
//   const empty = document.createElement("span");
//   empty.innerHTML = "&nbsp;";
//   return empty;
// };
// // 不删除整个C
// const insertC1 = (container: HTMLElement) => {
//   const span = document.createElement("span");
//   span.append("this is child");
//   Object.assign(span.style, {
//     display: "inline-block",
//     marginLeft: "1ch",
//     color: "skyblue",
//   });
//   container.append(span);
//   container.append(createEmpty());
// };

// type InputState = string | { id: string };

// // 解析 contentEditable div 的 innerHTML
// const rawComponentReg = /<span class="chakra-text css-\w+" id="\w+">.+<\/span>/gm;
// // (正则) 表示切割的时候保留正则内容 
// const componentReg = /(<span class="chakra-text css-\w+" id="\w+">.+<\/span>)/gm
// const parseHTML = (html: string) => {
//   const input = html.split(componentReg).filter(content => content.length > 0);
//   // console.log("parse input", input.map(item => rawComponentReg.test(item) ? { id: "1" } : item));
//   return input.map(item => rawComponentReg.test(item) ? { id: "1" } : item);
// };

// // html to string ----> save
// // stirng to html ----> render

// export const MarkdownTest = () => {
//   const editor = useRef<HTMLDivElement>(null);
//   // const [input, setInput] = useState<InputState[]>(["hello world", { id: "1" }]);

//   const handleChange: FormEventHandler<HTMLDivElement> = (evt) => {
//     // const { innerHTML } = evt.target as any;
//     // const newInput = parseHTML(innerHTML);
//     // console.log(newInput)
//     // setInput(newInput);
//   };

//   const handleKeyup: KeyboardEventHandler<HTMLDivElement> = (evt) => {
//     const { code } = evt;

//     if (code === "Space") {
//       editor.current!.appendChild(createEmpty());
//     } else if (code === "Backspace") {

//     }
//   //   const ed = editor.current!
//   //   const cn = ed.childNodes;
  
//   //   if (cn[cn.length - 1].nodeType !== Node.TEXT_NODE)
//   //   {
//   //     const empty = document.createTextNode( '\uFEFF' );
//   //      ed.appendChild(empty);
//   //   }
  
//   //  if (cn[0].nodeType !== Node.TEXT_NODE)
//   //   {
//   //     const empty = document.createTextNode( '\uFEFF' );
//   //      ed.prepend(empty);
//   //   }
//   };

//   // console.log(markdownIt.parse(source, {}));
//   useEffect(() => {
//     insertC1(editor.current!);
//   }, []);

//   return (
//     <div contentEditable onInput={handleChange} onKeyUp={handleKeyup} ref={editor}>
//       hello world
//       {
//         // input.map((content, index) => (
//         //   typeof content === 'string' ? content : <C id={content.id} key={`${index}-${content.id}`}/>
//         // ))
//       }
//     </div>
//   );
// };

type Content = string | { id: string, text: string };

// content to html
const renderHTML = (content: Content[]) => {
  let html = "";
  content.forEach((item) => {
    if (typeof item === "string") {
      html += item;
    } else {
      html += `<span style="color:red" id="${item.id}">${item.text}</span>`;
    }
  });
  return html;
};

// html to content
const rawTagReg = /<span style="color:red" id="\w+">\w+<\/span>/gm;
const tagReg = /(<span style="color:red" id="\w+">\w+<\/span>)/gm;
const renderContent = (html: string) => {
  const content = html.split(tagReg).filter(content => content.length > 0);
  const result: Content[] = [];
  content.forEach((item, index) => {
    const isSpecial = rawTagReg.test(item);
    if (isSpecial) {
      const text = document.createRange().createContextualFragment(item).textContent!;
      const id = item.split("id=")[1][1];
      result.push({ id, text });
    } else {
      result.push(item);
    }
  });
  return result;
  // return content.map((item, index) => {
  //   const isSpecial = rawTagReg.test(item);
  //   rawTagReg.test(item);
  //   // console.log(rawTagReg.test(item), index)
  //   if (isSpecial) {
  //     console.log(index, item);
  //     const fragement = document.createRange().createContextualFragment(item);
  //     const id = item.split("id=")[1][1];
  //     return { id, text: fragement.textContent! };
  //   } else {
  //     return item;
  //   }
  // });
};

const list = [{ id: "1", text: "item1" }, { id: "2", text: "item2" }];

const getItem = (id: string) => {
  return list.find(item => item.id === id)
};

// 处理每次输入结束光标会跳到首位
// 处理普通文本输入到标签内的问题
export const MarkdownTest = () => {
  const ed = useRef<HTMLDivElement>(null);

  const [content, setContent] = useState<Content[]>(["hello world", { id: "1", text: "item1" }, { id: "2", text: "item2" }]);

  const html = renderHTML(content);

  const handleInput: FormEventHandler<HTMLDivElement> = (evt) => {
    const { innerHTML } = evt.target as any;
    // get newContent
    const newContent = renderContent(innerHTML);
    // compare newContent special item with fixed special data
    // not equal { id, text } to pure text
    newContent.forEach((item, index) => {
      console.log(newContent, item);
      if (typeof item !== 'string') {
        const fixedItem = getItem(item.id);
        if (fixedItem && fixedItem.text !== item.text) {
          newContent[index] = item.text;
        }
      }
    });
    setContent(newContent);
    console.log("input");
  };

  const handleKeyup: KeyboardEventHandler = (evt) => {
    const { code } = evt;
    
    console.log("keyup", code)
  };

  useEffect(() => {
    console.log(ed.current!.textContent)
  }, [])


  return (
    <div 
      ref={ed} 
      contentEditable 
      dangerouslySetInnerHTML={{__html: html}} 
      onKeyUp={handleKeyup}
      onInput={handleInput}></div>
  );
};