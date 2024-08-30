// example export csv file
import { FC } from 'react';
import { CSVLink } from 'react-csv';
import { IExportSVGProps } from './types';

export const ExportCSV: FC<IExportSVGProps> = ({
  text = 'ExportCSV',
  typeDownload = 'all',
}) => {
  const allCards = [
    {
      addresses: ['address1', 'address2', 'address3', 'address4'],
      category: 'all',
    },
  ];
  const categoryCards = [
    {
      addresses: ['address5', 'address6', 'address7', 'address8'],
      category: '',
    },
  ];

  const currentData = typeDownload === 'all' ? allCards : categoryCards;

  return (
    <div className='exportCSV'>
      {!!currentData?.length && (
        <CSVLink data={currentData} filename={text} target='_blank'>
          {text}
        </CSVLink>
      )}
    </div>
  );
};
