import { ColumnDef } from '@tanstack/react-table';

import { mockCLO } from '@/components/features/course/outcome/clo';
import { CourseLearningOutcomeDataTable } from '@/components/features/course/outcome/clo-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { CLO } from '@/data/schema';

const columns: ColumnDef<CLO>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">{row.getValue('code')}</span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="description" />
    ),
    cell: ({ row }) => {
      return (
        <span className="truncate font-medium">
          {row.getValue('description')}
        </span>
      );
    },
  },
];

const CourseLearningOutcomeHistory = () => {
  return (
    <div className="space-y-3">
      <div className="text-lg font-bold">Course learning outcome</div>
      <div>
        <CourseLearningOutcomeDataTable
          disablePagination
          disableToolbar
          columns={columns}
          data={mockCLO}
        />
      </div>
    </div>
  );
};

export default CourseLearningOutcomeHistory;
