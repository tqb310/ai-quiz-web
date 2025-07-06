import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const SimpleCard = ({
  title,
  description,
  icon,
  content,
  onClick,
  className,
}: Props) => {
  return (
    <Card
      className={cn(
        'hover:cursor-pointer hover:opacity-75 transition-all duration-300 gap-4',
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
        {icon && <CardAction>{icon}</CardAction>}
      </CardHeader>
      {content && (
        <CardContent>
          {typeof content === 'string' ? (
            <p className="text-sm text-muted-foreground">
              {content}
            </p>
          ) : (
            content
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default SimpleCard;
