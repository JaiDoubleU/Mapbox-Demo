"use client";

import * as React from "react";
import { dist, type Pt } from "@/lib/geo";
import { useDataset } from "@/lib/dataset-context";
import { hitShape, selectableWells, type SelectionShape } from "@/lib/selection";
import type { DrawToolId, Layers } from "@/lib/types";
import type { MapEngine } from "./engine";

const P = "#3C8321", F = "rgba(60,131,33,.13)";
const MP = "#9b6dff", MF = "rgba(155,109,255,.13)";
const QP = "#3b9ae1", QF = "rgba(59,154,225,.18)";
const BRUSH_R = 30;

const ptsAttr = (pts: Pt[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

interface DrawOverlayProps {
  tool: DrawToolId;
  engine: MapEngine | null;
  layers: Layers;
  density: number;
  additive: boolean;
  onSelectMulti: (idxs: number[], additive: boolean) => void;
}

/** SVG capture layer for the shape-based selection tools (marquee, lasso, brush). */
export function DrawOverlay({ tool, engine, layers, density, additive, onSelectMulti }: DrawOverlayProps) {
  const data = useDataset();
  const selectable = React.useMemo(() => selectableWells(data, layers, density), [data, layers, density]);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [polyPts, setPolyPts] = React.useState<Pt[]>([]);
  const [trace, setTrace] = React.useState<Pt[]>([]);
  const traceRef = React.useRef<Pt[]>([]);
  const [tracing, setTracing] = React.useState(false);
  const [dragSt, setDragSt] = React.useState<Pt | null>(null);
  const [dragCur, setDragCur] = React.useState<Pt | null>(null);
  const [mouse, setMouse] = React.useState<Pt | null>(null);
  const [shift, setShift] = React.useState(false);

  const isPoly = tool === "poly-lasso";
  const isLasso = tool === "lasso", isMag = tool === "magnetic-lasso", isQuick = tool === "quick-select";
  const isRect = tool === "rect-marquee", isEll = tool === "ellipse-marquee";
  const isDrag = isRect || isEll, isPath = isLasso || isMag || isQuick;

  const reset = React.useCallback(() => {
    setPolyPts([]);
    setTrace([]);
    traceRef.current = [];
    setTracing(false);
    setDragSt(null);
    setDragCur(null);
  }, []);

  // Changing tools starts fresh; Escape cancels the shape in progress but keeps the tool.
  React.useEffect(reset, [tool, reset]);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && reset();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  const sv = (e: React.PointerEvent | React.MouseEvent): Pt => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const snapToWell = (pt: Pt): Pt => {
    if (!engine) return pt;
    let best: Pt | null = null, bestD = 35;
    for (const w of selectable) {
      const p = engine.project(w.lng, w.lat), dd = dist(p, pt);
      if (dd < bestD) {
        bestD = dd;
        best = p;
      }
    }
    return best ?? pt;
  };

  const runSel = (shape: SelectionShape) => {
    if (!engine) return;
    const idxs = selectable
      .filter((w) => hitShape(engine.project(w.lng, w.lat), shape))
      .map((w) => w.idx);
    onSelectMulti(idxs, additive);
  };

  // --- polygonal lasso: click to drop anchors; double-click, or tap the first anchor, to close
  const onPolyClick = (e: React.MouseEvent) => {
    if (e.detail >= 2) return;
    const pt = sv(e);
    if (polyPts.length >= 3 && dist(pt, polyPts[0]) < 18) {
      runSel({ type: "polygon", pts: polyPts });
      setPolyPts([]);
      return;
    }
    setPolyPts((p) => p.concat(pt));
  };
  const onPolyDbl = () => {
    if (polyPts.length >= 3) runSel({ type: "polygon", pts: polyPts });
    setPolyPts([]);
  };

  // --- marquees: drag (Shift locks square / circle)
  const onDragDown = (e: React.PointerEvent) => {
    const pt = sv(e);
    setDragSt(pt);
    setDragCur(pt);
  };
  const onDragMove = (e: React.PointerEvent) => {
    if (!dragSt) return;
    setShift(e.shiftKey);
    setDragCur(sv(e));
  };
  const onDragUp = (e: React.PointerEvent) => {
    const st = dragSt;
    if (!st) return;
    let en = sv(e);
    if (e.shiftKey) {
      const dx = en.x - st.x, dy = en.y - st.y, s = Math.min(Math.abs(dx), Math.abs(dy));
      en = { x: st.x + Math.sign(dx) * s, y: st.y + Math.sign(dy) * s };
    }
    const x1 = Math.min(st.x, en.x), x2 = Math.max(st.x, en.x), y1 = Math.min(st.y, en.y), y2 = Math.max(st.y, en.y);
    if (isRect && x2 - x1 > 5 && y2 - y1 > 5) runSel({ type: "rect", x1, y1, x2, y2 });
    else if (isEll) {
      const rx = (x2 - x1) / 2;
      const ry = e.shiftKey ? rx : (y2 - y1) / 2;
      if (rx > 5 || ry > 5) runSel({ type: "ellipse", cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx, ry });
    }
    setDragSt(null);
    setDragCur(null);
  };

  // --- lasso / magnetic lasso / brush: press and trace
  const onPathDown = (e: React.PointerEvent) => {
    const pt = sv(e);
    const p = isMag ? snapToWell(pt) : pt;
    traceRef.current = [p];
    setTrace([p]);
    setTracing(true);
  };
  const onPathMove = (e: React.PointerEvent) => {
    if (!tracing) return;
    const pt = sv(e);
    const p = isMag ? snapToWell(pt) : pt;
    traceRef.current = traceRef.current.concat(p);
    setTrace(traceRef.current);
  };
  const onPathUp = () => {
    setTracing(false);
    const pts = traceRef.current;
    if (pts.length >= 3) {
      if (isQuick) runSel({ type: "brush", path: pts, r: BRUSH_R });
      else runSel({ type: "polygon", pts });
    }
    traceRef.current = [];
    setTrace([]);
  };

  // marquee preview geometry
  const rX1 = dragSt?.x ?? 0, rY1 = dragSt?.y ?? 0;
  let rX2 = dragCur?.x ?? 0, rY2 = dragCur?.y ?? 0;
  if (shift && dragSt && dragCur) {
    const dx = rX2 - rX1, dy = rY2 - rY1, s = Math.min(Math.abs(dx), Math.abs(dy));
    rX2 = rX1 + Math.sign(dx) * s;
    rY2 = rY1 + Math.sign(dy) * s;
  }
  const mnX = Math.min(rX1, rX2), mnY = Math.min(rY1, rY2), rW = Math.abs(rX2 - rX1), rH = Math.abs(rY2 - rY1);
  const eRX = rW / 2, eRY = shift ? rW / 2 : rH / 2;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 z-[55] h-full w-full cursor-crosshair touch-none overflow-visible"
      onClick={isPoly ? onPolyClick : undefined}
      onDoubleClick={isPoly ? onPolyDbl : undefined}
      onPointerDown={(e) => {
        // Capture so a drag keeps reporting moves (touch and mouse) until it's released.
        if (isDrag || isPath) e.currentTarget.setPointerCapture(e.pointerId);
        if (isDrag) onDragDown(e);
        else if (isPath) onPathDown(e);
      }}
      onPointerMove={(e) => {
        setMouse(sv(e));
        if (isDrag) onDragMove(e);
        else if (isPath) onPathMove(e);
      }}
      onPointerUp={isDrag ? onDragUp : isPath ? onPathUp : undefined}
      onPointerCancel={() => reset()}
      onPointerLeave={(e) => e.pointerType === "mouse" && setMouse(null)}
    >
      {isPoly && polyPts.length > 0 && (
        <g>
          {polyPts.length > 2 && <polygon points={ptsAttr(polyPts)} fill={F} />}
          <polyline points={ptsAttr(polyPts)} fill="none" stroke={P} strokeWidth={1.5} strokeDasharray="5 3" />
          {mouse && (
            <line
              x1={polyPts[polyPts.length - 1].x}
              y1={polyPts[polyPts.length - 1].y}
              x2={mouse.x}
              y2={mouse.y}
              stroke={P}
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.55}
            />
          )}
          {polyPts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i === 0 ? 5 : 3.5} fill={i === 0 ? P : "#fff"} stroke={P} strokeWidth={1.5} />
          ))}
          {polyPts.length >= 3 && mouse && dist(mouse, polyPts[0]) < 18 && (
            <circle cx={polyPts[0].x} cy={polyPts[0].y} r={10} fill="none" stroke={P} strokeWidth={1.5} opacity={0.45} />
          )}
        </g>
      )}

      {(isLasso || isMag) && trace.length > 0 && (
        <g>
          {trace.length > 2 && <polygon points={ptsAttr(trace)} fill={isMag ? MF : F} />}
          <polyline points={ptsAttr(trace)} fill="none" stroke={isMag ? MP : P} strokeWidth={1.5} strokeDasharray="4 2" />
          {isMag &&
            trace
              .filter((_, i) => i % 6 === 0)
              .map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill={MP} opacity={0.75} />)}
          <circle cx={trace[0].x} cy={trace[0].y} r={4.5} fill={isMag ? MP : P} />
        </g>
      )}

      {isQuick && (
        <g>
          {trace.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={BRUSH_R} fill={QF} />
          ))}
          {trace.length > 0 && (
            <circle
              cx={trace[trace.length - 1].x}
              cy={trace[trace.length - 1].y}
              r={BRUSH_R}
              fill="none"
              stroke={QP}
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />
          )}
          {!tracing && mouse && (
            <circle cx={mouse.x} cy={mouse.y} r={BRUSH_R} fill={QF} stroke={QP} strokeWidth={1.3} strokeDasharray="4 2" />
          )}
        </g>
      )}

      {isRect && dragSt && dragCur && (
        <rect x={mnX} y={mnY} width={rW} height={rH} fill={F} stroke={P} strokeWidth={1.5} strokeDasharray="6 3" />
      )}
      {isEll && dragSt && dragCur && eRX > 2 && (
        <g>
          <ellipse cx={(rX1 + rX2) / 2} cy={(rY1 + rY2) / 2} rx={eRX} ry={eRY} fill={F} stroke={P} strokeWidth={1.5} strokeDasharray="6 3" />
          <circle cx={(rX1 + rX2) / 2} cy={(rY1 + rY2) / 2} r={3} fill={P} />
        </g>
      )}
    </svg>
  );
}
