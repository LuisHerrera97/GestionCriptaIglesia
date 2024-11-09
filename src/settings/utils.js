import { format, parse } from "date-fns";

import enUsLocale from "date-fns/locale/en-US";

export const isErrorForm = (form) => {
  const errorValues = Object.values(form).map((x) => x.error);
  return errorValues.some((x) => x);
};

export const isNullOrEmpty = (value) => !value || value === "";

export const getDateTimeString = (date, toLocal = false) => {
  // return !date ? "" : new Date(date).toLocaleString();
  if (toLocal) {
    return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "dd/MM/yyyy p");
  }

  return !date ? "" : format(parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "dd/MM/yyyy p");
};

export const getDateTimeWithSecondsString = (date, toLocal = true) => {
  // return !date ? "" : new Date(date).toLocaleString();
  if (toLocal) {
    return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "dd/MM/yyyy pp");
  }

  return !date ? "" : format(parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "dd/MM/yyyy pp");
};

export const getDateString = (date, toLocal = true) => {
  // return !date ? "" : new Date(date).toLocaleString();
  if (toLocal) {
    return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "dd/MM/yyyy");
  }

  return !date ? "" : format(parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date()), "dd/MM/yyyy");
};

export const getTimeString = (date) => {
  // return !date ? "" : new Date(date).toLocaleString();
  return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "pp");
};

export const getDateTimePost = (date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export const getDatePost = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const getDateFormat = (date) => {
  return format(date, "dd/MM/yyyy");
  //return format(new Date(date), 'P', { locale: enUsLocale });
};

//Inicio  Exclusivo de análisis económico-CCAN
export const getDatePostDefaultDateTime = (date, sformat) => {
  return format(date, sformat);
  //"yyyy-MM-dd'T'00:00:00"
};
//Fin  exclusivo de análisis económico-CCAN

export const getMoney = (value) => {
  return !value && value !== 0 ? "" : "$" + value.toLocaleString("en-EN", { minimumFractionDigits: 4 });
};

export const getMoney2 = (value) => {
  return !value && value !== 0 ? "" : "$" + value.toLocaleString("en-EN", { minimumFractionDigits: 4 });
};

/**
 * Valida el formato válido del identificador.
 * @param {string} Uniqueidentifier - Identificador único.
 */
export const IsValidId = (Uniqueidentifier) => {
  //^(?!.*00000000)[0-9A-Fa-f\-]{36}$
  const regex = /^(?!.*00000000)[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/gm;
  return regex.test(Uniqueidentifier);
};

export const esMenorFechaInicioQueFechaFinal = (dtFechaInicio, dtFechaFinal) => {
  let dtinicio = new Date(dtFechaInicio).setHours(0, 0, 0, 0);
  let dtFin = new Date(dtFechaFinal).setHours(0, 0, 0, 0);
  return dtinicio >= dtFin;
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const ValoresGenericos = {
  GUI_DEFAULT: "00000000-0000-0000-0000-000000000000",
};

export const getTimeString2 = (date) => {
  return !date ? "" : new Date(date).toLocaleTimeString("es-ES");
  //return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "pp");
};
export const getDateString2 = (date) => {
  //return !date ? "" : new Date(date).toISOString().slice(0, 10);
  //return !date ? "" : format(parse(date + "Z", "yyyy-MM-dd'T'HH:mm:ssX", new Date()), "pp");
  if (isNullOrEmpty(date)) {
    return '';
  }
  let day = new Date(date).getDate();
  let month = new Date(date).getMonth() + 1;
  let year = new Date(date).getFullYear();
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
};
export const getTimeStringNuevo = (date) => {
  //return !date ? "" : new Date(date).toLocaleTimeString("en-US");

  //return date.getHours() + ':' + date.getMinutes();

  if (isNullOrEmpty(date)) {
    return '';
  }
  let hora = new Date(date).getHours();
  let minuto = new Date(date).getMinutes();
  return `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
};

/**
 * Valida la longitud de una cadena.
 * @param {string} value - Texto.
 * @param {string} minLength - Longitud minima del texto.
 * @param {string} maxLength - Longitud maxima del texto.
 */
export const StringLength = (value, minLength = 1, maxLength = 1) => {
  // eslint-disable-next-line no-useless-escape
  const regex = `/^(?!.*  )(?=.*[\w-])[\w -]{${minLength},${maxLength}}$/gm`;
  return regex.test(value);
};

/**
 * Valida cadenas alfanuméricas excluyendo los caracteres especiales.
 * @param {string} value - Texto.
 */
export const hasSpecialCharacter = (value) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /[!"`#%&,: ;<>=@{ }~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
  return regex.test(value);
};

/**
 * Reemplaza los parámetros basado en Template String route/{id}.
 * @param {string} template - String Templete.
 * @param {object} data - Datos a reemplazar {id:value}.
 */
export const setPathParameters = (template, data) => {
  const pattern = /{\s*(\w+?)\s*}/g; // {property}
  return template.replace(pattern, (_, token) => data[token] || "");
};

/**
 * Reemplaza los prametros basado en Template String route/:id.
 * @param {string} template - String Templete.
 * @param {object} data - Datos a reemplazar {id:value}.
 */
export const setUrlParameters = (url, params) => {
  var newObj = {};
  Object.keys(params).forEach(function (key) {
    newObj[":" + key] = params[key];
  });

  var regex = new RegExp(Object.keys(newObj).join("|"), "gi");
  return url.replace(regex, function (matched) {
    return newObj[matched];
  });
};

/**
 * Agrega AM/PM
 * @param {Date} date - Fecha.
 */

export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

/**
 * Genera un nuevo UUID (Universally Unique IDentifier),
 * también conocido como GUID (Globally Unique IDentifier).
 */
export const newId = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/**
 * Valida si la fecha es valida en sql
 * @param {Date} date - Fecha.
 */
export const isSqlValid = function (date) {
  return date > new Date("1/1/1753 12:00:00 AM") && this < new Date("12/31/9999 11:59:59 PM");
};

export const tiempoCierreSession = 1200000; //10000= 10 segundos 1200000

