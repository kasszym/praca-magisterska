export const useValidator = () => {
  const peselValidator = (rule: any, value: number, callback: any): void => {
    const pesel = value.toString();
    const age = checkAge(pesel);
    if (age < 18) {
      callback("Musisz mieć 18 lat.");
      return;
    }
    const result =
      validateCharacters(pesel) &&
      validateBirthdate(pesel) &&
      validateControl(pesel);
    if (!result) {
      callback("PESEL musi być prawdziwy.");
      return;
    }
    callback();
  };
  const checkAge = (pesel: string): number => {
    let year = parseInt(pesel.substring(0, 2), 10);
    let month = parseInt(pesel.substring(2, 4), 10);
    const day = parseInt(pesel.substring(4, 6), 10);
    if (month >= 1 && month <= 12) {
      year += 1900;
    } else if (month >= 21 && month <= 32) {
      year += 2000;
      month -= 20;
    } else {
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };
  const validateCharacters = (pesel: string): boolean => {
    if (typeof pesel !== "string") return false;

    return /^[0-9]{11}$/.test(pesel.trim());
  };
  const validateBirthdate = (pesel: string): boolean => {
    return _validateMonth(pesel) && _validateDay(pesel);
  };
  const _validateMonth = (pesel: string): boolean => {
    const monthStr = pesel.substr(2, 2);

    return !(
      monthStr === "00" ||
      (Number(monthStr[0]) % 2 && Number(monthStr[1]) > 2)
    );
  };
  const _isLeapYear = (fullYear: number): number | boolean => {
    return !(fullYear % 4) && (fullYear % 100 || !(fullYear % 400));
  };
  const _validateDay = (pesel: string): boolean => {
    const [year, month, day] = _parsePeselDate(pesel);
    const longMonths = [1, 3, 5, 7, 8, 10, 12];

    if (day < 1) return false;
    if (month === 2)
      if (_isLeapYear(year)) return day <= 29;
      else return day <= 28;
    if (longMonths.indexOf(month) !== -1) return day <= 31;
    else return day <= 30;
  };
  const _parsePeselDate = (pesel: string): number[] => {
    const yearPart = parseInt(pesel.substr(0, 2));
    const monthPart = parseInt(pesel.substr(2, 2));
    const dayPart = parseInt(pesel.substr(4, 2));

    const year = 1800 + 100 * (Math.ceil(monthPart / 20) % 5) + yearPart;
    const month = monthPart % 20;

    return [year, month, dayPart];
  };

  const validateControl = (pesel: string): boolean => {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(pesel.substring(i, i + 1)) * weights[i];
    }
    return sum % 10 === 0;
  };
  const postCodeValidator = (rule: any, value: number, callback: any): void => {
    const reg = /^[0-9]{2}-[0-9]{3}$/;
    const pesel = value.toString();
    if (!reg.test(pesel)) {
      callback("Kod pocztowy musi być prawdziwy.");
      return;
    }
    callback();
  };

  return {
    postCodeValidator,
    peselValidator,
  };
};
