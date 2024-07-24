// пример стрима
// import { ReadableStreamDefaultReadDoneResult } from 'stream/web';
// import { GridSortItem } from '@mui/x-data-grid';
// import { Dispatch, SetStateAction } from 'react';
// import { AnyAction } from 'redux';
// import { setArrayToInboundShipmentSlice } from '@/redux/cards/slice';
// import { showSnackbar } from '@/shared/ui/Snackbars/Snackbars';

// export const mintStream = async (
//   selectedIds: string[],
//   shipmentId: string,
//   setIsLoadingStream: Dispatch<SetStateAction<boolean>>,
//   dispatch: Dispatch<AnyAction>,
//   setSortingModel: Dispatch<SetStateAction<GridSortItem[]>>,
// ) => {
//   const baseURL = environment.API_URL;
//   // const requestOptions = (currentSelectedIds: string[]) => ({
//   //   body: JSON.stringify(currentSelectedIds),
//   //   headers: {
//   //     Accept: 'text/event-stream',
//   //     Authorization: `Bearer ${token}`,
//   //     'Cache-Control': 'no-cache',
//   //     Connection: 'keep-alive',
//   //     'Content-Type': 'application/json',
//   //   },
//   //   method: 'POST',
//   // });/shipments/inbound/2023072410S582/mint

//   setIsLoadingStream(true);
//   const stream = await fetch(
//     `${baseURL}admin/shipments/inbound/${shipmentId}/mint`,
//     {
//       body: JSON.stringify(selectedIds),
//       credentials: 'include',
//       headers: {
//         Accept: 'text/event-stream',
//         'Access-Control-Allow-Origin': baseURL || '',
//         Connection: 'keep-alive',
//         'Content-Type': 'application/json',
//         allowHTTP1ForStreamingUpload: 'true',
//         mode: 'cors',
//       },
//       method: 'POST',
//     },
//   );

//   const streamReader = stream?.body
//     ?.pipeThrough(new TextDecoderStream())
//     .getReader();

//   while (stream) {
//     const { value, done } =
//       // eslint-disable-next-line no-await-in-loop
//       (await streamReader?.read()) as ReadableStreamDefaultReadDoneResult;

//     if (done) {
//       setIsLoadingStream(false);
//       break;
//     }

//     const currentValueArray = (value as unknown as string).split('\n');

//     const responseStream: Array<{
//       id: string;
//       error: string | null;
//       card: ICard | null;
//     }> | null =
//       value && value !== ' '
//         ? currentValueArray.map(item => (item ? JSON.parse(item) : item))
//         : null;

//     if (Array.isArray(responseStream))
//       for (let index = 0; index < responseStream.length; index++) {
//         const item = responseStream[index];

//         if (item) {
//           if (item.error) {
//             setSortingModel([{ field: 'status', sort: 'desc' }]);
//             console.log('error', item.error);
//           }
//           if (item.card)
//             dispatch(
//               setArrayToInboundShipmentSlice({
//                 card: item.card,
//                 id: item.id,
//                 status: item.error ? 'error' : 'success',
//               }),
//             );
//         }
//       }
//   }
// };

// export const refreshMetadata = async (
//   shipmentId: { shippingId: string },
//   setIsLoadingStream: Dispatch<SetStateAction<boolean>>,
//   dispatch: Dispatch<AnyAction>,
//   setSortingModel: Dispatch<SetStateAction<GridSortItem[]>>,
// ) => {
//   // const token = localStorage.getItem('accessToken');
//   const baseURL = environment.API_URL;
//   // const requestOptions = (currentShipmentId: { shippingId: string }) => ({
//   //   body: JSON.stringify(currentShipmentId),
//   //   credentials: 'include',
//   //   headers: {
//   //     'Access-Control-Allow-Origin': baseURL || '',
//   //     Connection: 'keep-alive',
//   //     allowHTTP1ForStreamingUpload: 'true',
//   //     mode: 'cors',
//   //   },
//   //   method: 'POST',
//   // });

//   setIsLoadingStream(true);
//   const stream = await fetch(`${baseURL}admin/cards/refresh-transfer`, {
//     body: JSON.stringify(shipmentId),
//     credentials: 'include',
//     headers: {
//       Accept: 'text/event-stream',
//       'Access-Control-Allow-Origin': baseURL || '',
//       Connection: 'keep-alive',
//       'Content-Type': 'application/json',
//       allowHTTP1ForStreamingUpload: 'true',
//       mode: 'cors',
//     },
//     method: 'POST',
//   });

//   const streamReader = stream?.body
//     ?.pipeThrough(new TextDecoderStream())
//     .getReader();

//   while (stream) {
//     const { value, done } =
//       // eslint-disable-next-line no-await-in-loop
//       (await streamReader?.read()) as ReadableStreamDefaultReadDoneResult;

//     if (done) {
//       setIsLoadingStream(false);
//       showSnackbar('Cards refreshed', 'success');
//       break;
//     }

//     const currentValueArray = (value as unknown as string).split('\n');

//     const responseStream: Array<{
//       id: string;
//       error: string | null;
//       card: ICard | null;
//     }> | null =
//       value && value !== ' '
//         ? currentValueArray.map(item => (item ? JSON.parse(item) : item))
//         : null;

//     if (Array.isArray(responseStream))
//       for (let index = 0; index < responseStream.length; index++) {
//         const item = responseStream[index];

//         if (item) {
//           if (item.error) {
//             setSortingModel([{ field: 'status', sort: 'desc' }]);
//             console.log('error', item.error);
//           }
//           if (item.card)
//             dispatch(
//               setArrayToInboundShipmentSlice({
//                 card: item.card,
//                 id: item.id,
//                 status: item.error ? 'error' : 'success',
//               }),
//             );
//         }
//       }
//   }
// };
