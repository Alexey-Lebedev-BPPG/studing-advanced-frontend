// example export csv file
// import { FC } from 'react';
// import { CSVLink } from 'react-csv';
// import { IExportSVGProps } from './types';
// import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

// const ExportCSV: FC<IExportSVGProps> = ({
//   text = 'Download All NFTs',
//   typeDownload,
// }) => {
//   const {
//     allCards,
//     categoryCards,
//   }: {
//     allCards: { addresses: string[]; category: string }[];
//     categoryCards: { addresses: string[]; category: string }[];
//   } = useAppSelector(state => state.cards.dataCSV);

//   const currentData = typeDownload === 'all' ? allCards : categoryCards;

//   return (
//     <div className='exportCSV'>
//       {!!currentData?.length && (
//         <CSVLink data={currentData} filename={text} target='_blank'>
//           {text}
//         </CSVLink>
//       )}
//     </div>
//   );
// };

// export default ExportCSV;
