import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type BadStudentProps = {
  data: {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    fails: number;
  }[];
};

const BadStudent: React.FC<BadStudentProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {data.map((student, index) => {
        return (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
              <AvatarFallback>{student.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {student.firstName} {student.lastName} {student.studentId}
              </p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            <div className="ml-auto font-medium">
              <Badge variant="destructive">{student.fails} fails</Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BadStudent;
