export interface ILocation {
  results: {
    components: {
      town?: string;
      city?: string;
    };
  }[];
}

export interface IReqBody {
  lat: string;
  long: string;
}