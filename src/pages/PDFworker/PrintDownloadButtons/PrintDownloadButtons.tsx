import { FC, memo } from 'react';
import './printDownloadButtons.scss';
import { PrintDownloadButtonsProps } from './types';
import { downloadPDFInboundShipment } from '../helpers';
import { Button } from '@/shared/ui/redesigned/Button';
import { QRCode } from '@/shared/ui/redesigned/QRCode/QRCode';

export const PrintDownloadButtons: FC<PrintDownloadButtonsProps> = memo(
  ({ shipment }) => (
    <div className='print-buttons'>
      <Button
        title='Download instructions'
        onClick={() => downloadPDFInboundShipment(shipment)}
      />
      <QRCode
        id='qrcodeship'
        style={{ display: 'none' }}
        value={`${shipment.id}` || 'somestringfortest'}
        backgroundColor='#dfe0e1'
        dotsColor='#121212'
        cornersColor='#121212'
        circleColor='#121212'
      />
    </div>
  ),
);
