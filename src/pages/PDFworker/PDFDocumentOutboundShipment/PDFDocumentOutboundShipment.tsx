// import { FC, useEffect } from 'react';
// import './PDFDocumentOutboundShipment.scss';
// import { getMyProfile } from '@/entities/MyProfile';
// import { CardRow } from '@/pages/BurnCart';
// import { Summary } from '@/pages/Checkout';
// import { LocationSVG } from '@/shared/assets/svg/ShipmentDetails';
// import PrintLogo from '@/shared/assets/svg/ShipmentDetails/PrintLogo.svg';
// import { useAppSelector } from '@/shared/lib/hooks/redux';
// import { VStack } from '@/shared/ui/Stack';

// const PDFDocumentOutboundShipment: FC = () => {
//   const outboundShipment: IShipmentOutbound = JSON.parse(
//     sessionStorage.getItem('outboundShipmentForPDF') as string,
//   );
//   const {
//     address: { fullName, streetAddress, apartment, city, state, zip, country },
//     user: { wallet },
//     cards,
//     shippingCost,
//     insuranceCost,
//     feesCost,
//     typeCurrency,
//     customId,
//   } = outboundShipment;
//   const { wallet: currentOwnerWallet } = useAppSelector(getMyProfile);

//   useEffect(() => {
//     if (outboundShipment) window.print();
//   }, [outboundShipment]);
//   return (
//     <VStack max align='center' justify='center' className='pdf-wrapper'>
//       <div className='pdf-container-outbound'>
//         <div className='pdf-container-outbound__header'>
//           <div>
//             <PrintLogo className='pdf-container__logo' />
//             <h1>{`INVOICE #${customId}`}</h1>
//           </div>
//           <div className='pdf-container-outbound__header__address'>
//             <div>
//               <LocationSVG width='1rem' height='1rem' />
//               <p>Ship to address</p>
//             </div>
//             <div>
//               <span>{fullName}</span>
//               <span>{`${streetAddress} ${apartment}`}</span>
//               <span>{`${city}, ${state}, ${zip}`}</span>
//               <span>{country}</span>
//             </div>
//           </div>
//         </div>
//         <div className='pdf-container-outbound__content'>
//           <div className='pdf-container-outbound__content__cards'>
//             {!!cards &&
//               cards?.cards.length > 0 &&
//               cards?.cards.map(
//                 ({
//                   itemName,
//                   insuredValue,
//                   id,
//                   images,
//                   nftAddress,
//                   ownerId,
//                   orientation,
//                   listing,
//                   status,
//                   frontImage,
//                 }: ICard) => (
//                   <CardRow
//                     key={`cart-card-${id}`}
//                     isPDF
//                     tokenIdClass='tokenIdClass'
//                     insuredClass='insuredClass'
//                     itemName={itemName}
//                     id={id}
//                     insuredValue={insuredValue}
//                     tokenId={nftAddress}
//                     frontImage={images ? images.frontS : frontImage}
//                     ownerId={ownerId || ''}
//                     currentOwnerWallet={currentOwnerWallet}
//                     owner={wallet}
//                     theme='light'
//                     orientation={orientation}
//                     listing={listing}
//                     status={status}
//                   />
//                 ),
//               )}
//           </div>
//           <div className='pdf-container-outbound__content__summary'>
//             <Summary
//               isPDF
//               shippingCost={+shippingCost}
//               insurance={+insuranceCost}
//               fees={+feesCost}
//               currency={typeCurrency as ICurrency}
//               theme='light'
//               typeOfSummary='checkout'
//             />
//           </div>
//         </div>
//         <div className='pdf-container-outbound__footer'>
//           <h3>Thank you for using Collector!</h3>
//           <p>
//             If you have questions about your order, you can email us
//             <br /> at
//             <span> postman@collectorcrypt.com</span>
//           </p>
//         </div>
//       </div>
//     </VStack>
//   );
// };

// export default PDFDocumentOutboundShipment;
