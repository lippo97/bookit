import { useState } from "react";

export const useOpenClose = (initial: boolean = false) => {
  const [isOpen, setOpen] = useState(initial);

  return [isOpen, () => setOpen(true), () => setOpen(false)] as const;
};
