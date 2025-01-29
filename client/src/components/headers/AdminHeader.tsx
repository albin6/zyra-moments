import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme/ModeToggle";

export function AdminHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">
              Users
            </a>
            <a href="#" className="hover:underline">
              Reports
            </a>
            <a href="#" className="hover:underline">
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="secondary" size="sm">
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
      <nav className="md:hidden container mx-auto px-4 py-2 flex justify-center space-x-4">
        <a href="#" className="hover:underline">
          Users
        </a>
        <a href="#" className="hover:underline">
          Reports
        </a>
        <a href="#" className="hover:underline">
          Settings
        </a>
      </nav>
    </header>
  );
}
