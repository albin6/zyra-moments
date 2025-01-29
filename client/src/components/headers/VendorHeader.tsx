import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme/ModeToggle";

export function VendorHeader() {
  return (
    <header className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">
              Products
            </a>
            <a href="#" className="hover:underline">
              Orders
            </a>
            <a href="#" className="hover:underline">
              Analytics
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Button variant="secondary" size="sm">
            Add Product
          </Button>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>
      <nav className="md:hidden container mx-auto px-4 py-2 flex justify-center space-x-4">
        <a href="#" className="hover:underline">
          Products
        </a>
        <a href="#" className="hover:underline">
          Orders
        </a>
        <a href="#" className="hover:underline">
          Analytics
        </a>
      </nav>
    </header>
  );
}
