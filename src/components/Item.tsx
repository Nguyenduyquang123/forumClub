type ItemProps = {
  imageUrl?: string;
  title?: string;
  description?: string;
  memberCount?: number;
  chatCount?: number;
  viewCount?: number;
  createAt?: string;

  onClubClick?: (id: number) => void;
};

const Item = (props: ItemProps) => {
  const handleClick = () => {
    if (props.onClubClick) {
      props.onClubClick(props.id);
    }
  };

  return (
    <div
      className="flex flex-col gap-3 pb-3 bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={handleClick}
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover"
        data-alt="Abstract image of books on a shelf"
        style={{
          backgroundImage: `url('http://localhost:8000/${props.imageUrl}')`,
        }}
      ></div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {props.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-normal mt-1 flex-grow">
          {props.description}
        </p>
        {props.memberCount && (
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal mt-3">
            {props.memberCount} thành viên
          </p>
        )}
        {props.chatCount && (
          <div className="flex mt-4 text-gray-500 dark:text-gray-400 text-sm font-normal">
            <div className="flex items-center gap-2 mr-4">
              <span className="material-symbols-outlined text-base">forum</span>
              <span>{props.chatCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                visibility
              </span>
              <span>{props.viewCount}</span>
            </div>
            <span className="ml-auto">{props.createAt}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Item;
