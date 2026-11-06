export interface TimeZoneOption {
  city: string
  country: string
  offset: string
  timeZone: string
}

export const DEFAULT_TIME_ZONE = 'Asia/Manila'
export const TIME_ZONE_SESSION_KEY = '2bet-timezone'

export const timeZoneOptions: TimeZoneOption[] = [
  { city: 'Manila', country: 'Philippines', offset: 'GMT+08:00', timeZone: 'Asia/Manila' },
  { city: 'Midway', country: 'United States Minor Outlying Islands', offset: 'GMT−11:00', timeZone: 'Pacific/Midway' },
  { city: 'Niue', country: 'Niue', offset: 'GMT−11:00', timeZone: 'Pacific/Niue' },
  { city: 'Pago Pago', country: 'American Samoa', offset: 'GMT−11:00', timeZone: 'Pacific/Pago_Pago' },
  { city: 'Adak', country: 'United States', offset: 'GMT−10:00', timeZone: 'America/Adak' },
  { city: 'Honolulu', country: 'United States', offset: 'GMT−10:00', timeZone: 'Pacific/Honolulu' },
  { city: 'Rarotonga', country: 'Cook Islands', offset: 'GMT−10:00', timeZone: 'Pacific/Rarotonga' },
  { city: 'Tahiti', country: 'French Polynesia', offset: 'GMT−10:00', timeZone: 'Pacific/Tahiti' },
  { city: 'Marquesas', country: 'French Polynesia', offset: 'GMT−09:30', timeZone: 'Pacific/Marquesas' },
  { city: 'Anchorage', country: 'United States', offset: 'GMT−09:00', timeZone: 'America/Anchorage' },
  { city: 'Juneau', country: 'United States', offset: 'GMT−09:00', timeZone: 'America/Juneau' },
  { city: 'Metlakatla', country: 'United States', offset: 'GMT−09:00', timeZone: 'America/Metlakatla' },
  { city: 'Nome', country: 'United States', offset: 'GMT−09:00', timeZone: 'America/Nome' },
  { city: 'Los Angeles', country: 'United States', offset: 'GMT−08:00', timeZone: 'America/Los_Angeles' },
  { city: 'Denver', country: 'United States', offset: 'GMT−07:00', timeZone: 'America/Denver' },
  { city: 'Chicago', country: 'United States', offset: 'GMT−06:00', timeZone: 'America/Chicago' },
  { city: 'New York', country: 'United States', offset: 'GMT−05:00', timeZone: 'America/New_York' },
  { city: 'Halifax', country: 'Canada', offset: 'GMT−04:00', timeZone: 'America/Halifax' },
  { city: 'St. John’s', country: 'Canada', offset: 'GMT−03:30', timeZone: 'America/St_Johns' },
  { city: 'São Paulo', country: 'Brazil', offset: 'GMT−03:00', timeZone: 'America/Sao_Paulo' },
  { city: 'Azores', country: 'Portugal', offset: 'GMT−01:00', timeZone: 'Atlantic/Azores' },
  { city: 'London', country: 'United Kingdom', offset: 'GMT+00:00', timeZone: 'Europe/London' },
  { city: 'Paris', country: 'France', offset: 'GMT+01:00', timeZone: 'Europe/Paris' },
  { city: 'Cairo', country: 'Egypt', offset: 'GMT+02:00', timeZone: 'Africa/Cairo' },
  { city: 'Moscow', country: 'Russia', offset: 'GMT+03:00', timeZone: 'Europe/Moscow' },
  { city: 'Tehran', country: 'Iran', offset: 'GMT+03:30', timeZone: 'Asia/Tehran' },
  { city: 'Dubai', country: 'United Arab Emirates', offset: 'GMT+04:00', timeZone: 'Asia/Dubai' },
  { city: 'Kabul', country: 'Afghanistan', offset: 'GMT+04:30', timeZone: 'Asia/Kabul' },
  { city: 'Karachi', country: 'Pakistan', offset: 'GMT+05:00', timeZone: 'Asia/Karachi' },
  { city: 'Kolkata', country: 'India', offset: 'GMT+05:30', timeZone: 'Asia/Kolkata' },
  { city: 'Kathmandu', country: 'Nepal', offset: 'GMT+05:45', timeZone: 'Asia/Kathmandu' },
  { city: 'Dhaka', country: 'Bangladesh', offset: 'GMT+06:00', timeZone: 'Asia/Dhaka' },
  { city: 'Yangon', country: 'Myanmar', offset: 'GMT+06:30', timeZone: 'Asia/Yangon' },
  { city: 'Bangkok', country: 'Thailand', offset: 'GMT+07:00', timeZone: 'Asia/Bangkok' },
  { city: 'Singapore', country: 'Singapore', offset: 'GMT+08:00', timeZone: 'Asia/Singapore' },
  { city: 'Kuala Lumpur', country: 'Malaysia', offset: 'GMT+08:00', timeZone: 'Asia/Kuala_Lumpur' },
  { city: 'Shanghai', country: 'China', offset: 'GMT+08:00', timeZone: 'Asia/Shanghai' },
  { city: 'Tokyo', country: 'Japan', offset: 'GMT+09:00', timeZone: 'Asia/Tokyo' },
  { city: 'Darwin', country: 'Australia', offset: 'GMT+09:30', timeZone: 'Australia/Darwin' },
  { city: 'Sydney', country: 'Australia', offset: 'GMT+10:00', timeZone: 'Australia/Sydney' },
  { city: 'Nouméa', country: 'New Caledonia', offset: 'GMT+11:00', timeZone: 'Pacific/Noumea' },
  { city: 'Auckland', country: 'New Zealand', offset: 'GMT+12:00', timeZone: 'Pacific/Auckland' },
  { city: 'Chatham', country: 'New Zealand', offset: 'GMT+12:45', timeZone: 'Pacific/Chatham' },
  { city: 'Tongatapu', country: 'Tonga', offset: 'GMT+13:00', timeZone: 'Pacific/Tongatapu' },
  { city: 'Kiritimati', country: 'Kiribati', offset: 'GMT+14:00', timeZone: 'Pacific/Kiritimati' },
]

const isSupportedTimeZone = (value: string | null | undefined): value is string => {
  return timeZoneOptions.some(option => option.timeZone === value)
}

export const formatTimeZoneDate = (timeZone: string, date = new Date()): string => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    timeZone,
    weekday: 'short',
  }).formatToParts(date)
  const day = parts.find(part => part.type === 'day')?.value ?? ''
  const month = parts.find(part => part.type === 'month')?.value ?? ''
  const weekday = parts.find(part => part.type === 'weekday')?.value ?? ''

  return `${day} ${month} (${weekday})`
}

export const useTimeZonePreference = () => {
  const timeZoneCookie = useCookie<string>(TIME_ZONE_SESSION_KEY, {
    default: () => DEFAULT_TIME_ZONE,
    sameSite: 'lax',
  })
  const timeZone = useState<string>('2bet-timezone-preference', () => {
    return isSupportedTimeZone(timeZoneCookie.value) ? timeZoneCookie.value : DEFAULT_TIME_ZONE
  })

  const selectedTimeZone = computed(() => {
    return timeZoneOptions.find(option => option.timeZone === timeZone.value) ?? timeZoneOptions[0]!
  })

  const setTimeZone = (nextTimeZone: string): void => {
    if (!isSupportedTimeZone(nextTimeZone)) {
      return
    }

    timeZone.value = nextTimeZone
    timeZoneCookie.value = nextTimeZone

    if (import.meta.client) {
      window.sessionStorage.setItem(TIME_ZONE_SESSION_KEY, nextTimeZone)
    }
  }

  const restoreTimeZone = (): void => {
    if (!import.meta.client) {
      return
    }

    const savedTimeZone = window.sessionStorage.getItem(TIME_ZONE_SESSION_KEY)
      || window.sessionStorage.getItem('bybet-timezone')
    const nextTimeZone = isSupportedTimeZone(savedTimeZone)
      ? savedTimeZone
      : isSupportedTimeZone(timeZoneCookie.value) ? timeZoneCookie.value : DEFAULT_TIME_ZONE

    timeZone.value = nextTimeZone
    timeZoneCookie.value = nextTimeZone
  }

  return {
    restoreTimeZone,
    selectedTimeZone,
    setTimeZone,
    timeZone,
  }
}
