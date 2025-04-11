// import { useEffect, useRef } from "react";
// import * as fabric from "fabric";

// export default function CanvasEditor({ imageUrl, goBack }) {
//   const canvasRef = useRef(null);
//   const fabricCanvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Initialize Fabric canvas
//     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
//       preserveObjectStacking: true,
//     });
//     fabricCanvas.setWidth(800);
//     fabricCanvas.setHeight(600);
//     fabricCanvasRef.current = fabricCanvas;

//     console.log("Loading image from:", imageUrl);

//     // Create image element and wait for load
//     const imgEl = new Image();
//     imgEl.crossOrigin = "anonymous";
//     imgEl.src = imageUrl;

//     imgEl.onload = () => {
//       const fabricImage = new fabric.Image(imgEl, {
//         scaleX: 800 / imgEl.width,
//         scaleY: 600 / imgEl.height,
//         selectable: false,
//       });
//       fabricCanvas.backgroundImage = fabricImage;
//       fabricCanvas.renderAll();
//     };

//     imgEl.onerror = () => {
//       console.error("Image failed to load (likely CORS issue)");
//     };

//     // Text tool
//     window.addText = () => {
//       const text = new fabric.Textbox("Your text here", {
//         left: 100,
//         top: 50,
//         fontSize: 24,
//         fill: "black",
//       });
//       fabricCanvas.add(text);
//     };

//     // Shapes tool
//     window.addShape = (type) => {
//       let shape;
//       switch (type) {
//         case "rect":
//           shape = new fabric.Rect({
//             width: 100,
//             height: 60,
//             fill: "red",
//             top: 100,
//             left: 100,
//           });
//           break;
//         case "circle":
//           shape = new fabric.Circle({
//             radius: 40,
//             fill: "green",
//             top: 150,
//             left: 150,
//           });
//           break;
//         case "triangle":
//           shape = new fabric.Triangle({
//             width: 100,
//             height: 100,
//             fill: "blue",
//             top: 200,
//             left: 200,
//           });
//           break;
//         default:
//           return;
//       }
//       fabricCanvas.add(shape);
//     };

//     // Download image
//     window.download = () => {
//       const link = document.createElement("a");
//       link.href = fabricCanvas.toDataURL({ format: "png" });
//       link.download = "edited-image.png";
//       link.click();
//     };

//     // Cleanup on unmount
//     return () => {
//       fabricCanvas.dispose();
//     };
//   }, [imageUrl]);

//   return (
//     <div>
//       <button onClick={() => window.addText()}>Add Text</button>
//       <button onClick={() => window.addShape("rect")}>Add Rectangle</button>
//       <button onClick={() => window.addShape("circle")}>Add Circle</button>
//       <button onClick={() => window.addShape("triangle")}>Add Triangle</button>
//       <button onClick={() => window.download()}>Download</button>
//       <button onClick={goBack}>Go Back</button>
//       <div>
//         <canvas ref={canvasRef} width={800} height={600} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function CanvasEditor({ imageUrl, goBack }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });
    fabricCanvas.setWidth(800);
    fabricCanvas.setHeight(600);
    fabricCanvasRef.current = fabricCanvas;

    const imgEl = new Image();
    imgEl.crossOrigin = "anonymous";
    imgEl.src = imageUrl;

    imgEl.onload = () => {
      const fabricImage = new fabric.Image(imgEl, {
        scaleX: 800 / imgEl.width,
        scaleY: 600 / imgEl.height,
        selectable: false,
      });

      fabricCanvas.backgroundImage = fabricImage;
      fabricCanvas.renderAll();
    };

    window.addText = () => {
      const text = new fabric.Textbox("Your text here", {
        left: 100,
        top: 50,
        fontSize: 24,
        fill: "black",
      });
      fabricCanvas.add(text);
    };

    window.addShape = (type) => {
      let shape;
      switch (type) {
        case "rect":
          shape = new fabric.Rect({
            width: 100,
            height: 60,
            fill: "red",
            top: 100,
            left: 100,
          });
          break;
        case "circle":
          shape = new fabric.Circle({
            radius: 40,
            fill: "green",
            top: 150,
            left: 150,
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: "blue",
            top: 200,
            left: 200,
          });
          break;
        default:
          return;
      }
      fabricCanvas.add(shape);
    };

    window.download = () => {
      const link = document.createElement("a");
      link.href = fabricCanvas.toDataURL({ format: "png" });
      link.download = "edited-image.png";
      link.click();
    };

    return () => fabricCanvas.dispose();
  }, [imageUrl]);

  return (
    <div>
      <div className="button-bar">
        <button onClick={() => window.addText()}>Add Text</button>
        <button onClick={() => window.addShape("rect")}>Add Rectangle</button>
        <button onClick={() => window.addShape("circle")}>Add Circle</button>
        <button onClick={() => window.addShape("triangle")}>
          Add Triangle
        </button>
        <button onClick={() => window.download()} className="success">
          Download
        </button>
        <button onClick={goBack} className="secondary">
          Go Back
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <canvas ref={canvasRef} width={800} height={600} />
      </div>
    </div>
  );
}
