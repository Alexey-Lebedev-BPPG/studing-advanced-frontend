// import { FC, memo } from 'react';
// import './printDownloadButtons.scss';
// import { PrintDownloadButtonsProps } from './types';
// import { downloadPDFInboundShipment } from '../helpers';
// import DownloadSVG from '@/shared/assets/svg/buttons/DownloadSVG';
// import { Button } from '@/shared/ui/Buttons';
// import { QRCode } from '@/shared/ui/QRCode/QRCode';

// export const PrintDownloadButtons: FC<PrintDownloadButtonsProps> = memo(
//   ({ shipment }) => (
//     <div className='print-buttons'>
//       <div className='print-buttons__buttons'>
//         <Button
//           typeButton='ghost'
//           text='Download instructions'
//           img={DownloadSVG}
//           size='small'
//           onClick={() => downloadPDFInboundShipment(shipment)}
//         />
//       </div>
//       <QRCode
//         id='qrcodeship'
//         style={{ display: 'none' }}
//         value={`${shipment.id}` || 'somestringfortest'}
//         backgroundColor='#dfe0e1'
//         dotsColor='#121212'
//         cornersColor='#121212'
//         circleColor='#121212'
//       />
//     </div>
//   ),
// );
