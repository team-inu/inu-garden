const CommentCard = () => {
  return (
    <div className="rounded-md border-2 border-primary-foreground bg-secondary p-3">
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-primary"></div>
        <div className="flex w-full  justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">CPEXXX</div>
            <div className="text-md text-secondary-foreground">
              Lecturer: John Doe
            </div>
          </div>
          <div className="text-sm text-secondary-foreground">12 Nov 2021</div>
        </div>
      </div>
      <div className="mt-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
