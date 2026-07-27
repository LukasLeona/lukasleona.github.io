import * as yup from "yup";


const accreditationSchema = yup.object().shape({
    orgName: yup.string().required("Organization Name is required"),
    jurisdiction: yup.string().required("Jurisdiction is required"),
    subjurisdiction: yup.string().required("Subjurisdiction is required"),
    orgType: yup.string().required("Organization Type is required"),
    advisers: yup.string().required("Advisers is required"),
    AD001: yup.mixed().required("AD001 is required"),
    AD002: yup.mixed().required("AD002 is required"),
    AD003: yup.mixed().required("AD003 is required"),
    AD004: yup.mixed().required("AD004 is required"),
    AD005: yup.mixed().required("AD005 is required"),
    AD006: yup.mixed().required("AD006 is required"),
    AD007: yup.mixed().required("AD007 is required"),
    AD008: yup.mixed().required("AD008 is required"),
    AF001: yup.mixed().required("AF001 is required"),
    AD009: yup.mixed().required("AD009 is required"),
    privacyPolicy: yup.bool().oneOf([true], "Please accept the privacy policy"),
});

export { accreditationSchema };
