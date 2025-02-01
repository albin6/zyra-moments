import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  "Conferences",
  "Weddings",
  "Corporate Events",
  "Music Festivals",
  "Workshops",
  "Charity Galas",
  "Birthday Parties",
  "Trade Shows",
  "Sports Events",
  "Art Exhibitions",
];

export function ClientLandingCategorySection() {
  return (
    <section className="py-16 bg-muted/50 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Explore Event Categories
        </h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="w-[200px] h-[100px] flex-shrink-0 transition-all duration-300 hover:bg-accent cursor-pointer"
              >
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <span className="text-center font-medium">{category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
