import { CourseSettingForm } from '@/components/features/course/settings/course-setting-form';

const SettingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Course Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your course information and settings.
        </p>
      </div>
      <CourseSettingForm />
      {/* <Separator /> */}
      {/* <AccountForm /> */}
    </div>
  );
};

export default SettingPage;
