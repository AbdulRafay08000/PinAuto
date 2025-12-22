import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink } from "lucide-react";

interface PinterestAccount {
  id: string;
  name: string;
  username: string;
  status: "active" | "rate_limited" | "error";
  pinsToday: number;
  dailyLimit: number;
  avatar: string;
}

const accounts: PinterestAccount[] = [
  { id: "1", name: "Main Account", username: "@shopminimalist", status: "active", pinsToday: 18, dailyLimit: 30, avatar: "SM" },
  { id: "2", name: "Business Account", username: "@cozycrafts", status: "rate_limited", pinsToday: 30, dailyLimit: 30, avatar: "CC" },
  { id: "3", name: "Secondary", username: "@etsyseller", status: "active", pinsToday: 12, dailyLimit: 30, avatar: "ES" },
];
const connectPinterest = () => {
  const clientId = "1540355";
  const redirectUri = "http://localhost:5000/api/pinterest/callback";

  const scope = "pins:read user_accounts:read"; // keep minimal first
  const state = crypto.randomUUID();

  localStorage.setItem("pinterest_oauth_state", state);

  const authUrl =
    `https://www.pinterest.com/oauth/?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `state=${state}`;

  window.location.href = authUrl;
};

const getStatusBadge = (status: PinterestAccount["status"]) => {
  switch (status) {
    case "active": return <Badge variant="success">Active</Badge>;
    case "rate_limited": return <Badge variant="warning">Rate Limited</Badge>;
    case "error": return <Badge variant="destructive">Error</Badge>;
  }
};

export function PinterestAccounts() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Pinterest Accounts</h3>
        <Button variant="outline" size="sm" onClick={connectPinterest}>
          <ExternalLink className="w-4 h-4 mr-2"  />
          Add Account it
        </Button>
      </div>
      
      <div className="space-y-4">
        {accounts.map((account) => (
          <div 
            key={account.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                {account.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{account.name}</p>
                <p className="text-sm text-muted-foreground">{account.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {account.pinsToday} / {account.dailyLimit}
                </p>
                <p className="text-xs text-muted-foreground">pins today</p>
              </div>
              
              <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400 transition-all duration-500"
                  style={{ width: `${(account.pinsToday / account.dailyLimit) * 100}%` }}
                />
              </div>
              
              {getStatusBadge(account.status)}
              
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}