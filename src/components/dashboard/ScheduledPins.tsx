import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Image, Video, Check, X, Edit2 } from "lucide-react";

interface ScheduledPin {
  id: string;
  title: string;
  type: "image" | "video";
  scheduledTime: string;
  board: string;
  status: "pending" | "approved" | "scheduled";
  thumbnail: string;
}

const scheduledPins: ScheduledPin[] = [
  {
    id: "1",
    title: "Cozy Minimalist Digital Planner",
    type: "image",
    scheduledTime: "Today, 2:00 PM",
    board: "Minimalist Aesthetic",
    status: "pending",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=80&h=80&fit=crop"
  },
  {
    id: "2",
    title: "Crochet Pattern Showcase",
    type: "video",
    scheduledTime: "Today, 4:30 PM",
    board: "DIY Crafts",
    status: "approved",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop"
  },
  {
    id: "3",
    title: "Wall Art Collection Preview",
    type: "image",
    scheduledTime: "Tomorrow, 10:00 AM",
    board: "Home Decor",
    status: "scheduled",
    thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=80&h=80&fit=crop"
  },
  {
    id: "4",
    title: "Recipe Card Digital Download",
    type: "image",
    scheduledTime: "Tomorrow, 2:00 PM",
    board: "Cottagecore",
    status: "pending",
    thumbnail: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=80&h=80&fit=crop"
  },
];

const getStatusBadge = (status: ScheduledPin["status"]) => {
  switch (status) {
    case "pending": return <Badge variant="warning">Pending Review</Badge>;
    case "approved": return <Badge variant="success">Approved</Badge>;
    case "scheduled": return <Badge variant="info">Scheduled</Badge>;
  }
};

export function ScheduledPins() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Scheduled Pins</h3>
          <p className="text-sm text-muted-foreground">Review and manage upcoming pins</p>
        </div>
        <Badge variant="outline">{scheduledPins.length} pending</Badge>
      </div>
      
      <div className="space-y-4">
        {scheduledPins.map((pin, index) => (
          <div 
            key={pin.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-slide-in opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            {/* Thumbnail */}
            <div className="relative">
              <img 
                src={pin.thumbnail} 
                alt={pin.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-card border border-border">
                {pin.type === "image" ? (
                  <Image className="w-3 h-3 text-primary" />
                ) : (
                  <Video className="w-3 h-3 text-accent" />
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{pin.title}</h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {pin.scheduledTime}
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{pin.board}</span>
              </div>
            </div>
            
            {/* Status & Actions */}
            <div className="flex items-center gap-3">
              {getStatusBadge(pin.status)}
              
              {pin.status === "pending" && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-success hover:text-success hover:bg-success/10">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
