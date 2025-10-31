"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface FilterContextType {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedTag, setSelectedTagState] = useState<string | null>(null);

  // Read from URL on mount and when URL changes
  useEffect(() => {
    const tagFromUrl = searchParams.get("tag");
    // Default to "Hightlight" if no tag in URL and we're on home page
    if (pathname === "/") {
      const defaultTag = tagFromUrl || "Hightlight";
      setSelectedTagState(defaultTag);
      
      // Update URL if no tag param exists (to set default)
      if (!tagFromUrl) {
        router.replace("?tag=Hightlight", { scroll: false });
      }
    } else {
      setSelectedTagState(tagFromUrl);
    }
  }, [searchParams, pathname, router]);

  const setSelectedTag = (tag: string | null) => {
    setSelectedTagState(tag);
    
    // Update URL when tag changes
    if (pathname === "/") {
      if (tag) {
        router.replace(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
      } else {
        router.replace("/", { scroll: false });
      }
    }
  };

  return (
    <FilterContext.Provider value={{ selectedTag, setSelectedTag }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}

