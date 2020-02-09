import * as Yup from "yup";
const phoneRegExp = /(\+90\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2})/

const validations = Yup.object().shape({
	Telefon:Yup
		.string()
		.matches(phoneRegExp, 'Geçersiz format')		
		.required('Zorunlu alan'),
	Şifre: Yup
		.string()
		.required('Zorunlu alan'),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Şifre eşleşmedi.')
		.required('zorunludur')
});

module.exports = validations;