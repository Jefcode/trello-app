import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const ListWrapper = ({ children }: PropsWithChildren) => {
  return (
    <motion.li
      className='shrink-0 h-full w-[272px] select-none px-2'
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.li>
  );
};
