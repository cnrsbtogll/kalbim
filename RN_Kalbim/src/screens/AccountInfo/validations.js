import * as Yup from 'yup';
const phoneRegExp = /(\+90\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2})/;
const nameRegExp = /([A-Z])\w+/;

const validations = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegExp, 'Adınız büyük harfle başlamalıdır.')
    .min(3, 'En az 3 karakterden oluşmalıdır.')
    .required('Zorunlu alan'),
  surname: Yup.string()
    .matches(nameRegExp, 'Soyadınız büyük harfle başlamalıdır.')
    .min(3, 'En az 3 karakterden oluşmalıdır.')
    .required('Zorunlu alan'),
  tel: Yup.string()
  .matches(phoneRegExp, 'Geçersiz format.')  
  .required('Zorunlu alan'),
});

module.exports = validations;
