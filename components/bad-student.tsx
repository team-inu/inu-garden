import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge, BadgeProps } from '@/components/ui/badge';

type GradeDistributionProps = {
  data: {
    name: string;
    gradeScore: number;
    frequency: number;
  }[];
};

const GradeDistribution: React.FC<GradeDistributionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-5  ">
      {data.map((grade, index) => {
        let variant: BadgeProps = { variant: 'green' };
        if (grade.gradeScore >= 80) {
          variant.variant = 'green';
        } else if (grade.gradeScore >= 70) {
          variant.variant = 'default';
        } else {
          variant.variant = 'destructive';
        }
        return (
          <div
            key={index}
            className="flex items-center justify-around space-x-2 rounded-lg border p-2"
          >
            <Avatar className="h-9 w-9">
              {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
              <AvatarFallback>{grade.name}</AvatarFallback>
            </Avatar>

            <p className="text-sm text-muted-foreground">
              ( {'≥'}
              {grade.gradeScore} )
            </p>

            <div className="font-medium">
              <Badge variant={variant.variant}>{grade.frequency} </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GradeDistribution;
