import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Five-star row with fractional fill for ratings like 4.7. */
export function Stars({
  rating,
  className,
  starClass,
}: {
  rating: number;
  className?: string;
  starClass?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star
              className={cn("h-4 w-4 text-gold", starClass)}
              strokeWidth={1.5}
            />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
                aria-hidden="true"
              >
                <Star
                  className={cn("h-4 w-4 text-gold", starClass)}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
