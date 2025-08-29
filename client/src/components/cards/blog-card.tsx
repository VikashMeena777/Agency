import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  onReadMore?: (postId: string) => void;
}

const BlogCard = ({ post, onReadMore }: BlogCardProps) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <Card 
      className="glass-card rounded-xl hover-glow hover:scale-105 transition-all duration-300 overflow-hidden group"
      data-testid={`blog-card-${post.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          data-testid={`blog-image-${post.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span data-testid={`blog-date-${post.id}`}>
              {formatDate(post.createdAt)}
            </span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span data-testid={`blog-author-${post.id}`}>
              {post.author}
            </span>
          </div>
        </div>
        
        <h3 
          className="text-xl font-playfair font-semibold mb-3 line-clamp-2"
          data-testid={`blog-title-${post.id}`}
        >
          {post.title}
        </h3>
        <p 
          className="text-muted-foreground mb-4 line-clamp-3"
          data-testid={`blog-excerpt-${post.id}`}
        >
          {post.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button
          variant="ghost"
          onClick={() => onReadMore?.(post.id)}
          className="text-primary hover:text-accent transition-colors duration-300 p-0"
          data-testid={`blog-read-more-${post.id}`}
        >
          Read More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
