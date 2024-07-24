export const emailRegExp = /^[^.\s][\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/;

export const passwordRegExp =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;

export const URLRegExp =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

export const phoneNumberRegExp =
  /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
