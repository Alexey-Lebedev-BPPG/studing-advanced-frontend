// example export to JSON
// import { FC, useEffect } from 'react';
// import { IExportSVGProps } from '../ExportCSV/types';
// import {
//   getRouteAllCardsToJSON,
//   getRouteAllCategoriesToJSON,
// } from '@/shared/const/route';

// const ExportJSON: FC<IExportSVGProps> = ({
//   text = 'Download All NFTs',
//   typeDownload,
// }) => {
//   let timeout: NodeJS.Timeout;
//   const allCards: { allCards: string[]; category: string }[] = [];
//   const categoryCards: { addresses: string[]; category: string }[] = [];

//   const isAll = typeDownload === 'all';
//   const currentData = isAll ? allCards : categoryCards;

//   // const conversionToSingleObject = (data: IDataCSV[]) => {
//   //   let result: {[key: string]: string[]}[] = [];

//   //   data?.forEach((item) => {
//   //     result.push({[item.category]: item.addresses});
//   //   });

//   //   return result;
//   // };

//   const JSon = (
//     objectData: {
//       addresses: string[];
//       category: string;
//     }[],
//     name: string,
//   ) => {
//     const filename = `${name}.json`;
//     const contentType = 'application/json;charset=utf-8;';
//     // const currentObjectData = isAll
//     //   ? objectData[0].addresses
//     //   : conversionToSingleObject(objectData);
//     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//       const blob = new Blob(
//         [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
//         { type: contentType },
//       );
//       window.navigator.msSaveOrOpenBlob(blob, filename);
//     } else {
//       // download file
//       // var a = document.createElement('a');
//       // a.download = filename;
//       // a.href =
//       //   'data:' +
//       //   contentType +
//       //   ',' +
//       //   encodeURIComponent(JSON.stringify(currentObjectData));
//       // a.target = '_blank';
//       // document.body.appendChild(a);
//       // a.click();
//       // document.body.removeChild(a);

//       // open in new tab without url
//       // let page = window.open('test/123');
//       // page?.document.open();
//       // page?.document.write(JSON.stringify(currentObjectData));

//       // open in new tab with url
//       const a = document.createElement('a');
//       a.href = isAll ? getRouteAllCardsToJSON() : getRouteAllCategoriesToJSON();
//       a.target = '_blank';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
//   };

//   const upload = (
//     arr: {
//       addresses: string[];
//       category: string;
//     }[],
//   ) => {
//     timeout = setTimeout(() => {
//       JSon(arr, isAll ? 'allMintList' : 'mintListCategories');
//     }, 200);
//   };

//   useEffect(
//     () => () => {
//       clearTimeout(timeout);
//     },
//     [],
//   );

//   return (
//     <button type='button' onClick={() => upload(currentData as any)}>
//       {text}
//     </button>
//   );
// };

// export default ExportJSON;
