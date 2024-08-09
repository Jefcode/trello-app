import { List } from "@prisma/client";

interface ListHeaderProps {
  data: List
}

export const ListHeader = ({data}: ListHeaderProps) => {
  return (
    <div className='p-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      <div className='w-full text-sm px-2 5 py-1 h-7 font-medium border-transparent'>
        {data.title}
      </div>
    </div>
  );
};
