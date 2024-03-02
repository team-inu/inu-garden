export type User = {
  id: string;
  email: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  role: Role;
};

export enum Role {
  LECTURER = 'LECTURER',
  MODERATOR = 'MODERATOR',
  TABEE_MANAGER = 'TABEE_MANAGER',
  HEAD_OF_CRRICULUM = 'HEAD_OF_CRRICULUM',
}
