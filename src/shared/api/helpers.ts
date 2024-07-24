// хелперы для подстановки квери параметров в урл
// import { ISelectFiltersAction } from '@/entities/AllCards';

// export const getFieldsRequestCards = (
//   payload: ISelectFiltersAction,
//   typePage: TypesPage,
// ) => {
//   const { wallet, filters, search, step, page } = payload;
//   const currentStatus =
//     typePage === 'marketplace'
//       ? `&marketplaceStatus=${filters.status.join()}`
//       : `&collectionStatus=${filters.status.join()}`;

//   const currentStart =
//     typePage === 'marketplace' ? 'marketplace' : `cards/${wallet || ''}`;

//   const currentMinPrice =
//     typePage === 'marketplace' ? 'insuredValueMin' : 'minPrice';
//   const currentMaxPrice =
//     typePage === 'marketplace' ? 'insuredValueMax' : 'maxPrice';

//   return `${currentStart}?page=${page}&step=${step}${
//     filters.autographed ? `&autographed=${filters.autographed}` : ''
//   }${filters.authenticated ? `&authenticated=${filters.authenticated}` : ''}${
//     search
//       ? `&search=${search
//           .replaceAll('+', encodeURIComponent('+'))
//           .replaceAll('&', encodeURIComponent('&'))
//           .replaceAll('#', encodeURIComponent('#'))}`
//       : ''
//   }${filters.status.length > 0 ? currentStatus : ''}${
//     filters.minPrice ? `&${currentMinPrice}=${filters.minPrice}` : ''
//   }${filters.maxPrice ? `&${currentMaxPrice}=${filters.maxPrice}` : ''}${
//     filters.gradingCompany.length > 0
//       ? `&gradingCompany=${filters.gradingCompany.join()}`
//       : ''
//   }${filters.listPriceMin ? `&listPriceMin=${filters.listPriceMin}` : ''}${
//     filters.listPriceMax ? `&listPriceMax=${filters.listPriceMax}` : ''
//   }${
//     filters.gradingCompany.length > 0
//       ? `&gradingCompany=${filters.gradingCompany.join()}`
//       : ''
//   }${
//     filters.genericGradeMin ? `&genericGradeMin=${filters.genericGradeMin}` : ''
//   }${
//     filters.genericGradeMax ? `&genericGradeMax=${filters.genericGradeMax}` : ''
//   }${filters.grade.length > 0 ? `&grade=${filters.grade.join()}` : ''}${
//     filters.yearMin ? `&yearMin=${filters.yearMin}` : ''
//   }${filters.yearMax ? `&yearMax=${filters.yearMax}` : ''}${
//     filters.orderBy ? `&orderBy=${filters.orderBy}` : ''
//   }${filters.hideOwned ? `&hideOwned=${filters.hideOwned}` : ''}${
//     filters.categories.length > 0
//       ? `&categories=${filters.categories
//           .join(',')
//           .replaceAll('+', encodeURIComponent('+'))
//           .replaceAll('&', encodeURIComponent('&'))
//           .replaceAll('#', encodeURIComponent('#'))}`
//       : ''
//   }`;
// };

// export const getFieldsRequestBurnedCards = (payload: ISelectFiltersAction) => {
//   const { filters, page, step, search } = payload;

//   return `users/cards?status=Burned&page=${page}&step=${step}${
//     filters.autographed ? `&autographed=${filters.autographed}` : ''
//   }${filters.authenticated ? `&authenticated=${filters.authenticated}` : ''}${
//     search
//       ? `&search=${search
//           .replaceAll('+', encodeURIComponent('+'))
//           .replaceAll('&', encodeURIComponent('&'))
//           .replaceAll('#', encodeURIComponent('#'))}`
//       : ''
//   }${filters.minPrice ? `&minPrice=${filters.minPrice}` : ''}${
//     filters.maxPrice ? `&maxPrice=${filters.maxPrice}` : ''
//   }${
//     filters.gradingCompany.length > 0
//       ? `&gradingCompany=${filters.gradingCompany.join()}`
//       : ''
//   }${
//     filters.genericGradeMin ? `&genericGradeMin=${filters.genericGradeMin}` : ''
//   }${
//     filters.genericGradeMax ? `&genericGradeMax=${filters.genericGradeMax}` : ''
//   }${filters.grade.length > 0 ? `&grade=${filters.grade.join()}` : ''}${
//     filters.yearMin ? `&yearMin=${filters.yearMin}` : ''
//   }${filters.yearMax ? `&yearMax=${filters.yearMax}` : ''}${
//     filters.orderBy ? `&orderBy=${filters.orderBy}` : ''
//   }`;
// };

// export const getFieldsRequestCardsInbound = (
//   shipmentId: string,
//   fields: IFieldsPaginations,
// ) =>
//   `cards/shipping/${shipmentId}?page=${fields.page}&step=${fields.step}${
//     fields.search ? `&search=${fields.search}` : ''
//   }`;
