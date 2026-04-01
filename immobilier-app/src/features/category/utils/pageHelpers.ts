const VALID_TRANSACTION_TYPES = ["rent-long", "rent-short", "selle"] as const;

export const isValidTransactionType = (type: string): type is typeof VALID_TRANSACTION_TYPES[number] => {
  return VALID_TRANSACTION_TYPES.includes(type as any);
};

export const getPageTitle = (transactionType: string): string => {
  switch (transactionType) {
    case "rent-long":
      return "Locations à long terme";
    case "rent-short":
      return "Locations à court terme";
    case "selle":
      return "Propriétés à Vendre";
    default:
      return "Propriétés à Vendre";
  }
};

export const getPageDescription = (transactionType: string): string => {
  switch (transactionType) {
    case "rent-long":
      return "Trouvez votre location idéale pour un séjour prolongé";
    case "rent-short":
      return "Découvrez nos meilleures locations pour vos vacances";
    case "selle":
      return "Explorez nos biens immobiliers à vendre";
    default:
      return "Explorez nos biens immobiliers à vendre";
  }
};
