"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiCloseLine,
} from "react-icons/ri";

const ToastContext = createContext(null);

const icons = {
  success: <RiCheckLine className="w-4 h-4 text-[--color-green-400]" />,
  error: <RiErrorWarningLine className="w-4 h-4 text-[--color-red-400]" />,
  info: <RiInformationLine className="w-4 h-4 text-[--color-blue-400]" />,
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center gap-2.5 bg-[--color-bg-raised] border border-[--color-border-subtle] rounded-lg px-4 py-3 shadow-lg"
            >
              {icons[t.type]}
              <span className="text-sm text-[--color-text-primary] flex-1">
                {t.message}
              </span>
              <button
                onClick={() => removeToast(t.id)}
                className="text-[--color-text-disabled] hover:text-[--color-text-muted] transition-colors p-0.5"
              >
                <RiCloseLine className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
