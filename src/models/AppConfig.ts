import AppConfig from "./../db/AppConfig";

export async function getAllSettings() {
  return await AppConfig.findAll();
}

export async function findByIdAndUpdate(id: number, appConfig: any) {
  const oldAppConfig = await AppConfig.findByPk(id);
  if (oldAppConfig) {
    const newAppConfig = await oldAppConfig.update(appConfig);
    return newAppConfig;
  }
}
