export const rxCorreo = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const rxCaracteresEsp = /^[^$%&|<>[\]{}°¬~^`¨¡?=/!'"]*$/;
export const rxCaracteresEsp1 = /^[^$%&|<>[\]{}°¬~^`¨¡?=!'"]*$/;
export const rxPuntoDecimal = /^[^.]*$/;
export const rxRFC =
  /^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/;
export const rxAlfanumeric = /^[a-zA-Z0-9]*$/;
