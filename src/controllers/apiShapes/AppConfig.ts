export function AppConfig(setting: any) {
  return {
    key: setting && setting.key,
    value: setting && setting.value
  };
}
