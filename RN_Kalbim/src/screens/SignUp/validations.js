import * as Yup from "yup";

const validations = Yup.object().shape({
	phone: Yup
		.string()
		.required(),
	password: Yup
		.string()
		.required(),
	passwordConfirm: Yup
		.string()
		.oneOf([Yup.ref('password')], 'Passwords not matched.')
		.required()
});

module.exports = validations;