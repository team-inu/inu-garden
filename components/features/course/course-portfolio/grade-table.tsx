import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GradeDistribution } from '@/types/schema/course-portfolio-schema';

type GradeTableProps = {
  gradeDistribution: GradeDistribution;
};

const GradeTable: React.FC<GradeTableProps> = ({ gradeDistribution }) => {
  return (
    <Table>
      <TableCaption>Grade of students</TableCaption>
      <TableHeader className="font-bold text-primary">
        <TableRow>
          <TableHead colSpan={3}>Number of student</TableHead>
          <TableHead colSpan={3}> {gradeDistribution.studentAmount}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead colSpan={3}>Average GPA</TableHead>
          <TableHead colSpan={3}>{gradeDistribution.GPA.toFixed(2)}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead colSpan={2}>Grade</TableHead>
          <TableHead colSpan={2}>Grade score</TableHead>
          <TableHead colSpan={2}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gradeDistribution.gradeFrequencies.map((gradeFrequency) => (
          <TableRow key={gradeFrequency.name}>
            <TableCell colSpan={2} className="font-medium">
              {gradeFrequency.name}
            </TableCell>
            <TableCell colSpan={2}>
              {`>`}
              {gradeFrequency.gradeScore}
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {gradeFrequency.frequency}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GradeTable;
