import { Vendor } from "@/components/layouts/VendorLayout";
import { Spinner } from "@/components/ui/spinner";
import { WorkSampleList } from "@/components/vendor/WorkSampleList";
import { useOutletContext } from "react-router-dom";

const items = [
  {
    id: "1",
    title: "Professional DSLR Camera",
    description:
      "High-end digital camera with 24.2MP full-frame sensor, 4K video capabilities, and advanced autofocus system. Perfect for professional photography and videography.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones featuring active noise cancellation, 30-hour battery life, and crystal-clear sound quality for an immersive audio experience.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and waterproof design. Connects seamlessly with your smartphone for notifications.",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Portable Power Bank",
    description:
      "20,000mAh capacity power bank with fast charging capability, dual USB ports, and LED display. Compact design perfect for travel and emergency backup power.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Wireless Gaming Mouse",
    description:
      "High-performance gaming mouse with RGB lighting, programmable buttons, and ultra-precise optical sensor. Features low-latency wireless connection and ergonomic design.",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1000&auto=format&fit=crop",
  },
];

interface VendorContextType {
  vendorData: Vendor | null;
}

export default function VendorWorkSamples() {
  const { vendorData } = useOutletContext<VendorContextType>();

  if (!vendorData) {
    return <Spinner />;
  }

  return (
    <WorkSampleList items={items} onView={(id: any) => {}} isLoading={false} />
  );
}
