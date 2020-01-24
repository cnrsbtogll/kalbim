import * as Yup from "yup";

const validations = Yup.object().shape({
	Telefon: Yup
		.string()
		.required('zorunludur'),
	Şifre: Yup
		.string()
		.required('zorunludur'),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Şifre eşleşmedi.')
		.required('zorunludur')
});

module.exports = validations;