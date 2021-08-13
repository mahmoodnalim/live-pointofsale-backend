import ISettings from '../interfaces/ISettings';
import Settings from '../db/Settings';

export async function getAllSettings(){
    return await Settings.findAll();
}

export async function getSetting(id: number) {
    return await Settings.findByPk(id);
  }

export async function createSettings(settings: ISettings) {
    return await Settings.create(settings);
  }
  
  export async function updateSettings(id: number, settings: any) {
    const oldSettings = await Settings.findByPk(id);
    if (oldSettings) {
      const newSettings = await oldSettings.update(settings);
      return newSettings;
    }
  }
  
  