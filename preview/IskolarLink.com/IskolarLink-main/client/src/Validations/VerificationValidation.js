import * as yup from "yup";


const verificationSchema = yup.object().shape({
    cor: yup.mixed().required("Certificate of Registration is required"),
    privacyPolicy: yup.bool().oneOf([true], "Please accept the privacy policy")
});

export { verificationSchema}