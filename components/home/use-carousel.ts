"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Deliberate travel, so an unsteady hand does not change slides by accident. */
const SWIPE_MIN_DISTANCE = 48;
const SWIPE_MAX_DURATION = 300;

type Controls = {
  tabIndex: number;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
};

type Carousel = {
  index: number;
  /** Wraps in both directions, so the ends are never a dead press. */
  go: (next: number) => void;
  /**
   * False when the visitor asks for reduced motion. The slide transition has to
   * be applied inline because the transform is computed per slide, so it cannot
   * be left to a media query in the stylesheet.
   */
  animate: boolean;
  /** Spread onto the element that owns the gesture and the arrow keys. */
  controls: Controls;
};

/**
 * Both carousels on the site — the hero's life-stage paintings and the app
 * gallery — move the same way: swipe, arrow keys, Home and End, and no motion at
 * all for a visitor who asks for none. Shared so the two cannot drift apart:
 * a gesture that works on one has to work on the other, for an audience that
 * learns the interaction once.
 */
export function useCarousel(count: number): Carousel {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touch = useRef<{ x: number; y: number; at: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimate(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(index - 1);
    else if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(count - 1);
    else return;
    event.preventDefault();
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const point = event.touches[0];
    touch.current = { x: point.clientX, y: point.clientY, at: Date.now() };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;

    const point = event.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;

    // Ignore anything that reads as vertical scrolling rather than a swipe.
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dx) <= Math.abs(dy)) return;
    if (Date.now() - start.at > SWIPE_MAX_DURATION) return;

    go(dx < 0 ? index + 1 : index - 1);
  };

  return { index, go, animate, controls: { tabIndex: 0, onKeyDown, onTouchStart, onTouchEnd } };
}
