import * as Yup from "yup";
//const phoneRegExp = /(\+90\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2})/

const validations = Yup.object().shape({
	email: Yup
		.string()
		.email('Geçersiz format')	
		.required('Zorunlu alan'),
		password: Yup
		.string()
		.min(6,'En az 6 karakterden oluşmalıdır.')
		.required('Zorunlu alan'),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Şifre eşleşmedi.')
		.required('Zorunlu alan')
});

module.exports = validations;