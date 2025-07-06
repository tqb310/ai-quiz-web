import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick?: () => void;
};

const SimpleCard = ({
  title,
  icon,
  description,
  onClick,
}: Props) => {
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75 transition-all duration-300 gap-4"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-xl font-bold">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
