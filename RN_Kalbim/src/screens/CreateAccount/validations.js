import * as Yup from "yup";

const validations = Yup.object().shape({
	Telefon: Yup
		.string()
		.required(),
	Şifre: Yup
		.string()
		.required(),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Şifre eşleşmedi.')
		.required()
});

module.exports = validations;