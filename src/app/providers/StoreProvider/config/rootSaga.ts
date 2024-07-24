// for saga
// import { all } from 'redux-saga/effects';
// import { watcherAuthSetProfile, watcherCheckAuth } from '@/entities/Profile';
// import {
//   watcherGetAllBoxes,
//   watcherCreateBox,
//   watcherEditBox,
//   watcherDeleteBox,
//   watcherGetBox,
//   watcherMintBoxes,
// } from '@/redux/boxes/saga';
// import {
//   watcherCreateCard,
//   watcherGetShipmentCards,
//   watcherEditCard,
//   watcherUploadCardsInCSV,
//   watcherGetAllCards,
//   watcherDownloadCSVAllCards,
//   watcherDeleteCard,
//   watcherAllVaultsInCard,
// } from '@/redux/cards/saga';
// import {
//   watcherGetAllChunks,
//   watcherAddChunkBox,
//   watcherMintChunkBox,
// } from '@/redux/chunks/saga';
// import {
//   watcherGetAllInboundShipments,
//   watcherGetInboundShipment,
//   watcherUpdateInboundShipment,
// } from '@/redux/shipmentInbound/saga';
// import {
//   watcherGetAllOutboundShipments,
//   watcherGetOutboundShipment,
//   watcherUpdateOutboundShipment,
// } from '@/redux/shipmentOutbound/saga';
// import { watcherGetAllUsers } from '@/redux/users/saga';
// import {
//   watcherCreateVault,
//   watcherDeleteVault,
//   watcherEditVault,
//   watcherGetAllVaults,
// } from '@/redux/vaults/saga';

// export function* saga() {
//   yield all([
//     watcherCheckAuth(),
//     watcherGetAllInboundShipments(),
//     watcherGetInboundShipment(),
//     watcherUpdateInboundShipment(),
//     watcherGetAllOutboundShipments(),
//     watcherGetOutboundShipment(),
//     watcherUpdateOutboundShipment(),
//     watcherGetAllCards(),
//     watcherDownloadCSVAllCards(),
//     watcherCreateCard(),
//     watcherGetShipmentCards(),
//     watcherEditCard(),
//     watcherUploadCardsInCSV(),
//     watcherDeleteCard(),
//     watcherGetAllUsers(),
//     watcherAuthSetProfile(),
//     watcherGetAllBoxes(),
//     watcherCreateBox(),
//     watcherMintBoxes(),
//     watcherGetBox(),
//     watcherEditBox(),
//     watcherDeleteBox(),
//     watcherGetAllChunks(),
//     watcherAddChunkBox(),
//     watcherMintChunkBox(),
//     watcherGetAllVaults(),
//     watcherCreateVault(),
//     watcherEditVault(),
//     watcherDeleteVault(),
//     watcherAllVaultsInCard(),
//   ]);
// }
