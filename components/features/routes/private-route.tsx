import { useAuth } from "@/hooks/auth-hook";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type WithAuthProps = {
  children?: ReactNode;
};

export function withAuth<T extends WithAuthProps = WithAuthProps>(
  WrappedComponent: ComponentType<T>,
  herf: string = "/login"
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user.isError) {
        toast.warning("Authentication is required", {
          description: "Please sign in to continue",
        });
      }
    }, [user.isError]);

    if (user.isLoading) {
      return (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex text-muted-foreground">
            <Loader2Icon className="mr-2 animate-spin" /> Loading...
          </div>
        </div>
      );
    }

    return user.isError ? (
      router.replace(herf)
    ) : (
      <WrappedComponent {...(props as T)} />
    );
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}
