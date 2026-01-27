"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AutoScrollImageProps {
  src: string;
  alt: string;
  scrollDuration?: number;
  inactivityDelay?: number;
  pauseAtEnds?: number;
}

export default function AutoScrollImage({
  src,
  alt,
  scrollDuration = 20,
  inactivityDelay = 3000,
  pauseAtEnds = 1000,
}: AutoScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImageHeight(img.naturalHeight);
  };

  const handleManualInteraction = () => {
    setIsManualScrolling(true);
    isAutoScrollingRef.current = false;

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, inactivityDelay);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageHeight || isManualScrolling) return;

    const containerHeight = container.clientHeight;
    const maxScroll = imageHeight - containerHeight;

    if (maxScroll <= 0) return;

    isAutoScrollingRef.current = true;
    let animationId: number;
    let startTime: number;
    let startScroll: number;
    let currentDir = direction;

    const scroll = async () => {
      while (isAutoScrollingRef.current && !isManualScrolling) {
        const container = containerRef.current;
        if (!container) break;

        startScroll = container.scrollTop;
        startTime = performance.now();

        // Determine distance and target based on direction
        const targetScroll = currentDir === "down" ? maxScroll : 0;
        const distance = Math.abs(targetScroll - startScroll);
        const duration = (distance / maxScroll) * scrollDuration * 1000;

        // Animate scroll
        await new Promise<void>((resolve) => {
          const animate = (currentTime: number) => {
            if (!isAutoScrollingRef.current || isManualScrolling) {
              resolve();
              return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Linear easing
            const newScroll = startScroll + (targetScroll - startScroll) * progress;
            container.scrollTop = newScroll;

            if (progress < 1) {
              animationId = requestAnimationFrame(animate);
            } else {
              resolve();
            }
          };

          animationId = requestAnimationFrame(animate);
        });

        // Check if we should continue
        if (!isAutoScrollingRef.current || isManualScrolling) break;

        // Pause at end
        await new Promise((resolve) => setTimeout(resolve, pauseAtEnds));

        if (!isAutoScrollingRef.current || isManualScrolling) break;

        // Switch direction
        currentDir = currentDir === "down" ? "up" : "down";
        setDirection(currentDir);
      }
    };

    scroll();

    return () => {
      isAutoScrollingRef.current = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [imageHeight, isManualScrolling, direction, scrollDuration, pauseAtEnds]);

  // Detect scroll direction when user scrolls manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isManualScrolling || !imageHeight) return;

    let lastScrollTop = container.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const maxScroll = imageHeight - containerHeight;

      // Determine direction based on position
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        if (currentScrollTop > maxScroll * 0.5) {
          setDirection("up"); // Continue up after manual scroll
        } else {
          setDirection("down");
        }
      } else {
        // Scrolling up
        if (currentScrollTop < maxScroll * 0.5) {
          setDirection("down"); // Continue down after manual scroll
        } else {
          setDirection("up");
        }
      }

      lastScrollTop = currentScrollTop;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isManualScrolling, imageHeight]);

  return (
    <div
      ref={containerRef}
      onWheel={handleManualInteraction}
      onTouchStart={handleManualInteraction}
      onMouseDown={handleManualInteraction}
      className="relative w-full h-[600px] overflow-y-scroll scrollbar-hide rounded-2xl shadow-2xl bg-white dark:bg-gray-800"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="w-full">
        <Image
          src={src}
          alt={alt}
          width={1905}
          height={7443}
          className="w-full h-auto"
          priority
          onLoad={handleImageLoad}
          quality={90}
        />
      </div>

      {!isManualScrolling && imageHeight > 0 && (
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
          {direction === "down" ? "↓ Scrolling Down" : "↑ Scrolling Up"}
        </div>
      )}
    </div>
  );
}