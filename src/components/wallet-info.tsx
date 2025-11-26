"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlockchainStore } from "@/store/blockchain";

export function WalletInfo() {
  const { getCurrentUser, getRandomUser } = useBlockchainStore();
  
  const currentUser = getCurrentUser();
  const randomUser = getRandomUser();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`${label} copied to clipboard`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return address.length > 40 ? `${address.slice(0, 40)}...` : address;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentUser && (
            <div className="space-y-3">
               <div>
                 <h3 className="font-bold text-sm text-muted-foreground mb-2">
                   Your Wallet (User A)
                 </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">Public Key:</span>
                    <div className="flex items-center gap-2">
                       <code className="text-xs bg-background px-2 py-1 rounded max-w-xs break-all">
                         {formatAddress(currentUser.getFullAddress())}
                       </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(currentUser.getFullAddress(), "Public key")}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">Private Key:</span>
                    <div className="flex items-center gap-2">
                       <code className="text-xs bg-background px-2 py-1 rounded max-w-xs break-all">
                         {formatAddress(currentUser.getPrivateKey())}
                       </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(currentUser.getPrivateKey(), "Private key")}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">Balance:</span>
                    <span className="font-bold text-foreground">
                      {currentUser.getBalance()} SOC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {randomUser && (
            <div>
               <h3 className="font-bold text-sm text-muted-foreground mb-2">
                 Random User (User B)
               </h3>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-medium">Public Key:</span>
                <div className="flex items-center gap-2">
                   <code className="text-xs bg-background px-2 py-1 rounded max-w-xs break-all">
                     {formatAddress(randomUser)}
                   </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(randomUser, "Random user address")}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          )}

           {!currentUser && (
             <p className="text-foreground text-center py-4 font-medium">
               No wallet initialized
             </p>
           )}
        </div>
      </CardContent>
    </Card>
  );
}