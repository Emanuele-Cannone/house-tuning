//URL
export const BASE_URL = 'http://127.0.0.1:8000/';

// SIDEBAR LABELS
export const SIDEBAR_VOICES: {label: string, link: string, action: {label: string, link: string}[]}[] = [
    { label: "Veicoli", link: "vehicle", action: [{label: "Aggiungi veicolo", link: ""}, {label: "Lista veicoli", link: ""}] },
    { label: "Modelli", link: "", action: [{label: "Aggiungi modello", link: ""}, {label: "Lista modelli", link: "vehicle"}]  },
    { label: "Motori", link: "", action: [{label: "Aggiungi motore", link: ""}, {label: "Lista motori", link: ""}]  },
    { label: "ECU", link: "", action: [{label: "Aggiungi ECU", link: ""}, {label: "Lista ECU", link: ""}]  }
];
