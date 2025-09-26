import { useState } from "react";

export type LoginValues = { email: string; password: string };
export type LoginTouched = { email: boolean; password: boolean };
export type LoginErrors = Partial<LoginValues>;

type Options = {
    onValidSubmit: (vals: LoginValues) => unknown | Promise<unknown>;
};


export function useLoginForm({ onValidSubmit }: Options) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState<LoginErrors>({});
    const [touched, setTouched] = useState<LoginTouched>({ email: false, password: false });

    function validateField(field: "email" | "password", value: string) {
        let error = "";
        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }
        if (field === "password" && value.length < 6) {
            error = "Password must be at least 6 characters.";
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    const handleBlur = (field: "email" | "password", value: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, value);
    };

    const handleChange = (field: "email" | "password", value: string) => {
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (touched[field]) validateField(field, value);
    };

    const toggleShowPassword = () => setShowPassword((s) => !s);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setErrors({
                email: !email ? "Email is required." : errors.email,
                password: !password ? "Password is required." : errors.password,
            });
            return;
        }
        if (errors.email || errors.password) return;

        onValidSubmit({ email, password });
    };

    return {
        email,
        password,
        showPassword,
        errors,
        touched,
        handleBlur,
        handleChange,
        toggleShowPassword,
        handleSubmit,
    };
}
