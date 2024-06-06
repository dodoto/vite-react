import { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import HeartFill from "../../assets/heart-fill.svg";
import Masthead from "../../assets/masthead.png";
import Triangle from "../../assets/sort-up.svg";

export const Clip = () => {
  const [res, setRes] = useState<string>();
  const ref = useRef<Cropper>();
  const cropperFace = useRef<HTMLSpanElement>();
  const handleCrop = () => {
    const srcCnavas = ref.current!.getCroppedCanvas();
    const width = srcCnavas.width;
    const height = srcCnavas.height;
    const dstCanvas = document.createElement("canvas");
    const context = dstCanvas.getContext("2d")!;
    dstCanvas.width = width;
    dstCanvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(srcCnavas, 0, 0, width, height);
    // 把 mask 画到 canvas 上, 通过 globalCompositeOperation 实现遮罩效果
    context.globalCompositeOperation = "destination-in";

    context.beginPath();

    
    const mask = document.createElement("img");
    // mask.setAttribute("crossOrigin", "Anonymous");
    mask.src = HeartFill;
    mask.width = width;
    mask.height = height;
    mask.onload = () => {
      context.drawImage(mask, 0, 0, width, height);
      const res = dstCanvas.toDataURL();
      setRes(res);
    };

  };

  const handleCropperInit = (cropper: Cropper) => {
    ref.current = cropper;
  };

  useEffect(() => {
    // 给剪切宽添加 mask
    setTimeout(() => {
      const cropperRect = document.querySelector(".cropper-face") as HTMLSpanElement;
      cropperFace.current = cropperRect;
      Object.assign(cropperFace.current.style, {
        maskImage: `url(${HeartFill})`,
        maskMode: "luminance",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      });
    }, 250);


  }, []);

  return (
    <>
      <div style={{ width: "500px", height: "500px", margin: "auto" }}>
        <Cropper 
          src={Masthead}
          initialAspectRatio={1}
          aspectRatio={1}
          onInitialized={handleCropperInit}
          minCropBoxHeight={200}
          minCropBoxWidth={200}
          center={false}
          scaleX={1}
          scaleY={1}
          // cropBoxResizable={false}
        />
        <button onClick={handleCrop}>crop</button>
      </div>
      { res && <img src={res} width="200px" height="200px" style={{ margin: "auto" }}/> }
    </>
  );
};