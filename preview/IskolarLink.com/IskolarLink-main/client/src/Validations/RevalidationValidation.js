import * as yup from "yup";

const revalidationSchema = yup.object().shape({
    socn:yup.string().required(":Previous SOCN is required"),
    orgName: yup.string().required("Organization Name is required"),
    jurisdiction: yup.string().required("Jurisdiction is required"),
    subjurisdiction: yup.string().required("Subjurisdiction is required"),
    orgType: yup.string().required("Organization Type is required"),
    advisers: yup.string().required("Advisers is required"),
    RD001: yup.mixed().required("RD001 is required"),
    RD002: yup.mixed().required("RD002 is required"),
    RD003: yup.mixed().required("RD003 is required"),
    RD004: yup.mixed().required("RD004 is required"),
    RD005: yup.mixed().required("RD005 is required"),
    RD006: yup.mixed().required("RD006 is required"),
    RD007: yup.mixed().required("RD007 is required"),
    RD008: yup.mixed().required("RD008 is required"),
    RD010: yup.mixed().required("RD010 is required"),
    RD011: yup.mixed().required("RD011 is required"),
    RF001: yup.mixed().required("RF001 is required"),
    privacyPolicy: yup.bool().oneOf([true], "Please accept the privacy policy"),
});

export { revalidationSchema };