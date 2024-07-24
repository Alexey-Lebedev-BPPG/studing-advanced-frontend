// import { FC, useEffect } from 'react';
// import './PDFDocumentInboundShipment.scss';
// import { getSteps } from '../helpers';
// import {
//   LogoWhite,
//   SmallBox,
//   Location,
// } from '@/shared/assets/png/PDFDocumentPictures/index';
// import { VStack } from '@/shared/ui/Stack';

// const PDFDocumentInboundShipment: FC = () => {
//   const steps = getSteps();
//   const qrCode = sessionStorage.getItem('qrCode');
//   const inboundShipment: IShipmentInbound = JSON.parse(
//     sessionStorage.getItem('inboundShipmentForPDF') as string,
//   );
//   const { numberOfCards, description, location } = inboundShipment;

//   useEffect(() => {
//     if (qrCode && inboundShipment) window.print();
//   }, [inboundShipment, qrCode]);
//   return (
//     <VStack max align='center' justify='center' className='pdf-wrapper'>
//       <div className='pdf-container' id='rest'>
//         <img
//           src={LogoWhite}
//           alt='logo'
//           className='pdf-container__logo'
//           loading='lazy'
//         />
//         <div className='pdf-container__title'>
//           <div className='pdf-container__title__left'>
//             <h1>shipping instructions</h1>
//             <div>
//               Protecting your cards is our highest priority. Make sure your
//               cards get to <strong>us safety and ready for processing</strong>
//               by following these steps
//             </div>
//           </div>
//           <img src={qrCode as string} alt='' loading='lazy' />
//         </div>
//         <div className='pdf-container__identifier'>
//           <h3>QR Shipping Identifier</h3>
//         </div>
//         <div className='pdf-container__stepper'>
//           <div className='pdf-container__stepper__steps'>
//             {steps.map(({ img, text }, index) => (
//               <div key={text} className='pdf-container__stepper__steps__step'>
//                 <div>{index + 1}</div>
//                 <img src={img} alt='Tracking' loading='lazy' />
//                 <p>{text}</p>
//               </div>
//             ))}
//           </div>
//           <div className='pdf-container__stepper__shipment-details'>
//             <div className='pdf-container__stepper__shipment-details__title'>
//               <img src={SmallBox} alt='smallbox' loading='lazy' />
//               <div className='pdf-container__stepper__shipment-details__title__text'>
//                 Shipment summary
//               </div>
//             </div>
//             <div className='pdf-container__stepper__shipment-details__total'>
//               {`Total cards in a box : ${numberOfCards}`}
//             </div>
//             <div className='pdf-container__stepper__shipment-details__secondary-text'>
//               {description}
//             </div>
//             <div className='pdf-container__stepper__shipment-details__border' />
//             <div className='pdf-container__stepper__shipment-details__title'>
//               <img src={Location} alt='Location' loading='lazy' />
//               <div className='pdf-container__stepper__shipment-details__title__text'>
//                 Ship to address
//               </div>
//             </div>
//             <div className='pdf-container__stepper__shipment-details__address'>
//               {location.map(i => (
//                 <p key={i}>{i}</p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </VStack>
//   );
// };

// export default PDFDocumentInboundShipment;
