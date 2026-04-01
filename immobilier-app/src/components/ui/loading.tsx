import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loadingVariants = cva(
  "flex items-center",
  {
    variants: {
      variant: {
        page: "min-h-screen justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full",
        content: "justify-center py-8 w-full",
        button: "justify-center",
        inline: "inline-flex",
      },
      size: {
        sm: "text-sm",
        md: "text-base", 
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "content",
      size: "md",
    },
  }
)

interface LoadingComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  message?: string
  description?: string
  fullScreen?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingComponentProps>(
  ({ 
    className, 
    variant, 
    size, 
    message = "Chargement...", 
    description,
    fullScreen = false,
    ...props 
  }, ref) => {
    if (fullScreen) {
      return (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          ref={ref}
          {...props}
        >
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
            {message && (
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2 leading-tight">
                {message}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )
    }

    if (variant === "button" || variant === "inline") {
      return (
        <div
          className={cn(loadingVariants({ variant }), className)}
          ref={ref}
          {...props}
        >
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
          {message && (
            <span className="ml-2 text-sm font-medium text-gray-700">
              {message}
            </span>
          )}
        </div>
      )
    }

    // Page variant (large)
    if (variant === "page") {
      return (
        <div
          className={cn(loadingVariants({ variant }), className)}
          ref={ref}
          {...props}
        >
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-6 animate-spin" />
            {message && (
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2 leading-tight">
                {message}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-base leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      )
    }

    // Content variant (smaller)
    return (
      <div
        className={cn(loadingVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <div className="text-center">
          <Loader2 className="w-6 h-6 text-primary mx-auto mb-3 animate-spin" />
          {message && (
            <p className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent leading-tight">
              {message}
            </p>
          )}
          {description && (
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Loading.displayName = "Loading"

const PageLoading: React.FC<{ message?: string; description?: string }> = ({ 
  message = "Chargement...", 
  description 
}) => (
  <Loading variant="page" size="lg" message={message} description={description} />
)

const ContentLoading: React.FC<{ message?: string; description?: string }> = ({ 
  message, 
  description 
}) => (
  <Loading variant="content" size="md" message={message} description={description} />
)

const ButtonLoading: React.FC<{ message?: string; size?: "sm" | "md" }> = ({ 
  message, 
  size = "sm" 
}) => (
  <Loading variant="button" size={size} message={message} />
)

const InlineLoading: React.FC<{ message?: string; size?: "sm" | "md" }> = ({ 
  message, 
  size = "sm" 
}) => (
  <Loading variant="inline" size={size} message={message} />
)

const OverlayLoading: React.FC<{ message?: string; description?: string }> = ({ 
  message = "Traitement en cours...", 
  description 
}) => (
  <Loading variant="page" size="lg" message={message} description={description} fullScreen />
)

export type LoadingProps = LoadingComponentProps
export type LoadingVariant = VariantProps<typeof loadingVariants>

export { 
  Loading,
  PageLoading,
  ContentLoading, 
  ButtonLoading,
  InlineLoading,
  OverlayLoading,
  loadingVariants
}
