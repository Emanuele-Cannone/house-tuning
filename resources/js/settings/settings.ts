//URL
export const BASE_URL = 'http://127.0.0.1:8000/';

// SIDEBAR LABELS
export const SIDEBAR_VOICES: {label: string, link: string, action: {label: string, link: string}[]}[] = [
    { label: "Veicoli", link: "vehicle", action: [{label: "Aggiungi veicolo", link: "/create"}, {label: "Lista veicoli", link: ""}] },
    { label: "Brand", link: "brand", action: [{label: "Aggiungi brand", link: "/create"}, {label: "Lista brand", link: ""}]  },
    { label: "Modelli", link: "", action: [{label: "Aggiungi modello", link: ""}, {label: "Lista modelli", link: "vehicle"}]  },
    { label: "Motori", link: "", action: [{label: "Aggiungi motore", link: ""}, {label: "Lista motori", link: ""}]  },
    { label: "ECU", link: "", action: [{label: "Aggiungi ECU", link: ""}, {label: "Lista ECU", link: ""}]  }
];

export const DESCRIPTION_MODAL_KEY = {
   update: "updateVheicle"
}
