import { useState } from "react";

export type SignUpValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type SignUpTouched = {
    username: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
};

export type SignUpErrors = Partial<SignUpValues>;

type Options = {
    onValidSubmit: (normalized: SignUpValues) => void | Promise<void>;
};


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useSignUpForm({ onValidSubmit }: Options) {
    const [values, setValues] = useState<SignUpValues>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState<SignUpErrors>({});
    const [touched, setTouched] = useState<SignUpTouched>({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    function validateAll(v: SignUpValues) {
        const e: SignUpErrors = {};
        const usernameTrim = v.username.trim();
        const emailTrim = v.email.trim();
        const passNorm = v.password.normalize("NFKC").trim();
        const confNorm = v.confirmPassword.normalize("NFKC").trim();

        if (!usernameTrim) e.username = "Username is required.";
        if (!emailRegex.test(emailTrim)) e.email = "Please enter a valid email address.";
        if (passNorm.length < 6) e.password = "Password must be at least 6 characters.";
        if (passNorm && confNorm && confNorm !== passNorm) e.confirmPassword = "Passwords do not match.";
        return e;
    }

    const handleBlur = (field: keyof SignUpTouched) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors(validateAll(values));
    };

    const handleChange = (field: keyof SignUpValues, value: string) => {
        setValues((prev) => {
            const next = { ...prev, [field]: value };
            setErrors((prevErr) => {
                const out = { ...prevErr };
                const v = next;

                if (touched.username) out.username = v.username.trim() ? undefined : "Username is required.";
                if (touched.email)
                    out.email = emailRegex.test(v.email.trim()) ? undefined : "Please enter a valid email address.";
                if (touched.password)
                    out.password =
                        v.password.normalize("NFKC").trim().length >= 6
                            ? undefined
                            : "Password must be at least 6 characters.";
                if (touched.confirmPassword) {
                    const p = v.password.normalize("NFKC").trim();
                    const c = v.confirmPassword.normalize("NFKC").trim();
                    out.confirmPassword = p && c && p !== c ? "Passwords do not match." : undefined;
                }
                return out;
            });
            return next;
        });
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);
    const toggleShowConfirmPassword = () => setShowConfirmPassword((s) => !s);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const raw: SignUpValues = {
            username: String(fd.get("username") ?? ""),
            email: String(fd.get("email") ?? ""),
            password: String(fd.get("password") ?? ""),
            confirmPassword: String(fd.get("confirmPassword") ?? ""),
        };

        const normalized: SignUpValues = {
            username: raw.username.trim(),
            email: raw.email.trim(),
            password: raw.password.normalize("NFKC").trim(),
            confirmPassword: raw.confirmPassword.normalize("NFKC").trim(),
        };

        const newErrors = validateAll(normalized);
        setTouched({ username: true, email: true, password: true, confirmPassword: true });
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        onValidSubmit(normalized);
    };

    return {
        values,
        errors,
        touched,
        showPassword,
        showConfirmPassword,
        handleChange,
        handleBlur,
        toggleShowPassword,
        toggleShowConfirmPassword,
        handleSubmit,
    };
}
