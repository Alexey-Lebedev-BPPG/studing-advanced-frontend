// здесь воспользуемся реселектом (через createSelector). Это позволит объединить несколько селекторов и получить готовый результат из них все. Данные подход мемоизирует значения и изменятся селекторы только в том случае, если изменятся значения
// Пример:
// const selectShopItems = (state) => state.shop.items;
// const selectTaxPercent = (state) => state.shop.taxPercent;

// const selectSubtotal = createSelector(selectShopItems, items =>
//   items.reduce((subtotal, item) => subtotal + item.value, 0)
// )

// const selectTax = createSelector(
//   selectSubtotal,
//   selectTaxPercent,
//   (subtotal, taxPercent) => subtotal * (taxPercent / 100)
// );
// комбинировать селекторы можно в любом количестве

import { createSelector } from "@reduxjs/toolkit";
import { getCounter } from "../getCounter/getCounter";

export const getCounterValue = createSelector(
  // указываем селектор, который хотим переиспользовать
  getCounter,
  // вызываем колбэк, которая параметром принмает результат выполнения вышеуказанных селекторов
  (counter) => counter.value
);
