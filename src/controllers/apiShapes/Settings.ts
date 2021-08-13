export function SettingsShape(settings: any) {
  const {
    id,
    logo,
    companyName,
    address,
    email,
    websiteUrl,
    fax,
    phoneNo,
    returnPolicy,
    openingTime,
    closingTime,
  } = settings;
  if (settings) {
    return {
      id,
      logo,
      companyName,
      address,
      email,
      websiteUrl,
      fax,
      phoneNo,
      returnPolicy,
      openingTime,
      closingTime,
    };
  }
  return undefined;
}
