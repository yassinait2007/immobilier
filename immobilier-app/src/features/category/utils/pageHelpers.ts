const VALID_TRANSACTION_TYPES = ["rent", "vacation_rental", "sale"] as const;

export const isValidTransactionType = (type: string): type is typeof VALID_TRANSACTION_TYPES[number] => {
  return VALID_TRANSACTION_TYPES.includes(type as any);
};

export const getPageTitle = (transactionType: string): string => {
  switch (transactionType) {
    case "rent":
      return "Locations à long terme";
    case "vacation_rental":
      return "Locations à court terme";
    case "sale":
      return "Propriétés à Vendre";
    default:
      return "Propriétés à Vendre";
  }
};

export const getPageDescription = (transactionType: string): string => {
  switch (transactionType) {
    case "rent":
      return "Trouvez votre location idéale pour un séjour prolongé";
    case "vacation_rental":
      return "Découvrez nos meilleures locations pour vos vacances";
    case "sale":
      return "Explorez nos biens immobiliers à vendre";
    default:
      return "Explorez nos biens immobiliers à vendre";
  }
};
