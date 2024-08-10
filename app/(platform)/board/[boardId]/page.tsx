import { db } from '@/lib/db';
import { ListContainer } from './_components/list-container';

const BoardDetailsPage = async ({
  params,
}: {
  params: { boardId: string };
}) => {
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  return (
    <div className='p-4 h-full overflow-x-auto'>
      <ListContainer data={lists} boardId={params.boardId} />
    </div>
  );
};

export default BoardDetailsPage;
