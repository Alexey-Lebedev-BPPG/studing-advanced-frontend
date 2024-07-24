// пример саги для ентити
// import { PayloadAction } from '@reduxjs/toolkit';
// import { put, takeEvery } from 'redux-saga/effects';
// import {
//   getActivityAction,
//   clearActivityAction,
//   getNFTCardActivitiesAction,
// } from '../actions/activityActions';
// import {
//   setLoadingActivitySlice,
//   setActivitySlice,
//   setClearActivitySlice,
//   setNFTCardSliceActivities,
// } from '../slice/activity';
// import {
//   IActivity,
//   INFtCardActivitiesPayload,
//   StatusActivities,
// } from '../types/activity';
// import {
//   getNFTCardActivitiesRequest,
//   getUserActivities,
// } from '@/shared/api/services/activity';
// import { errorHandlerForSaga } from '@/shared/lib/ErrorHandlerForSaga/ErrorHandlerForSaga';

// function* workerGetActivity({
//   payload,
// }: PayloadAction<{
//   wallet: string;
//   day: string;
//   status?: StatusActivities[];
// }>) {
//   try {
//     yield put(setLoadingActivitySlice(true));
//     const response: IResponse<IActivity[]> = yield getUserActivities(payload);
//     yield put(setActivitySlice(response.data));
//     yield put(setLoadingActivitySlice(false));
//   } catch (error) {
//     errorHandlerForSaga(error);
//     yield put(setLoadingActivitySlice(false));
//   }
// }

// export function* watcherGetActivity() {
//   yield takeEvery(getActivityAction.toString(), workerGetActivity);
// }

// function* workerClearActivity() {
//   try {
//     yield put(setClearActivitySlice());
//   } catch (error) {
//     errorHandlerForSaga(error);
//   }
// }

// export function* watcherClearActivity() {
//   yield takeEvery(clearActivityAction.toString(), workerClearActivity);
// }

// function* workerGetNFTCardActivities({
//   payload,
// }: PayloadAction<INFtCardActivitiesPayload>) {
//   try {
//     yield put(setLoadingActivitySlice(true));
//     const response: IResponse<IActivity[]> = yield getNFTCardActivitiesRequest(
//       payload,
//     );
//     yield put(setNFTCardSliceActivities(response.data));
//     yield put(setLoadingActivitySlice(false));
//   } catch (error) {
//     errorHandlerForSaga(error);
//   }
// }

// export function* watcherGetNFTCardActivities() {
//   yield takeEvery(
//     getNFTCardActivitiesAction.toString(),
//     workerGetNFTCardActivities,
//   );
// }
