/**********************************************************************
 * Project           : Circuit Solver
 * File		        : LanguageManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to store all the language translations for circuit solver. It
 *                   serves as general purpose storage. Only "this.VARIABLES" are to be stored here!
 *                   This file is shielded from any obfuscatiion if you follow this rule.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class LanguageManager {
  /* Do not create any functions in this class. */
  public WATERMARK =
    'Created by Circuit Solver (www.androidcircuitsolver.app/html)';
  /* Padding for the text bounds! */
  public TEXT_PADDING = '    ';
  public CONNECTION_NOT_ALLOWED = {
    English: 'Connection not allowed',
    Spanish: 'Conexión no permitida',
    French: 'Connexion non autorisée',
    Italian: 'Connessione non consentita',
    Dutch: 'Verbinding niet toegestaan',
    Russian: 'Соединение не разрешено',
    German: 'Verbindung nicht erlaubt',
    Indonesian: 'Koneksi tidak diizinkan'
  };
  public STRETCH_WINDOW = {
    English: 'Strech Window',
    Spanish: 'Ventana elástica',
    French: 'Fenêtre extensible',
    Italian: 'Finestra allungata',
    Dutch: 'Rekvenster',
    Russian: 'Растянуть окно',
    German: 'Stretch-Fenster',
    Indonesian: 'Regangkan Jendela'
  };
  public LANGUAGE = {
    English: 'Language',
    Spanish: 'Idioma',
    French: 'Langue',
    Italian: 'linguaggio',
    Dutch: 'Taal',
    Russian: 'язык',
    German: 'Sprache',
    Indonesian: 'Bahasa'
  };
  public AUTOMATIC_TIMESTEP = {
    English: 'Automatic Timestep',
    Spanish: 'Paso de tiempo automático',
    French: 'Timestep automatique',
    Italian: 'Timestep automatico',
    Dutch: 'Automatische tijdstap',
    Russian: 'Автоматический таймстеп',
    German: 'Automatischer Zeitschritt',
    Indonesian: 'Pencatat Waktu Otomatis'
  };
  public SHORTCUT_HINTS = {
    English: 'Shortcut Hints',
    Spanish: 'Sugerencias de acceso directo',
    French: 'Conseils de raccourci',
    Italian: 'Suggerimenti per le scorciatoie',
    Dutch: 'Snelkoppelingshints',
    Russian: 'Горячие подсказки',
    German: 'Verknüpfungshinweise',
    Indonesian: 'Petunjuk Pintasan'
  };
  public CONVERGENCE_ERROR = {
    English: 'Convergence Error',
    Spanish: 'Error de Convergencia',
    French: 'Erreur de Convergence',
    Italian: 'Errore di Convergenza',
    Dutch: 'Convergentie Error',
    Russian: 'Конвергенция Ошибка',
    German: 'Konvergenzfehler',
    Indonesian: 'Konvergensi Kesalahan'
  };
  public SINGULAR_MATRIX = {
    English: 'Singular Matrix',
    Spanish: 'Matriz Singular',
    French: 'Matrice Singulière',
    Italian: 'Matrice Singolare',
    Dutch: 'Singulaire Matrix',
    Russian: 'Сингулярная матрица',
    German: 'Singuläre Matrix',
    Indonesian: 'Singular Matrix'
  };
  public CONFIRM_REMOVE_ALL = {
    English: 'Remove All?',
    Spanish: '¿Eliminar todo?',
    French: 'Enlever tout?',
    Italian: 'Rimuovi tutto?',
    Dutch: 'Verwijder alles?',
    Russian: 'Убрать все?',
    German: 'Alles entfernen?',
    Indonesian: 'Menghapus semua?'
  };
  public CONFIRM_YES = {
    English: 'Yes',
    Spanish: 'Sí',
    French: 'Oui',
    Italian: 'sì',
    Dutch: 'Ja',
    Russian: 'да',
    German: 'ja',
    Indonesian: 'iya nih'
  };
  public CONFIRM_NO = {
    English: 'No',
    Spanish: 'No',
    French: 'non',
    Italian: 'no',
    Dutch: 'Nee',
    Russian: 'нет',
    German: 'Nein',
    Indonesian: 'tidak'
  };
  public FILE_EXPLORER_TITLE = {
    English: 'Select Simulation File',
    Spanish: 'Seleccionar archivo de simulación',
    French: 'Sélectionner un fichier de simulation',
    Italian: 'Seleziona il file di simulazione',
    Dutch: 'Selecteer Simulatiebestand',
    Russian: 'Выберите файл моделирования',
    German: 'Wählen Sie Simulationsdatei',
    Indonesian: 'Pilih File Simulasi'
  };
  public NO_NETWORK = {
    English: 'No network detected.',
    Spanish: 'No se detecta la red.',
    French: 'Aucun réseau détecté.',
    Italian: 'Nessuna rete rilevata.',
    Dutch: 'Geen netwerk gedetecteerd.',
    Russian: 'Не обнаружено сети.',
    German: 'Kein Netzwerk erkannt.',
    Indonesian: 'Tidak ada jaringan yang terdeteksi.'
  };
  public END_OF_TIME = {
    English: 'End of simulation time.',
    Spanish: 'Fin del tiempo de simulación.',
    French: 'Fin du temps de simulation.',
    Italian: 'Fine del tempo di simulazione.',
    Dutch: 'Einde van de simulatie tijd.',
    Russian: 'Конец времени моделирования.',
    German: 'Ende der Simulationszeit.',
    Indonesian: 'Akhir waktu simulasi.'
  };
  public EXIT = {
    English: 'EXIT',
    Spanish: 'SALIDA',
    French: 'SORTIE',
    Italian: 'USCITA',
    Dutch: 'UITGANG',
    Russian: 'Выход',
    German: 'BEENDEN',
    Indonesian: 'KELUAR'
  };
  public SET_TIME_STEP = {
    English: 'Set Time Step',
    Spanish: 'Establecer el tiempo de paso',
    French: 'Set pas de temps',
    Italian: 'Set passo temporale',
    Dutch: 'Tijd instellen stap',
    Russian: 'Установить шаг по времени',
    German: 'Zeitschritt einstellen',
    Indonesian: 'Set Waktu Langkah'
  };
  public SAVE_CIRCUIT = {
    English: 'Save Circuit',
    Spanish: 'Guardar circuito',
    French: 'Enregistrer circuit',
    Italian: 'Salva circuito',
    Dutch: 'circuit Save',
    Russian: 'Сохранить контур',
    German: 'Schaltung speichern',
    Indonesian: 'Simpan sirkit'
  };
  public SAVE_IMAGE = {
    English: 'Save Image',
    Spanish: 'Guardar imagen',
    French: "Enregistrer l'image",
    Italian: 'Salva immagine',
    Dutch: 'Afbeelding opslaan',
    Russian: 'Сохранить изображение',
    German: 'Bild speichern',
    Indonesian: 'Menyimpan gambar'
  };
  public SET = {
    English: 'Set',
    Spanish: 'Set',
    French: 'Set',
    Italian: 'Set',
    Dutch: 'Set',
    Russian: 'Задавать',
    German: 'Set',
    Indonesian: 'Set'
  };
  public FILE = {
    English: 'File:=',
    Spanish: 'Archivo:=',
    French: 'Fichier:=',
    Italian: 'File:=',
    Dutch: 'File:=',
    Russian: 'файл:=',
    German: 'Datei:=',
    Indonesian: 'Mengajukan:='
  };
  public SYSTEM_SETTINGS = {
    English: 'System Settings',
    Spanish: 'Ajustes del sistema',
    French: 'Les paramètres du système',
    Italian: 'Impostazioni di sistema',
    Dutch: 'Systeem instellingen',
    Russian: 'Настройки системы',
    German: 'Systemeinstellungen',
    Indonesian: 'Pengaturan sistem'
  };
  public MY_DOCUMENTS_TITLE = {
    English: 'My Documents',
    Spanish: 'Ajustes del sistema',
    French: 'Les paramètres du système',
    Italian: 'Impostazioni di sistema',
    Dutch: 'Systeem instellingen',
    Russian: 'Настройки системы',
    German: 'Systemeinstellungen',
    Indonesian: 'Pengaturan sistem'
  };
  public OKAY = {
    English: 'OK',
    Spanish: 'Bueno',
    French: "d'accord",
    Italian: 'Va bene',
    Dutch: 'Oke',
    Russian: 'Хорошо',
    German: 'okay',
    Indonesian: 'baik'
  };
  public CANCEL = {
    English: 'Cancel',
    Spanish: 'Cancelar',
    French: 'Annuler',
    Italian: 'Annulla',
    Dutch: 'annuleren',
    Russian: 'Отмена',
    German: 'Stornieren',
    Indonesian: 'Membatalkan'
  };
  public START_SIMULATION = {
    English: 'Starting Simulation',
    Spanish: 'Iniciando simulación',
    French: 'Lancer la simulation',
    Italian: 'Avvio della simulazione',
    Dutch: 'Simulatie starten',
    Russian: 'Начало симуляции',
    German: 'Simulation starten',
    Indonesian: 'Memulai Simulasi'
  };
  public STOP_SIMULATION = {
    English: 'Stopping Simulation',
    Spanish: 'Detener la simulación',
    French: 'Arrêt de la simulation',
    Italian: 'Interruzione della simulazione',
    Dutch: 'Simulatie stoppen',
    Russian: 'Остановка симуляции',
    German: 'Simulation stoppen',
    Indonesian: 'Menghentikan Simulasi'
  };
  public TRY_AGAIN = {
    English: 'Try again',
    Spanish: 'Inténtalo de nuevo',
    French: 'Réessayer',
    Italian: 'Riprova',
    Dutch: 'Probeer opnieuw',
    Russian: 'Попробуйте еще раз',
    German: 'Versuch es noch einmal',
    Indonesian: 'Coba lagi'
  };
  public COPIED = {
    English: 'Copied',
    Spanish: 'Copiada',
    French: 'Copié',
    Italian: 'Copiato',
    Dutch: 'Gekopieerd',
    Russian: 'скопированный',
    German: 'Kopiert',
    Indonesian: 'Disalin'
  };
  public CANNOT_COPY_WIRE = {
    English: 'Wires cannot be copied',
    Spanish: 'Los cables no se pueden copiar',
    French: 'Les fils ne peuvent pas être copiés',
    Italian: 'I cavi non possono essere copiati',
    Dutch: 'Draden kunnen niet worden gekopieerd',
    Russian: 'Провода не могут быть скопированы',
    German: 'Drähte können nicht kopiert werden',
    Indonesian: 'Kabel tidak dapat disalin'
  };
  public CANNOT_MULTI_SELECT = {
    English: 'Only one element can be copied at a time',
    Spanish: 'Solo se puede copiar un elemento a la vez',
    French: 'Un seul élément peut être copié à la fois',
    Italian: 'È possibile copiare solo un elemento alla volta',
    Dutch: 'Er kan slechts één element tegelijk worden gekopieerd',
    Russian: 'Только один элемент может быть скопирован за один раз',
    German: 'Es kann jeweils nur ein Element kopiert werden',
    Indonesian: 'Hanya satu elemen yang dapat disalin sekaligus'
  };
  public NO_CLIPBOARD_DATA = {
    English: "There's nothing to paste in the clipboard",
    Spanish: 'No hay nada que pegar en el portapapeles',
    French: "Il n'y a rien à coller dans le presse-papiers",
    Italian: "Non c'è niente da incollare negli appunti",
    Dutch: 'Er is niets op het klembord te plakken',
    Russian: 'Там нет ничего, чтобы вставить в буфер обмена',
    German: 'Es gibt nichts in die Zwischenablage einzufügen',
    Indonesian: 'Tidak ada yang bisa disisipkan di clipboard'
  };
  public SAVE_IMAGE_SUCCESS = {
    English: 'Successfully Saved Image.',
    Spanish: 'Imagen guardada con éxito.',
    French: 'Image enregistrée avec succès.',
    Italian: 'Immagine salvata con successo.',
    Dutch: 'Succesvol opgeslagen afbeelding.',
    Russian: 'Изображение успешно сохранено.',
    German: 'Erfolgreich gespeichertes Bild.',
    Indonesian: 'Gambar Berhasil Disimpan.'
  };
  public SAVE_FILE_SUCCESS = {
    English: 'Successfully Saved File.',
    Spanish: 'Archivo guardado correctamente.',
    French: 'Fichier enregistré avec succès.',
    Italian: 'File salvato con successo.',
    Dutch: 'Bestand succesvol opgeslagen.',
    Russian: 'Файл успешно сохранен.',
    German: 'Erfolgreich gespeicherte Datei.',
    Indonesian: 'File Berhasil Disimpan.'
  };
  public ACTION_NOT_COMPLETED = {
    English: 'Action not completed.',
    Spanish: 'Acción no completada.',
    French: 'Action non terminée.',
    Italian: 'Azione non completata.',
    Dutch: 'Actie niet voltooid.',
    Russian: 'Действие не завершено.',
    German: 'Aktion nicht abgeschlossen.',
    Indonesian: 'CSV Berhasil Disimpan.'
  };
  public FILE_MANAGER_ERROR = {
    English: 'Please Install a File Manager.',
    Spanish: 'Instale un administrador de archivos.',
    French: 'Veuillez installer un gestionnaire de fichiers.',
    Italian: 'Installa un file manager.',
    Dutch: 'Installeer een bestandsbeheerder.',
    Russian: 'Пожалуйста, установите файловый менеджер.',
    German: 'Bitte installieren Sie einen Dateimanager.',
    Indonesian: 'Silakan Instal Manajer File.'
  };
  public SPACE = ' ';
  public QUOTE_ESCAPE = /#QUOTE#/g;
  /* #INSERT_GENERATE_ELEMENT_TAG# */
  /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
  public TAG_RESISTOR = 'Resistor';
  public TAG_CAPACITOR = 'Capacitor';
  public TAG_INDUCTOR = 'Inductor';
  public TAG_GROUND = 'Ground';
  public TAG_DCSOURCE = 'DC Source';
  public TAG_DCCURRENT = 'DC Current';
  public TAG_ACSOURCE = 'AC Source';
  public TAG_ACCURRENT = 'AC Current';
  public TAG_SQUAREWAVE = 'Square Wave Source';
  public TAG_SAW = 'Saw Wave Source';
  public TAG_TRI = 'Triangle Wave Source';
  public TAG_CONSTANT = 'Constant Voltage';
  public TAG_WIRE = 'Wire';
  public TAG_NET = 'Virtual Wire';
  public TAG_NOTE = 'Note';
  public TAG_RAIL = 'Power Rail';
  public TAG_VOLTMETER = 'Voltmeter';
  public TAG_OHMMETER = 'Ohmmeter';
  public TAG_AMMETER = 'Ammeter';
  public TAG_WATTMETER = 'Wattmeter';
  public TAG_FUSE = 'Fuse';
  public TAG_SPST = 'Single Pole Single Throw';
  public TAG_SPDT = 'Single Pole Double Throw';
  public TAG_NOT = 'NOT Gate';
  public TAG_DIODE = 'Diode';
  public TAG_LED = 'Light Emitting Diode';
  public TAG_ZENER = 'Zener Diode';
  public TAG_POTENTIOMETER = 'Potentiometer';
  public TAG_AND = 'AND Gate';
  public TAG_OR = 'OR Gate';
  public TAG_NAND = 'NAND Gate';
  public TAG_NOR = 'NOR Gate';
  public TAG_XOR = 'XOR Gate';
  public TAG_XNOR = 'XNOR Gate';
  public TAG_DFF = 'D Flip Flop';
  public TAG_VSAT = 'Voltage Saturation';
  public TAG_ADD = 'Voltage Adder';
  public TAG_SUB = 'Voltage Subtractor';
  public TAG_MUL = 'Voltage Multiplier';
  public TAG_DIV = 'Voltage Divider';
  public TAG_GAIN = 'Voltage Gain';
  public TAG_ABS = 'Voltage Absolute Value';
  public TAG_VCSW = 'Voltage Controlled Switch';
  public TAG_VCVS = 'Voltage Controlled Voltage Source';
  public TAG_VCCS = 'Voltage Controlled Current Source';
  public TAG_CCCS = 'Current Controlled Current Source';
  public TAG_CCVS = 'Current Controlled Voltage Source';
  public TAG_OPAMP = 'Ideal Operational Amplifier';
  public TAG_NMOS = 'NChannel MOSFET';
  public TAG_PMOS = 'PChannel MOSFET';
  public TAG_NPN = 'NPN BJT';
  public TAG_PNP = 'PNP BJT';
  public TAG_ADC = 'Analog-to-Digital Converter';
  public TAG_DAC = 'Digital-to-Analog Converter';
  public TAG_SAH = 'Sample-and-Hold';
  public TAG_PWM = 'Pulse Width Modulator';
  public TAG_INTEGRATOR = 'Integrator';
  public TAG_DIFFERENTIATOR = 'Differentiator';
  public TAG_LPF = '1st Order Low Pass Filter';
  public TAG_HPF = '1st Order High Pass Filter';
  public TAG_REL = 'SPST Relay';
  public TAG_PID = 'PID Controller';
  public TAG_LUT = 'Look-up Table';
  public TAG_VCR = 'Voltage Controlled Resistor';
  public TAG_GRT = 'Voltage Greater Than';
  public TAG_TPTZ = 'Two-Pole-Two-Zero';
  public TAG_TRAN = 'Ideal Transformer';
  /* <!-- END AUTOMATICALLY GENERATED !--> */
  constructor() {
    /* Do not create any functions in this class. */
    this.WATERMARK =
      'Created by Circuit Solver (www.androidcircuitsolver.app/html)';
    /* Padding for the text bounds! */
    this.TEXT_PADDING = '    ';
    this.CONNECTION_NOT_ALLOWED = {
      English: 'Connection not allowed',
      Spanish: 'Conexión no permitida',
      French: 'Connexion non autorisée',
      Italian: 'Connessione non consentita',
      Dutch: 'Verbinding niet toegestaan',
      Russian: 'Соединение не разрешено',
      German: 'Verbindung nicht erlaubt',
      Indonesian: 'Koneksi tidak diizinkan'
    };
    this.STRETCH_WINDOW = {
      English: 'Strech Window',
      Spanish: 'Ventana elástica',
      French: 'Fenêtre extensible',
      Italian: 'Finestra allungata',
      Dutch: 'Rekvenster',
      Russian: 'Растянуть окно',
      German: 'Stretch-Fenster',
      Indonesian: 'Regangkan Jendela'
    };
    this.LANGUAGE = {
      English: 'Language',
      Spanish: 'Idioma',
      French: 'Langue',
      Italian: 'linguaggio',
      Dutch: 'Taal',
      Russian: 'язык',
      German: 'Sprache',
      Indonesian: 'Bahasa'
    };
    this.AUTOMATIC_TIMESTEP = {
      English: 'Automatic Timestep',
      Spanish: 'Paso de tiempo automático',
      French: 'Timestep automatique',
      Italian: 'Timestep automatico',
      Dutch: 'Automatische tijdstap',
      Russian: 'Автоматический таймстеп',
      German: 'Automatischer Zeitschritt',
      Indonesian: 'Pencatat Waktu Otomatis'
    };
    this.SHORTCUT_HINTS = {
      English: 'Shortcut Hints',
      Spanish: 'Sugerencias de acceso directo',
      French: 'Conseils de raccourci',
      Italian: 'Suggerimenti per le scorciatoie',
      Dutch: 'Snelkoppelingshints',
      Russian: 'Горячие подсказки',
      German: 'Verknüpfungshinweise',
      Indonesian: 'Petunjuk Pintasan'
    };
    this.CONVERGENCE_ERROR = {
      English: 'Convergence Error',
      Spanish: 'Error de Convergencia',
      French: 'Erreur de Convergence',
      Italian: 'Errore di Convergenza',
      Dutch: 'Convergentie Error',
      Russian: 'Конвергенция Ошибка',
      German: 'Konvergenzfehler',
      Indonesian: 'Konvergensi Kesalahan'
    };
    this.SINGULAR_MATRIX = {
      English: 'Singular Matrix',
      Spanish: 'Matriz Singular',
      French: 'Matrice Singulière',
      Italian: 'Matrice Singolare',
      Dutch: 'Singulaire Matrix',
      Russian: 'Сингулярная матрица',
      German: 'Singuläre Matrix',
      Indonesian: 'Singular Matrix'
    };
    this.CONFIRM_REMOVE_ALL = {
      English: 'Remove All?',
      Spanish: '¿Eliminar todo?',
      French: 'Enlever tout?',
      Italian: 'Rimuovi tutto?',
      Dutch: 'Verwijder alles?',
      Russian: 'Убрать все?',
      German: 'Alles entfernen?',
      Indonesian: 'Menghapus semua?'
    };
    this.CONFIRM_YES = {
      English: 'Yes',
      Spanish: 'Sí',
      French: 'Oui',
      Italian: 'sì',
      Dutch: 'Ja',
      Russian: 'да',
      German: 'ja',
      Indonesian: 'iya nih'
    };
    this.CONFIRM_NO = {
      English: 'No',
      Spanish: 'No',
      French: 'non',
      Italian: 'no',
      Dutch: 'Nee',
      Russian: 'нет',
      German: 'Nein',
      Indonesian: 'tidak'
    };
    this.FILE_EXPLORER_TITLE = {
      English: 'Select Simulation File',
      Spanish: 'Seleccionar archivo de simulación',
      French: 'Sélectionner un fichier de simulation',
      Italian: 'Seleziona il file di simulazione',
      Dutch: 'Selecteer Simulatiebestand',
      Russian: 'Выберите файл моделирования',
      German: 'Wählen Sie Simulationsdatei',
      Indonesian: 'Pilih File Simulasi'
    };
    this.NO_NETWORK = {
      English: 'No network detected.',
      Spanish: 'No se detecta la red.',
      French: 'Aucun réseau détecté.',
      Italian: 'Nessuna rete rilevata.',
      Dutch: 'Geen netwerk gedetecteerd.',
      Russian: 'Не обнаружено сети.',
      German: 'Kein Netzwerk erkannt.',
      Indonesian: 'Tidak ada jaringan yang terdeteksi.'
    };
    this.END_OF_TIME = {
      English: 'End of simulation time.',
      Spanish: 'Fin del tiempo de simulación.',
      French: 'Fin du temps de simulation.',
      Italian: 'Fine del tempo di simulazione.',
      Dutch: 'Einde van de simulatie tijd.',
      Russian: 'Конец времени моделирования.',
      German: 'Ende der Simulationszeit.',
      Indonesian: 'Akhir waktu simulasi.'
    };
    this.EXIT = {
      English: 'EXIT',
      Spanish: 'SALIDA',
      French: 'SORTIE',
      Italian: 'USCITA',
      Dutch: 'UITGANG',
      Russian: 'Выход',
      German: 'BEENDEN',
      Indonesian: 'KELUAR'
    };
    this.SET_TIME_STEP = {
      English: 'Set Time Step',
      Spanish: 'Establecer el tiempo de paso',
      French: 'Set pas de temps',
      Italian: 'Set passo temporale',
      Dutch: 'Tijd instellen stap',
      Russian: 'Установить шаг по времени',
      German: 'Zeitschritt einstellen',
      Indonesian: 'Set Waktu Langkah'
    };
    this.SAVE_CIRCUIT = {
      English: 'Save Circuit',
      Spanish: 'Guardar circuito',
      French: 'Enregistrer circuit',
      Italian: 'Salva circuito',
      Dutch: 'circuit Save',
      Russian: 'Сохранить контур',
      German: 'Schaltung speichern',
      Indonesian: 'Simpan sirkit'
    };
    this.SAVE_IMAGE = {
      English: 'Save Image',
      Spanish: 'Guardar imagen',
      French: "Enregistrer l'image",
      Italian: 'Salva immagine',
      Dutch: 'Afbeelding opslaan',
      Russian: 'Сохранить изображение',
      German: 'Bild speichern',
      Indonesian: 'Menyimpan gambar'
    };
    this.SET = {
      English: 'Set',
      Spanish: 'Set',
      French: 'Set',
      Italian: 'Set',
      Dutch: 'Set',
      Russian: 'Задавать',
      German: 'Set',
      Indonesian: 'Set'
    };
    this.FILE = {
      English: 'File:=',
      Spanish: 'Archivo:=',
      French: 'Fichier:=',
      Italian: 'File:=',
      Dutch: 'File:=',
      Russian: 'файл:=',
      German: 'Datei:=',
      Indonesian: 'Mengajukan:='
    };
    this.SYSTEM_SETTINGS = {
      English: 'System Settings',
      Spanish: 'Ajustes del sistema',
      French: 'Les paramètres du système',
      Italian: 'Impostazioni di sistema',
      Dutch: 'Systeem instellingen',
      Russian: 'Настройки системы',
      German: 'Systemeinstellungen',
      Indonesian: 'Pengaturan sistem'
    };
    this.MY_DOCUMENTS_TITLE = {
      English: 'My Documents',
      Spanish: 'Ajustes del sistema',
      French: 'Les paramètres du système',
      Italian: 'Impostazioni di sistema',
      Dutch: 'Systeem instellingen',
      Russian: 'Настройки системы',
      German: 'Systemeinstellungen',
      Indonesian: 'Pengaturan sistem'
    };
    this.OKAY = {
      English: 'OK',
      Spanish: 'Bueno',
      French: "d'accord",
      Italian: 'Va bene',
      Dutch: 'Oke',
      Russian: 'Хорошо',
      German: 'okay',
      Indonesian: 'baik'
    };
    this.CANCEL = {
      English: 'Cancel',
      Spanish: 'Cancelar',
      French: 'Annuler',
      Italian: 'Annulla',
      Dutch: 'annuleren',
      Russian: 'Отмена',
      German: 'Stornieren',
      Indonesian: 'Membatalkan'
    };
    this.START_SIMULATION = {
      English: 'Starting Simulation',
      Spanish: 'Iniciando simulación',
      French: 'Lancer la simulation',
      Italian: 'Avvio della simulazione',
      Dutch: 'Simulatie starten',
      Russian: 'Начало симуляции',
      German: 'Simulation starten',
      Indonesian: 'Memulai Simulasi'
    };
    this.STOP_SIMULATION = {
      English: 'Stopping Simulation',
      Spanish: 'Detener la simulación',
      French: 'Arrêt de la simulation',
      Italian: 'Interruzione della simulazione',
      Dutch: 'Simulatie stoppen',
      Russian: 'Остановка симуляции',
      German: 'Simulation stoppen',
      Indonesian: 'Menghentikan Simulasi'
    };
    this.TRY_AGAIN = {
      English: 'Try again',
      Spanish: 'Inténtalo de nuevo',
      French: 'Réessayer',
      Italian: 'Riprova',
      Dutch: 'Probeer opnieuw',
      Russian: 'Попробуйте еще раз',
      German: 'Versuch es noch einmal',
      Indonesian: 'Coba lagi'
    };
    this.COPIED = {
      English: 'Copied',
      Spanish: 'Copiada',
      French: 'Copié',
      Italian: 'Copiato',
      Dutch: 'Gekopieerd',
      Russian: 'скопированный',
      German: 'Kopiert',
      Indonesian: 'Disalin'
    };
    this.CANNOT_COPY_WIRE = {
      English: 'Wires cannot be copied',
      Spanish: 'Los cables no se pueden copiar',
      French: 'Les fils ne peuvent pas être copiés',
      Italian: 'I cavi non possono essere copiati',
      Dutch: 'Draden kunnen niet worden gekopieerd',
      Russian: 'Провода не могут быть скопированы',
      German: 'Drähte können nicht kopiert werden',
      Indonesian: 'Kabel tidak dapat disalin'
    };
    this.CANNOT_MULTI_SELECT = {
      English: 'Only one element can be copied at a time',
      Spanish: 'Solo se puede copiar un elemento a la vez',
      French: 'Un seul élément peut être copié à la fois',
      Italian: 'È possibile copiare solo un elemento alla volta',
      Dutch: 'Er kan slechts één element tegelijk worden gekopieerd',
      Russian: 'Только один элемент может быть скопирован за один раз',
      German: 'Es kann jeweils nur ein Element kopiert werden',
      Indonesian: 'Hanya satu elemen yang dapat disalin sekaligus'
    };
    this.NO_CLIPBOARD_DATA = {
      English: "There's nothing to paste in the clipboard",
      Spanish: 'No hay nada que pegar en el portapapeles',
      French: "Il n'y a rien à coller dans le presse-papiers",
      Italian: "Non c'è niente da incollare negli appunti",
      Dutch: 'Er is niets op het klembord te plakken',
      Russian: 'Там нет ничего, чтобы вставить в буфер обмена',
      German: 'Es gibt nichts in die Zwischenablage einzufügen',
      Indonesian: 'Tidak ada yang bisa disisipkan di clipboard'
    };
    this.SAVE_IMAGE_SUCCESS = {
      English: 'Successfully Saved Image.',
      Spanish: 'Imagen guardada con éxito.',
      French: 'Image enregistrée avec succès.',
      Italian: 'Immagine salvata con successo.',
      Dutch: 'Succesvol opgeslagen afbeelding.',
      Russian: 'Изображение успешно сохранено.',
      German: 'Erfolgreich gespeichertes Bild.',
      Indonesian: 'Gambar Berhasil Disimpan.'
    };
    this.SAVE_FILE_SUCCESS = {
      English: 'Successfully Saved File.',
      Spanish: 'Archivo guardado correctamente.',
      French: 'Fichier enregistré avec succès.',
      Italian: 'File salvato con successo.',
      Dutch: 'Bestand succesvol opgeslagen.',
      Russian: 'Файл успешно сохранен.',
      German: 'Erfolgreich gespeicherte Datei.',
      Indonesian: 'File Berhasil Disimpan.'
    };
    this.ACTION_NOT_COMPLETED = {
      English: 'Action not completed.',
      Spanish: 'Acción no completada.',
      French: 'Action non terminée.',
      Italian: 'Azione non completata.',
      Dutch: 'Actie niet voltooid.',
      Russian: 'Действие не завершено.',
      German: 'Aktion nicht abgeschlossen.',
      Indonesian: 'CSV Berhasil Disimpan.'
    };
    this.FILE_MANAGER_ERROR = {
      English: 'Please Install a File Manager.',
      Spanish: 'Instale un administrador de archivos.',
      French: 'Veuillez installer un gestionnaire de fichiers.',
      Italian: 'Installa un file manager.',
      Dutch: 'Installeer een bestandsbeheerder.',
      Russian: 'Пожалуйста, установите файловый менеджер.',
      German: 'Bitte installieren Sie einen Dateimanager.',
      Indonesian: 'Silakan Instal Manajer File.'
    };
    this.SPACE = ' ';
    this.QUOTE_ESCAPE = /#QUOTE#/g;
    /* #INSERT_GENERATE_ELEMENT_TAG# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    this.TAG_RESISTOR = 'Resistor';
    this.TAG_CAPACITOR = 'Capacitor';
    this.TAG_INDUCTOR = 'Inductor';
    this.TAG_GROUND = 'Ground';
    this.TAG_DCSOURCE = 'DC Source';
    this.TAG_DCCURRENT = 'DC Current';
    this.TAG_ACSOURCE = 'AC Source';
    this.TAG_ACCURRENT = 'AC Current';
    this.TAG_SQUAREWAVE = 'Square Wave Source';
    this.TAG_SAW = 'Saw Wave Source';
    this.TAG_TRI = 'Triangle Wave Source';
    this.TAG_CONSTANT = 'Constant Voltage';
    this.TAG_WIRE = 'Wire';
    this.TAG_NET = 'Virtual Wire';
    this.TAG_NOTE = 'Note';
    this.TAG_RAIL = 'Power Rail';
    this.TAG_VOLTMETER = 'Voltmeter';
    this.TAG_OHMMETER = 'Ohmmeter';
    this.TAG_AMMETER = 'Ammeter';
    this.TAG_WATTMETER = 'Wattmeter';
    this.TAG_FUSE = 'Fuse';
    this.TAG_SPST = 'Single Pole Single Throw';
    this.TAG_SPDT = 'Single Pole Double Throw';
    this.TAG_NOT = 'NOT Gate';
    this.TAG_DIODE = 'Diode';
    this.TAG_LED = 'Light Emitting Diode';
    this.TAG_ZENER = 'Zener Diode';
    this.TAG_POTENTIOMETER = 'Potentiometer';
    this.TAG_AND = 'AND Gate';
    this.TAG_OR = 'OR Gate';
    this.TAG_NAND = 'NAND Gate';
    this.TAG_NOR = 'NOR Gate';
    this.TAG_XOR = 'XOR Gate';
    this.TAG_XNOR = 'XNOR Gate';
    this.TAG_DFF = 'D Flip Flop';
    this.TAG_VSAT = 'Voltage Saturation';
    this.TAG_ADD = 'Voltage Adder';
    this.TAG_SUB = 'Voltage Subtractor';
    this.TAG_MUL = 'Voltage Multiplier';
    this.TAG_DIV = 'Voltage Divider';
    this.TAG_GAIN = 'Voltage Gain';
    this.TAG_ABS = 'Voltage Absolute Value';
    this.TAG_VCSW = 'Voltage Controlled Switch';
    this.TAG_VCVS = 'Voltage Controlled Voltage Source';
    this.TAG_VCCS = 'Voltage Controlled Current Source';
    this.TAG_CCCS = 'Current Controlled Current Source';
    this.TAG_CCVS = 'Current Controlled Voltage Source';
    this.TAG_OPAMP = 'Ideal Operational Amplifier';
    this.TAG_NMOS = 'NChannel MOSFET';
    this.TAG_PMOS = 'PChannel MOSFET';
    this.TAG_NPN = 'NPN BJT';
    this.TAG_PNP = 'PNP BJT';
    this.TAG_ADC = 'Analog-to-Digital Converter';
    this.TAG_DAC = 'Digital-to-Analog Converter';
    this.TAG_SAH = 'Sample-and-Hold';
    this.TAG_PWM = 'Pulse Width Modulator';
    this.TAG_INTEGRATOR = 'Integrator';
    this.TAG_DIFFERENTIATOR = 'Differentiator';
    this.TAG_LPF = '1st Order Low Pass Filter';
    this.TAG_HPF = '1st Order High Pass Filter';
    this.TAG_REL = 'SPST Relay';
    this.TAG_PID = 'PID Controller';
    this.TAG_LUT = 'Look-up Table';
    this.TAG_VCR = 'Voltage Controlled Resistor';
    this.TAG_GRT = 'Voltage Greater Than';
    this.TAG_TPTZ = 'Two-Pole-Two-Zero';
    this.TAG_TRAN = 'Ideal Transformer';
    /* <!-- END AUTOMATICALLY GENERATED !--> */
  }
}
