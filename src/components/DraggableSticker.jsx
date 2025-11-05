import { useState, useRef, useEffect } from "react";

export default function DraggableSticker({
  src,
  parentRef,
  initialX = 50,
  initialY = 50,
}) {
  const stickerRef = useRef(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [showOverlay, setShowOverlay] = useState(true);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Get pointer coordinates (mouse or touch)
  const getPointerCoords = (e) => ({
    x: e.clientX ?? e.touches[0].clientX,
    y: e.clientY ?? e.touches[0].clientY,
  });

  const handlePointerDown = (e) => {
    e.preventDefault();
    dragging.current = true;

    const { x, y } = getPointerCoords(e);
    const rect = stickerRef.current.getBoundingClientRect();

    // Calculate offset relative to sticker
    offset.current = {
      x: x - rect.left,
      y: y - rect.top,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    const { x, y } = getPointerCoords(e);
    const parentRect = parentRef.current.getBoundingClientRect();
    const stickerRect = stickerRef.current.getBoundingClientRect();
    const width = stickerRect.width;
    const height = stickerRect.height;

    // New position relative to parent and offset
    let newX = x - offset.current.x - parentRect.left;
    let newY = y - offset.current.y - parentRect.top;

    // Constrain inside parent
    newX = Math.max(0, Math.min(newX, parentRect.width - width));
    newY = Math.max(0, Math.min(newY, parentRect.height - height));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    dragging.current = false;
    setShowOverlay(false); // Hide "Drag me" after first drag
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={stickerRef}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: "none",
        cursor: "grab",
        width: "80px",
        height: "80px",
        zIndex: 10,
      }}
    >
      <img
        src={src}
        alt="sticker"
        className="w-full h-full select-none"
        draggable={false}
      />
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white bg-opacity-80 text-black px-2 py-1 rounded text-xs font-bold">
            Drag me
          </div>
        </div>
      )}
    </div>
  );
}
