import { FC, useEffect } from 'react';
import './PDFDocumentOutboundShipment.scss';
import { IShipmentOutbound } from '../PrintDownloadButtons/types';
import { VStack } from '@/shared/ui/redesigned/Stack';

const PDFDocumentOutboundShipment: FC = () => {
  const outboundShipment: IShipmentOutbound = JSON.parse(
    sessionStorage.getItem('outboundShipmentForPDF') as string,
  );
  const {
    address: { apartment, city, country, fullName, state, streetAddress, zip },
    cards,
    customId,
  } = outboundShipment;

  useEffect(() => {
    if (outboundShipment) window.print();
  }, [outboundShipment]);

  return (
    <VStack max align='center' justify='center' className='pdf-wrapper'>
      <div className='pdf-container-outbound'>
        <div className='pdf-container-outbound__header'>
          <div>
            <h1>{`INVOICE #${customId}`}</h1>
          </div>
          <div className='pdf-container-outbound__header__address'>
            <div>
              <p>{'Ship to address'}</p>
            </div>
            <div>
              <span>{fullName}</span>
              <span>{`${streetAddress} ${apartment}`}</span>
              <span>{`${city}, ${state}, ${zip}`}</span>
              <span>{country}</span>
            </div>
          </div>
        </div>
        <div className='pdf-container-outbound__content'>
          <div className='pdf-container-outbound__content__cards'>
            {!!cards &&
              cards.length > 0 &&
              cards.map(item => <div>{`${item}`}</div>)}
          </div>
        </div>
        <div className='pdf-container-outbound__footer'>
          <h3>{'Thank you for using Collector!'}</h3>
          <p>
            {'If you have questions about your order, you can email us'}
            <br /> {'at'}
            <span> {'postman@collectorcrypt.com'}</span>
          </p>
        </div>
      </div>
    </VStack>
  );
};

export default PDFDocumentOutboundShipment;
