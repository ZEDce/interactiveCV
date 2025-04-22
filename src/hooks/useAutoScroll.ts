import { useEffect, RefObject, DependencyList } from "react";

/**
 * Automatically scrolls the referenced container to its bottom when deps change.
 * @param ref - RefObject pointing to a scrollable container
 * @param deps - React DependencyList that triggers scrolling when updated
 */
export default function useAutoScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  deps: DependencyList
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [ref, ...deps]);
}
