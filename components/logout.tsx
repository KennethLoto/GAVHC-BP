import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export function Logout() {
  const handleLogout = useLogout();

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout <LogOut className="size-4" />
    </Button>
  );
}
