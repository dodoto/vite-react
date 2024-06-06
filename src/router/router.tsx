import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import { Home, homeLoader } from "./home";
import { GoldenPoints } from "../components/golden-points/golden-points";
import { ExcalidrawIntegration } from "../components/excalidraw/excalidraw-i";
import { HSLColorPicker } from "../components/hsl-color/hsl-color-picker";
import { MessageWall } from "../components/watermelondb/message-wall/message-wall";
import { SvgRoot } from "../components/jotai/svg-root/svg-root";
import { NumberAnimation } from "../components/number-animation/number-animation";
import { NoiseDemo } from "../components/simplex-noise/simplex-noise";
import { FramerMotionCounter } from "../components/framer-motion-demo/counter";
import { DragAvatars } from "../components/framer-motion-demo/drag-avatars";
import { TodoApp } from "../components/recoil/recoil-todo";
import { InfScrollView } from "../components/infinite-scroll/infinite-scroll";
import { Headspace } from "../components/headspace/headspace";
import { Stick } from "../components/stick/stick";
import { TuiEditorDemo } from "../components/tui-eidtor/tui-eidtor-demo";
import { DoodleExampleList } from "../components/css-doodle/css-doodle-example-list";
import { MarkdownTest } from "../components/markdown-test/markdown-test"
// import { MatterDemo } from "../components/matter-demo/matter-demo";
// import { Gojiu } from "../components/gojiu/gojiu";
import { DropZone } from "../components/drop-zone";
import { Clip } from "../components/clip/clip";
import { ImageMask } from "../components/mask/image-mask";
import { QueryApp } from "../components/jikan-react-query/app";
import { TestCounter } from "../components/zustand/zustand-like";
import  { TickDemo } from "../components/tick-demo";
import { CursorDemo } from "../components/cursor/cursor";

// layout
import { Layout } from "./layout";

const Demos = [
  { path: "golden-points", element: <GoldenPoints />, title: "螺旋点" },
  { path: "excalidraw-preview", element: <ExcalidrawIntegration />, title: "Excalidraw 白板试用" },
  { path: "hsl-color", element: <HSLColorPicker />, title: "hsl 取色器" },
  { path: "message-wall", element: <MessageWall />, title: "watermelondb demo" },
  { path: "jotai-demo", element: <SvgRoot />, title: "jotai demo" },
  { path: "number-animation", element: <NumberAnimation />, title: "gasp 数字动画" },
  { path: "simple-noise", element: <NoiseDemo />, title: "simplex-noise 音乐律动效果" },
  { path: "framer-motion-counter", element: <FramerMotionCounter />, title: "framer-motion 计时器" },
  { path: "drag-avatars", element: <DragAvatars />, title: "framer-motion 拖拽头像" },
  { path: "recoil-todo", element: <TodoApp />, title: "recoil todo" },
  { path: "infinite-scroll", element: <InfScrollView />, title: "infinite scroll" },
  { path: "headspace", element: <Headspace />, title: "headspace" },
  { path: "stick", element: <Stick />, title: "stick" },
  { path: "tui-editor-demo", element: <TuiEditorDemo />, title: "tui-editor 试用" },
  { path: "css-doodle", element: <DoodleExampleList />, title: "css-doodle" },
  { path: "markdown-test", element: <MarkdownTest />, title: "markdown-test" },
  { path: "drop-zone", element: <DropZone />, title: "drop-zone" },
  // { path: "gojiu", element: <Gojiu />, title: "五十音" },
  // { path: "matter-demo", element: <MatterDemo />, title: "matter-js demo" },
  { path: "clip", element: <Clip />, title: "clip" },
  { path: "image-mask", element: <ImageMask />, title: "image-mask" },
  { path: "tanstack-query-demo", element: <QueryApp />, title: "tanstack-query-demo" },
  { path: "test-counter", element: <TestCounter />, title: "zustand-like test" },
  { path: "tick-demo", element: <TickDemo />, title: "tick demo" },
  { path: "cursor-demo", element: <CursorDemo />, title: "cursor demo" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home demos={Demos.map(({ path, title }) => ({ path, title }))}/>,
    loader: homeLoader,
  },
  {
    path: "/demo", element: <Layout />, children: [
      ...Demos,
    ]
  },
  { path: "*", element: <h1>404 Not found</h1> },
]);

export const BrowserRouter = () => <RouterProvider router={router} />;