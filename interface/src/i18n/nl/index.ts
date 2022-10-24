import type { BaseTranslation } from '../i18n-types';

const nl: BaseTranslation = {
  LANGUAGE: 'Taal',
  RETRY: 'Opnieuw proberen',
  LOADING: 'Laden',
  IS_REQUIRED: 'is verplicht',
  SIGN_IN: 'Inloggen',
  SIGN_OUT: 'Uitloggen',
  USERNAME: 'Gebruikersnaam',
  PASSWORD: 'Wachtwoord',
  DASHBOARD: 'Dashboard',
  SETTINGS: 'Instellingen',
  SAVED: 'opgeslagen',
  HELP: 'Help',
  LOGGED_IN: 'Ingelogd als {name}',
  PLEASE_SIGNIN: 'Log in om verder te gaan',
  UPLOAD_SUCCESSFUL: 'Upload successvol',
  DOWNLOAD_SUCCESSFUL: 'Download successvol',
  INVALID_LOGIN: 'Logingegevens fout',
  NETWORK: 'Netwerk',
  SECURITY: 'Beveiliging',
  ONOFF_CAP: 'AAN/UIT',
  ONOFF: 'aan/uit',
  TYPE: 'Type',
  DESCRIPTION: 'Beschrijving',
  ENTITIES: 'Entiteiten',
  REFRESH: 'Ververs',
  EXPORT: 'Export',
  DEVICE_DETAILS: 'Device Gegevens',
  BRAND: 'Merk',
  ENTITY_NAME: 'Entiteit',
  VALUE: 'Waarde',
  SHOW_FAV: 'alleen favorieten weergeven',
  DEVICE_SENSOR_DATA: 'Apparaat en Sensor data',
  DEVICES_SENSORS: 'Apparaten & Sensoren',
  ATTACHED_SENSORS: 'Aangesloten EMS-ESP sensoren',
  RUN_COMMAND: 'Call commando',
  CHANGE_VALUE: 'Wijzig waarde',
  CANCEL: 'Annuleren',
  RESET: 'Reset',
  SEND: 'Verzenden',
  SAVE: 'Opslaan',
  REMOVE: 'Verwijderen',
  PROBLEM_UPDATING: 'Probleem met updaten',
  PROBLEM_LOADING: 'Probleem met laden',
  ACCESS_DENIED: 'Toegang geweigerd',
  ANALOG_SENSOR: 'Analoge sensor',
  ANALOG_SENSORS: 'Analoge Sensoren',
  UPDATED: 'Bijgewerkt',
  UPDATE: 'Bijwerken',
  REMOVED: 'Verwijderd',
  DELETION: 'Verwijder',
  OFFSET: 'Offset',
  FACTOR: 'Factor',
  FREQ: 'Frequentie',
  STARTVALUE: 'Startwaarde',
  WARN_GPIO: 'Waarschuwing: let op met het koppelen van de juiste GPIO pin!',
  EDIT: 'Wijzigen',
  TEMP_SENSOR: 'Temperatuur sensor',
  TEMP_SENSORS: 'Temperatuur Sensoren',
  WRITE_COMMAND: 'Schrijf commando {cmd}',
  EMS_BUS_WARNING:
    'EMS bus niet gevonden. Als deze waarschuwing blijft staan na een paar seconden dan loop de instellingen na en in het bijzonder het apparaat type profiel na.',
  EMS_BUS_SCANNING: 'Scannen naar EMS apparaten...',
  CONNECTED: 'Verbonden',
  TX_ISSUES: 'Tx bus probleem. Probeer een andere Tx verzendmodus',
  DISCONNECTED: 'Niet verbonden',
  EMS_SCAN: 'Weet je zeker dat je een volledige EMS bus scan uit wilt voeren?',
  EMS_BUS_STATUS: 'EMS busstatus',
  ACTIVE_DEVICES: 'Actieve Apparaten & Sensoren',
  DEVICE: 'Apparaat',
  SUCCESS: 'SUCCESS',
  FAIL: 'MISLUKT',
  QUALITY: 'QUALITEIT',
  SCAN_DEVICES: 'Scannen naar nieuwe apparaten',
  EMS_BUS_STATUS_TITLE: 'EMS Bus & Activiteitenstatus',
  SCAN: 'Scan',
  STATUS_NAMES: [
    'EMS Telegrammen ontvangen (Rx)',
    'EMS Leesopdrachten (Tx)',
    'EMS Schrijfopdrachten (Tx)',
    'Temperatuursensoren uitgelezen',
    'Analoge sensoren uitgelezen',
    'MQTT publicaties',
    'API calls',
    'Syslog berichten'
  ],
  NUM_DEVICES: '{num} Apparaat{{en}}',
  NUM_TEMP_SENSORS: '{num} Temperatuursensor{{en}}',
  NUM_ANALOG_SENSORS: '{num} Analoge sensor{{en}}',
  NUM_DAYS: '{num} Dag{{en}}',
  NUM_SECONDS: '{num} Second{{en}}',
  NUM_HOURS: '{num} Uur{{en}}',
  NUM_MINUTES: '{num} Minuut{{en}}',
  APPLICATION_SETTINGS: 'Applicatieinstellingen',
  CUSTOMIZATION: 'Custom aanpassingen',
  APPLICATION_RESTARTING: 'EMS-ESP herstarten',
  BOARD_PROFILE_TEXT:
    'Selecteer een vooraf ingesteld apparaat profiel uit de lijst of kies Eigen om zelf uw hardware te configureren',
  BOARD_PROFILE: 'Apparaatprofiel',
  BUTTON: 'Toets',
  TEMPERATURE: 'Temperatuur',
  DISABLED: 'Uitgeschakeld',
  GENERAL_OPTIONS: 'Algemene Opties',
  LANGUAGE_ENTITIES: 'Taal (voor apparaat entiteiten)',
  HIDE_LED: 'Verberg LED',
  ENABLE_TELNET: 'Activeer Telnet console',
  ENABLE_ANALOG: 'Activeer analoge sensoren',
  CONVERT_FAHRENHEIT: 'Converteer temperatuurwaarden naar Fahrenheit',
  BYPASS_TOKEN: 'API Access Token authenticatie uitschakelen',
  READONLY: 'Activeer read-only modus (blokkeert alle outgaande EMS Tx schrijf commandos)',
  UNDERCLOCK_CPU: 'Underclock CPU snelheid',
  ENABLE_SHOWER_TIMER: 'Activeer Douche Timer (tijdmeting)',
  ENABLE_SHOWER_ALERT: 'Activeer Douchemelding',
  TRIGGER_TIME: 'Trigger tijd',
  COLD_SHOT_DURATION: 'Tijd Shot koud water',
  FORMATTING_OPTIONS: 'Formatteringsopties',
  BOOLEAN_FORMAT_DASHBOARD: 'Boolean formaat dashboard',
  BOOLEAN_FORMAT_API: 'Boolean formaat API/MQTT',
  ENUM_FORMAT: 'Enum formaat API/MQTT',
  INDEX: 'Index',
  ENABLE_PARASITE: 'Activeer Dallas parasitaire modus',
  LOGGING: 'Logging',
  LOG_HEX: 'Log EMS telegrammen in hexadecimaal',
  ENABLE_SYSLOG: 'Activeer Syslog',
  MARK_INTERVAL: 'Markeringsinterval',
  SECONDS: 'seconden',
  MINUTES: 'minuten',
  RESTART: 'Herstarten',
  HOURS: 'uren',
  RESTART_TEXT: 'EMS-ESP dient opnieuw gestart te worden om de wijzingen toe te passen',
  RESTART_CONFIRM: 'Weet je zeker dat je EMS-ESP wilt herstarten?',
  COMMAND: 'Commando',
  CUSTOMIZATIONS_RESTART: 'Alle custom profielen worden verwijderd. Herstarten...',
  CUSTOMIZATIONS_FULL: 'Te veel entiteiten geselecteerd. Sla op in delen aub',
  CUSTOMIZATIONS_SAVED: 'Custom aanpassingen opgeslagen',
  CUSTOMIZATIONS_HELP_1: 'Selecteer een apparaat en pas de entiteiten aan door middel van de opties',
  CUSTOMIZATIONS_HELP_2: 'Markeer as favoriet',
  CUSTOMIZATIONS_HELP_3: 'Zet schrijfacties uit',
  CUSTOMIZATIONS_HELP_4: 'Uitsluiten van MQTT en API',
  CUSTOMIZATIONS_HELP_5: 'verberg van het Dashboard',
  SELECT_DEVICE: 'Selecteer een apparaat',
  SET_ALL: 'Alles aanzetten',
  OPTIONS: 'Opties',
  NAME: 'Naam',
  CUSTOMIZATIONS_RESET:
    'Weet je zeker dat je alle custom aanpassingen wilt verwijderen inclusief de custom instellingen voor analoge temperatuursensoren?',
  DEVICE_ENTITIES: 'Apparaat Entiteiten',
  USER_CUSTOMIZATION: 'Custom Instellingen',
  SUPPORT_INFORMATION: 'Support Informatie',
  CLICK_HERE: 'Klik Hier',
  HELP_INFORMATION_1: 'Bezoek de online wiki om instructies te vinden om EMS-ESP te configureren',
  HELP_INFORMATION_2: 'Voor de live community ga naar de Discord server',
  HELP_INFORMATION_3: 'Om een nieuwe feature te vragen of een bug te rapporteren',
  HELP_INFORMATION_4: 'zorg dat je ook je systeem details zijn toevoeged voor een sneller antwoord',
  HELP_INFORMATION_5: 'EMS-ESP is een gratis en open source project. Steun ons met een Star op Github!',
  SUPPORT_INFO: 'Support Info',
  UPLOAD: 'Upload',
  DOWNLOAD: 'Download',
  ABORTED: 'afgebroken',
  FAILED: 'mislukt',
  SUCCESSFUL: 'successvol',
  SYSTEM: 'Systeem',
  LOG: 'Log',
  STATUS: 'Status',
  UPLOAD_DOWNLOAD: 'Upload/Download',
  SYSTEM_VERSION_RUNNING: 'op dit moment draai je versie',
  SYSTEM_APPLY_FIRMWARE: 'om de nieuwe firmware te activeren',
  CLOSE: 'Sluiten',
  USE: 'Gebruik',
  FACTORY_RESET: 'Fabrieksinstellingen',
  SYSTEM_FACTORY_TEXT: 'Gateway is gereset en start nu weer op met fabrieksinstellingen',
  SYSTEM_FACTORY_TEXT_DIALOG: 'Weet je zeker dat je een reset naar fabrieksinstellingen uit wilt voeren?',
  VERSION_CHECK: 'Versie Check',
  THE_LATEST: 'De laatste',
  OFFICIAL: 'official',
  DEVELOPMENT: 'development',
  VERSION_IS: 'versie is',
  RELEASE_NOTES: 'release notes',
  PLATFORM: 'Apparaat (Platform / SDK)',
  UPTIME: 'Systeem Uptime',
  CPU_FREQ: 'CPU Frequency',
  HEAP: 'Heap (Free / Max Alloc)',
  PSRAM: 'PSRAM (Size / Free)',
  FLASH: 'Flash Chip (Size / Speed)',
  APPSIZE: 'Application (Used / Free)',
  FILESYSTEM: 'File System (Used / Free)',
  BUFFER_SIZE: 'Buffer Size',
  COMPACT: 'Compact',
  ENABLE_OTA: 'Acitveer OTA Updates',
  DOWNLOAD_CUSTOMIZATION_TEXT: 'Download alle custom instellingen',
  DOWNLOAD_SETTINGS_TEXT:
    'Download de applicatie settings. Wees voorzichting met het delen van dit bestand want het bevat o.a. de wachtwoorden in plain text',
  UPLOAD_TEXT: 'Upload een nieuwe firmware (.bin) file, instellingen of custom instellingen (.json) bestand hieronder',
  UPLOADING: 'Uploading',
  UPLOAD_DROP_TEXT: 'Sleep bestand hierheen of klik hier',
  ERROR: 'Onverwachte fout, probeer opnieuw',
  TIME_SET: 'Tijd ingesteld',
  MANAGE_USERS: 'Beheer Gebruikers',
  IS_ADMIN: 'is Admin',
  USER_WARNING: 'U dient tenminste 1 admin gebruiker te configureren',
  ADD: 'Toevoegen',
  ACCESS_TOKEN_FOR: 'Access Token voor',
  ACCESS_TOKEN_TEXT:
    'Het token hieronder wordt gebruikt voor de REST API calls die authorisatie nodig hebben. Het kan zowel als Bearer token in de Authorization header of in acccess_token URL query parameter gebruikt worden',
  GENERATING_TOKEN: 'Token aan het genereren',
  USER: 'Gebruiker',
  MODIFY: 'Aanpassen',
  SU_TEXT:
    'Het su (super user) wachtwoord wordt gebruikt om authorisatie tokens te signeren en ook om admin privileges te activeren in de console.',
  NOT_ENABLED: 'Niet geactiveerd',
  ERRORS: 'Foutmeldingen',
  DISCONNECT_REASON: 'Verbinding verbroken vanwege',
  ENABLE_MQTT: 'Activeer MQTT',
  OPTIONAL: 'Optioneel',
  FORMATTING: 'Formatteren',
  FORMAT: 'Formattering',
  MQTT_NEST_1: 'Genest in 1 topic',
  MQTT_NEST_2: 'Als individuele topics',
  MQTT_RESPONSE: 'Publiceer commando output naar een `response` topic',
  MQTT_PUBLISH_TEXT_1: 'Publiceer enkele waarde topics on change',
  MQTT_PUBLISH_TEXT_2: 'Publiceer naar commando topics (ioBroker)',
  MQTT_PUBLISH_TEXT_3: 'Activeer MQTT Discovery (Home Assistant, Domoticz)',
  MQTT_PUBLISH_TEXT_4: 'Prefix voor de Discovery topics',
  MQTT_PUBLISH_INTERVALS: 'Publicatie intervallen',
  MQTT_INT_BOILER: 'CV ketels en warmtepompen',
  MQTT_INT_THERMOSTATS: 'Thermostaten',
  MQTT_INT_SOLAR: 'Solar Modules',
  MQTT_INT_MIXER: 'Mixer Modules',
  DEFAULT: 'Default',
  MQTT_CLEAN_SESSION: 'Clean Session aan',
  MQTT_RETAIN_FLAG: 'Retain flag aan',
  INACTIVE: 'Inactief',
  ACTIVE: 'Actief',
  UNKNOWN: 'Onbekend',
  SET_TIME: 'Tijd instellen',
  SET_TIME_TEXT: 'Geef de locale datum en tijd in',
  LOCAL_TIME: 'Locale Tijd',
  UTC_TIME: 'UTC Tijd',
  ENABLE_NTP: 'Activeer NTP',
  TIME_ZONE: 'Tijdzone',
  ACCESS_POINT: 'Access Point',
  AP_PROVIDE: 'Activeer Access Point',
  AP_PROVIDE_TEXT_1: 'altijd',
  AP_PROVIDE_TEXT_2: 'als WiFi niet is verbonden',
  AP_PROVIDE_TEXT_3: 'nooit',
  AP_PREFERRED_CHANNEL: 'Voorkeurskanaal',
  AP_HIDE_SSID: 'SSID verbergen',
  NETWORK_SCAN: 'Scan WiFi Networken',
  IDLE: 'Idle',
  LOST: 'Verloren',
  SCANNING: 'Scannen',
  SCAN_AGAIN: 'Opnieuw scannen',
  NETWORK_SCANNER: 'Netwerk Scanner',
  NETWORK_NO_WIFI: 'Geen WiFi networken gevonden',
  NETWORK_BLANK_SSID: 'laat leeg om WiFi uit te schakelen',
  POWER: 'Vermogen',
  NETWORK_DISABLE_SLEEP: 'WiFi Sleep Mode uitzetten',
  NETWORK_LOW_BAND: 'Lagere WiFi bandbreedte gebruiken',
  NETWORK_USE_DNS: 'Activeer mDNS Service',
  NETWORK_ENABLE_IPV6: 'Activeer IPv6 support',
  NETWORK_FIXED_IP: 'Gebruik vast IP addres',
  ADMIN: 'Admin',
  GUEST: 'Gast',
  NEW: 'Nieuwe',
  RENAME: 'Hernoem',
  ENTITY: 'Entiteit'
};

export default nl;
