export const hours = [
  12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];

export const timezones = [
  { value: '-12:00', label: '(GMT -12:00) Eniwetok, Kwajalein' },
  { value: '-11:00', label: '(GMT -11:00) Midway Island, Samoa' },
  { value: '-10:00', label: '(GMT -10:00) Hawaii' },
  { value: '-09:50', label: '(GMT -9:30) Taiohae' },
  { value: '-09:00', label: '(GMT -9:00) Alaska' },
  { value: '-08:00', label: '(GMT -8:00) Pacific Time (US & Canada)' },
  { value: '-07:00', label: '(GMT -7:00) Mountain Time (US & Canada)' },
  {
    value: '-06:00',
    label: '(GMT -6:00) Central Time (US & Canada), Mexico City',
  },
  {
    value: '-05:00',
    label: '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
  },
  { value: '-04:50', label: '(GMT -4:30) Caracas' },
  {
    value: '-04:00',
    label: '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
  },
  { value: '-03:50', label: '(GMT -3:30) Newfoundland' },
  { value: '-03:00', label: '(GMT -3:00) Brazil, Buenos Aires, Georgetown' },
  { value: '-02:00', label: '(GMT -2:00) Mid-Atlantic' },
  { value: '-01:00', label: '(GMT -1:00) Azores, Cape Verde Islands' },
  {
    value: '+00:00',
    label: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
  },
  { value: '+01:00', label: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris' },
  { value: '+02:00', label: '(GMT +2:00) Kaliningrad, South Africa' },
  {
    value: '+03:00',
    label: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
  },
  { value: '+03:50', label: '(GMT +3:30) Tehran' },
  { value: '+04:00', label: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi' },
  { value: '+04:50', label: '(GMT +4:30) Kabul' },
  {
    value: '+05:00',
    label: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
  },
  { value: '+05:50', label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi' },
  { value: '+05:75', label: '(GMT +5:45) Kathmandu, Pokhara' },
  { value: '+06:00', label: '(GMT +6:00) Almaty, Dhaka, Colombo' },
  { value: '+06:50', label: '(GMT +6:30) Yangon, Mandalay' },
  { value: '+07:00', label: '(GMT +7:00) Bangkok, Hanoi, Jakarta' },
  {
    value: '+08:00',
    label: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
  },
  { value: '+08:75', label: '(GMT +8:45) Eucla' },
  {
    value: '+09:00',
    label: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
  },
  { value: '+09:50', label: '(GMT +9:30) Adelaide, Darwin' },
  {
    value: '+10:00',
    label: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
  },
  { value: '+10:50', label: '(GMT +10:30) Lord Howe Island' },
  {
    value: '+11:00',
    label: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
  },
  { value: '+11:50', label: '(GMT +11:30) Norfolk Island' },
  {
    value: '+12:00',
    label: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
  },
  { value: '+12:75', label: '(GMT +12:45) Chatham Islands' },
  { value: '+13:00', label: '(GMT +13:00) Apia, Nukualofa' },
  { value: '+14:00', label: '(GMT +14:00) Line Islands, Tokelau' },
];

export function getCurrentTimezone() {
  // const offset = new Date().getTimezoneOffset();

  // const hour = Math.floor(offset / -60) - 1;
  // const minutes = offset % 60;
  // const offsetString = `${hour < 0 ? '-' : '+'}${Math.abs(hour).toString().padStart(2, '0')}:${Math.abs(minutes).toString().padStart(2, '0')}`;
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
