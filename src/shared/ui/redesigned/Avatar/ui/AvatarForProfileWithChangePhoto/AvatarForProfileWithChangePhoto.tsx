// import {
//   ChangeEvent,
//   FC,
//   MouseEvent,
//   memo,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import './avatarForProfileWithChangePhoto.scss';
// import { Skeleton } from '../../../../Skeleton/Skeleton';
// import { setMyProfileAction } from '@/entities/MyProfile';
// import { AddPhotoSVG, AvatarSVG, BasketSVG } from '@/shared/assets/svg';
// import { useAppDispatch } from '@/shared/lib/hooks/redux';

// interface IAvatarForProfileWithChangePhotoProps {
//   isChanges?: boolean;
//   isLoading: boolean;
//   profile: any;
// }

// export const AvatarForProfileWithChangePhoto: FC<IAvatarForProfileWithChangePhotoProps> =
//   memo(({ isChanges = false, isLoading, profile }) => {
//     const dispatch = useAppDispatch();
//     const inputRef = useRef<HTMLInputElement | null>(null);
//     const objectUrlRef = useRef<string>('');
//     const { photo } = profile;

//     const [isUploadPhotoHovered, setIsUploadPhotoHovered] = useState(false);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [photoLocal, setPhotoLocal] = useState(photo);

//     const handlePhotoChange = useCallback(
//       (event: ChangeEvent<HTMLInputElement>) => {
//         const fileObj = event.target.files && event.target.files[0];
//         const formData = new FormData();
//         if (!fileObj || fileObj.size > 8000000) return;
//         setSelectedFile(fileObj);
//         formData.append('file', fileObj);
//         dispatch(setMyProfileAction(formData));
//       },
//       [dispatch],
//     );

//     const handlePhotoClick = useCallback(
//       (event: MouseEvent<HTMLElement>, state: 'update' | 'remove' | 'set') => {
//         event.stopPropagation();
//         if (state === 'remove') {
//           setPhotoLocal(undefined);
//           setSelectedFile(null);
//           URL.revokeObjectURL(objectUrlRef.current);
//           const formData = new FormData();
//           formData.append('photo', '');
//           dispatch(setMyProfileAction(formData));
//         } else if (
//           inputRef.current !== null &&
//           (!selectedFile || state === 'update')
//         )
//           inputRef.current.click();
//       },
//       [dispatch, selectedFile],
//     );

//     useEffect(() => {
//       if (selectedFile) {
//         objectUrlRef.current = URL.createObjectURL(selectedFile);
//         setPhotoLocal(photo);
//       }

//       return () => URL.revokeObjectURL(objectUrlRef.current);
//     }, [selectedFile, photo]);

//     const selectAvatar = useMemo(() => {
//       if (selectedFile || (photoLocal && !photoLocal.includes('undefined')))
//         return (
//           <div className='public-page-details-header__avatar__container'>
//             {!!isUploadPhotoHovered && (
//               <div className='public-page-details-header__avatar__container__hover'>
//                 <div onClick={e => handlePhotoClick(e, 'update')}>
//                   <AddPhotoSVG width='24' height='24' />
//                 </div>
//                 <div
//                   style={{ borderLeft: '2px solid #dfe0e1', height: '24px' }}
//                 />
//                 <div onClick={e => handlePhotoClick(e, 'remove')}>
//                   <BasketSVG />
//                 </div>
//               </div>
//             )}
//             <img alt='photo1' src={`${photoLocal}`} loading='lazy' />
//           </div>
//         );

//       return isUploadPhotoHovered ? (
//         <AddPhotoSVG
//           style={{
//             left: 'calc(50% - 26px)',
//             position: 'absolute',
//             top: 'calc(50% - 26px)',
//           }}
//         />
//       ) : (
//         <AvatarSVG />
//       );
//     }, [handlePhotoClick, isUploadPhotoHovered, photoLocal, selectedFile]);

//     if (isLoading)
//       return (
//         <div className='public-page-details-header'>
//           <div className='public-page-details-header__left'>
//             <Skeleton border='50%' width={172} height={172} />
//             <div className='public-page-details-header__left__description'>
//               <Skeleton width={181} height={40} />
//               <Skeleton width={287} height={20} />
//               <Skeleton width={485} height={24} />
//             </div>
//           </div>
//           <div className='public-page-details-header__right'>
//             <Skeleton border='50%' width={24} height={24} />
//           </div>
//         </div>
//       );

//     return (
//       <div className='public-page-details-header'>
//         <div className='public-page-details-header__left'>
//           {isChanges ? (
//             <>
//               <input
//                 ref={inputRef}
//                 accept='.jpeg,.png,.jpg,.gif,.tiff,.bmp'
//                 style={{ display: 'none' }}
//                 type='file'
//                 onChange={handlePhotoChange}
//               />
//               <div
//                 className='public-page-details-header__left__avatar'
//                 onClick={e => handlePhotoClick(e, 'set')}
//                 onMouseEnter={() => setIsUploadPhotoHovered(true)}
//                 onMouseLeave={() => setIsUploadPhotoHovered(false)}
//               >
//                 {selectAvatar}
//               </div>
//             </>
//           ) : (
//             <div className='public-page-details-header__left__avatar'>
//               {photo && !photo.includes('undefined') ? (
//                 <img alt='photo2' src={`${photo}`} loading='lazy' />
//               ) : (
//                 <div
//                   style={{
//                     background: 'black',
//                     borderRadius: '50%',
//                     height: '172px',
//                     position: 'initial',
//                     width: '172px',
//                   }}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   });
