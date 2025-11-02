"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

type Tool = "select" | "draw" | "erase" | "rectangle" | "text" | "arrow"

interface Shape {
  id: string
  type: "rectangle" | "ellipse" | "line" | "text"
  x: number
  y: number
  width?: number
  height?: number
  x2?: number
  y2?: number
  text?: string
  color: string
}

export default function ItalismPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>("select")
  const [shapes, setShapes] = useState<Shape[]>([
    {
      id: "1",
      type: "rectangle",
      x: 100,
      y: 100,
      width: 750,
      height: 50,
      color: "#6366f1",
      text: "Digital Liberation",
    },
    { id: "2", type: "rectangle", x: 360, y: 180, width: 480, height: 50, color: "#6366f1", text: "Post-Appitalism" },
    {
      id: "3",
      type: "rectangle",
      x: 50,
      y: 340,
      width: 1110,
      height: 50,
      color: "#10b981",
      text: "Collaborative Economy",
    },
    { id: "4", type: "ellipse", x: 270, y: 430, width: 1020, height: 40, color: "#10b981", text: "Decentralized" },
    { id: "5", type: "ellipse", x: 310, y: 530, width: 1110, height: 40, color: "#10b981", text: "Future" },
    { id: "6", type: "rectangle", x: 80, y: 605, width: 1110, height: 50, color: "#6366f1", text: "Community" },
    { id: "7", type: "rectangle", x: 290, y: 710, width: 630, height: 50, color: "#8b5cf6", text: "Innovation" },
  ])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentShape, setCurrentShape] = useState<Partial<Shape> | null>(null)
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw shapes
    shapes.forEach((shape) => {
      ctx.strokeStyle = shape.color
      ctx.lineWidth = 2
      ctx.fillStyle = shape.color
      ctx.font = "16px sans-serif"

      if (shape.type === "rectangle" && shape.width && shape.height) {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        if (shape.text) {
          ctx.fillText(shape.text, shape.x + 10, shape.y + shape.height / 2 + 5)
        }
      } else if (shape.type === "ellipse" && shape.width && shape.height) {
        ctx.beginPath()
        ctx.ellipse(
          shape.x + shape.width / 2,
          shape.y + shape.height / 2,
          shape.width / 2,
          shape.height / 2,
          0,
          0,
          2 * Math.PI,
        )
        ctx.stroke()
        if (shape.text) {
          ctx.fillText(shape.text, shape.x + shape.width / 2 - 50, shape.y + shape.height / 2 + 5)
        }
      } else if (shape.type === "line" && shape.x2 && shape.y2) {
        ctx.beginPath()
        ctx.moveTo(shape.x, shape.y)
        ctx.lineTo(shape.x2, shape.y2)
        ctx.stroke()
      }

      // Highlight selected shape
      if (selectedShape === shape.id && shape.width && shape.height) {
        ctx.strokeStyle = "#22d3ee"
        ctx.lineWidth = 3
        ctx.strokeRect(shape.x - 5, shape.y - 5, shape.width + 10, shape.height + 10)
      }
    })
  }, [shapes, selectedShape])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "select") {
      // Find clicked shape
      const clicked = shapes.find((shape) => {
        if (shape.width && shape.height) {
          return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height
        }
        return false
      })
      setSelectedShape(clicked?.id || null)
    } else if (tool === "draw" || tool === "rectangle") {
      setIsDrawing(true)
      setCurrentShape({
        id: Date.now().toString(),
        type: tool === "rectangle" ? "rectangle" : "line",
        x,
        y,
        color: "#6366f1",
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentShape) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentShape.type === "rectangle") {
      setCurrentShape({
        ...currentShape,
        width: x - (currentShape.x || 0),
        height: y - (currentShape.y || 0),
      })
    } else if (currentShape.type === "line") {
      setCurrentShape({
        ...currentShape,
        x2: x,
        y2: y,
      })
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && currentShape) {
      setShapes([...shapes, currentShape as Shape])
      setCurrentShape(null)
    }
    setIsDrawing(false)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-700">
        <h1 className="text-xl font-semibold text-cyan-400">Interactive Canvas</h1>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          {currentShape && (
            <div className="absolute top-4 left-4 bg-slate-800 px-4 py-2 rounded-lg text-sm">
              Drawing {currentShape.type}...
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-slate-800 p-6 space-y-6 overflow-y-auto">
          <div>
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">FolkJS Canvas</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                • Use toolbar to <span className="text-white font-medium">draw</span> and create shapes
              </li>
              <li>
                • Click and drag to <span className="text-white font-medium">move</span> elements
              </li>
              <li>
                • Double-click text to <span className="text-white font-medium">edit</span>
              </li>
              <li>
                • Use <span className="text-white font-medium">select</span> tool to interact
              </li>
              <li>
                • Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Space</kbd> for{" "}
                <span className="text-white font-medium">fullscreen</span>
              </li>
            </ul>
          </div>

          {/* Toolbar */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Tools</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "select", label: "Select" },
                { id: "draw", label: "Draw" },
                { id: "erase", label: "Erase" },
                { id: "rectangle", label: "Rectangle" },
                { id: "text", label: "Text" },
                { id: "arrow", label: "Arrow" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id as Tool)}
                  className={`px-3 py-2 rounded text-sm transition-colors ${
                    tool === t.id ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={toggleFullscreen}
              className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
            >
              {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </button>
            <button
              onClick={() => setShapes([])}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
            >
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
