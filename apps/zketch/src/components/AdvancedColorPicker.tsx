import React, { useState, useRef, useEffect } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface AdvancedColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdvancedColorPicker({
  color,
  setColor,
}: AdvancedColorPickerProps): any {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Curated "marker set" palette — vivid, evenly-spaced hues that read
  // well on both the light paper canvas and the dark chalkboard canvas.
  const predefinedColors: string[] = [
    "#F5F5F7", // chalk white
    "#1E1E2E", // ink black
    "#F97316", // zketch amber (brand accent)
    "#8B5CF6", // zketch violet (brand primary)
    "#EF4444", // marker red
    "#10B981", // marker green
    "#38BDF8", // sky blue
    "#EC4899", // pink
  ];

  // Close the picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative" ref={pickerRef} title="Pick Color">
      {/* Color button */}
      <motion.button
        className="w-8 h-8 rounded-lg border-2 p-2 m-0 mr-2 border-border shadow-md cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{ boxShadow: showPicker ? "0 0 0 2px hsl(var(--ring))" : "none" }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />

      {/* Color picker panel */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            className="absolute top-14 left-0 z-10 bg-popover text-popover-foreground p-3 shadow-xl rounded-xl border border-border"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {/* ChromePicker for detailed selection */}
            <ChromePicker
              color={color}
              onChange={(newColor: ColorResult) => setColor(newColor.hex)}
            />

            {/* Predefined color options */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {predefinedColors.map((preColor) => (
                <motion.button
                  key={preColor}
                  className="w-8 h-8 rounded-full border border-border cursor-pointer flex items-center justify-center"
                  style={{ backgroundColor: preColor }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setColor(preColor);
                    setShowPicker(false);
                  }}
                >
                  {color.toLowerCase() === preColor.toLowerCase() && (
                    <Check
                      className="w-4 h-4"
                      style={{
                        color: preColor === "#F5F5F7" ? "#1E1E2E" : "#F5F5F7",
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
