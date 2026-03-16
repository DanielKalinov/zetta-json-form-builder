import type { SxProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function useOutputAnimation(output: {}) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!isSubmitting) return;

    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(t);
  }, [output]);

  const sx: SxProps = {
    animation: animate ? "pulse 0.3s ease" : "none",
    "@keyframes pulse": {
      "0%": { opacity: 1, transform: "scale(1)" },
      "50%": { opacity: 0.2, transform: "scale(0.98)" },
      "100%": { opacity: 1, transform: "scale(1)" },
    },
  };

  return { sx };
}
