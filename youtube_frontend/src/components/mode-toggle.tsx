import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return theme === "dark" ? (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => {
        setTheme("light");
      }}
    >
      <Sun />
    </Button>
  ) : (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="text-white !focus:text-white"
      onClick={() => {
        setTheme("dark");
      }}
    >
      <Moon />
    </Button>
  );
}
