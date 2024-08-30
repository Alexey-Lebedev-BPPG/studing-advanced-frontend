import { FC } from 'react';
import './PDFPrintPage.scss';
import { PrintDownloadButtons } from '../PrintDownloadButtons/PrintDownloadButtons';
import { Page } from '@/widgets/Page';

const PDFPrintPage: FC<{ id?: string }> = props => {
  const { id } = props;

  return (
    <Page data-testid='PrintDownloadButtons'>
      <PrintDownloadButtons
        shipment={{
          description: 'description',
          id: 'id',
          location: ['location1', 'location2'],
          numberOfCards: '1',
        }}
      />
    </Page>
  );
};

export default PDFPrintPage;
