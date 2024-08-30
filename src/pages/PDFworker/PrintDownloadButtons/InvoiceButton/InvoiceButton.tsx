import { FC, memo } from 'react';
import { downloadPDFOutboundShipment } from '../../helpers';
import { IInvoiceButtonProps } from '../types';
import { Button } from '@/shared/ui/redesigned/Button';

export const InvoiceButton: FC<IInvoiceButtonProps> = memo(({ shipment }) => (
  <div className='invoice-button'>
    <Button
      title='Invoice'
      onClick={() => downloadPDFOutboundShipment(shipment)}
    />
  </div>
));
