import * as Yup from "yup";
const phoneRegExp = /([0-9]{2}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2})/



/*/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/*/


const validations = Yup.object().shape({
	Telefon:Yup
		.string()
		.matches(phoneRegExp, 'Geçersiz format')		
		.required('Zorunlu alan'),
	Şifre: Yup
		.string()
		.required('Zorunlu alan'),
});

module.exports = validations;