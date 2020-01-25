import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
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