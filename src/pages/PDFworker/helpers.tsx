// import {
//   Point1,
//   Point2,
//   Point3,
//   Point4,
//   Point5,
//   Point6,
//   Point7,
// } from '@/shared/assets/png/PDFDocumentPictures/index';
// import {
//   getRoutePrintingInboundShipment,
//   getRoutePrintingOutboundShipment,
// } from '@/shared/const/router';

// export const getSteps = () => [
//   {
//     img: Point1,
//     text: 'Use mylar sleeves to protect your cards. Insert your cards into thicker CardSavers.',
//   },
//   {
//     img: Point2,
//     text: 'Sandwich your cards between two pieces of cardboard. Use rubber bands to keep them secure, but don’t wrap them too tightly!',
//   },
//   {
//     img: Point3,
//     text: 'Put your cards in bubble wrap and packing peanuts and use a new box to ship your cards to our vault.',
//   },
//   {
//     img: Point4,
//     text: 'Include the QR code attached to these instructions inside your shipment.',
//   },
//   {
//     img: Point5,
//     text: 'Purchase insurance when shipping your cards.',
//   },
//   {
//     img: Point6,
//     text: 'After shipping your cards, MAKE SURE you return to our website to enter your tracking information into your shipment details.',
//   },
//   {
//     img: Point7,
//     text: 'Wait for a notification that your pNFTs are ready to be minted.',
//   },
// ];

// export const downloadPDFInboundShipment = (shipment: IShipmentInbound) => {
//   const qrCodeImage = document.getElementById(
//     'qrcodeship',
//   ) as HTMLCanvasElement;
//   const imageToBase64 = qrCodeImage?.toDataURL('image/png');

//   sessionStorage.setItem('qrCode', imageToBase64);
//   sessionStorage.setItem('inboundShipmentForPDF', JSON.stringify(shipment));

//   window.open(getRoutePrintingInboundShipment());
// };

// export const downloadPDFOutboundShipment = (shipment: IShipmentOutbound) => {
//   sessionStorage.setItem('outboundShipmentForPDF', JSON.stringify(shipment));

//   window.open(getRoutePrintingOutboundShipment());
// };
