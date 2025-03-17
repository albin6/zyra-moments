import { Card } from "@/components/ui/card";
import { ChatPage } from "../chat/ChatPage";

function VendorChatPage() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>
      <ChatPage userType="Vendor" />
    </Card>
  );
}

export default VendorChatPage;
