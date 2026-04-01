export interface PropertyQueryParams {
  typeTransaction: string;
  city?: number;
  region?: number;
  category?: string;
  features?: number[];
  host?: number;
  page?: number;
  perPage?: number;
  etat?: string;
  checkin?: string;
  checkout?: string;
}

export const QueryBuilder = ({
  typeTransaction,
  city,
  region,
  category,
  features,
  host,
  etat,
  page = 1,
  perPage,
  checkin,
  checkout,
}: PropertyQueryParams) => {
  const params = new URLSearchParams();

  if (typeTransaction) params.append("typeTransaction", typeTransaction);
  if (city) params.append("city", city.toString());
  if (region) params.append("region", region.toString());
  if (category) params.append("category", category);
  if (host) params.append("host", host.toString());
  if (etat) params.append("etat", etat.toString());
  if (checkin) params.append("checkin", checkin);
  if (checkout) params.append("checkout", checkout);
  if (perPage) params.append("perPage", perPage.toString());
  if (features && features.length > 0) {
    features.forEach((f) => params.append("features[]", f.toString()));
  }
  params.append("page", page.toString());

  return params.toString();
};