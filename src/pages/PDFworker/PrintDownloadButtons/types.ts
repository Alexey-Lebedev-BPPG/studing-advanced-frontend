export interface IShipmentInbound {
  description: string;
  id: string;
  location: string[];
  numberOfCards: string;
}

export interface IShipmentOutbound {
  address: {
    apartment: string;
    city: string;
    country: string;
    fullName: string;
    state: string;
    streetAddress: string;
    zip: string;
  };
  cards: string[];
  customId: string;
  id: string;
}

export interface PrintDownloadButtonsProps {
  shipment: IShipmentInbound;
}

export interface IInvoiceButtonProps {
  shipment: IShipmentOutbound;
}
