/**
 * ImageWithSkeleton.tsx
 * Drop-in image with a subtle skeleton overlay until `onLoad` fires.
 * - Helps perceived performance for photo-heavy grids.
 */

import { useState } from 'react'

/** Props for ImageWithSkeleton (extends native img props). */
export interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Additional container className if needed */
  containerClassName?: string
}

/**
 * ImageWithSkeleton - wraps an <img> and shows a skeleton overlay until loaded.
 */
export default function ImageWithSkeleton({
  className,
  containerClassName,
  onLoad,
  onError,
  ...imgProps
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    setLoaded(true)
    onLoad?.(e)
  }
  function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    // Stop animating in error states too
    setLoaded(true)
    onError?.(e)
  }

  return (
    <div className={`relative ${containerClassName ?? ''}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...imgProps}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
